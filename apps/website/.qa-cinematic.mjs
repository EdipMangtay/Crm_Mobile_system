import { writeFile } from 'node:fs/promises';

const endpoint = 'http://127.0.0.1:9223';
const pages = await (await fetch(`${endpoint}/json/list`)).json();
const page = pages.find((item) => item.type === 'page');
if (!page) throw new Error('No Chrome page target found');

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let id = 0;
const pending = new Map();
const events = [];
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const handler = pending.get(message.id);
    if (!handler) return;
    pending.delete(message.id);
    if (message.error) handler.reject(new Error(message.error.message));
    else handler.resolve(message.result);
    return;
  }
  if (message.method === 'Runtime.exceptionThrown') events.push({ type: 'exception', value: message.params.exceptionDetails.text });
  if (message.method === 'Log.entryAdded' && message.params.entry.level !== 'verbose') events.push({ type: message.params.entry.level, value: message.params.entry.text });
  if (message.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(message.params.type)) {
    events.push({ type: message.params.type, value: message.params.args.map((arg) => arg.value ?? arg.description).join(' ') });
  }
});

function send(method, params = {}) {
  const messageId = ++id;
  socket.send(JSON.stringify({ id: messageId, method, params }));
  return new Promise((resolve, reject) => pending.set(messageId, { resolve, reject }));
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;

async function waitFor(expression, timeout = 3000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(expression)) return true;
    await sleep(50);
  }
  return false;
}

async function navigate(url) {
  await send('Page.navigate', { url });
  await sleep(900);
}

async function shot(name, fullPage = false) {
  let params = { format: 'png', fromSurface: true };
  if (fullPage) {
    const { contentSize } = await send('Page.getLayoutMetrics');
    params = { ...params, captureBeyondViewport: true, clip: { x: 0, y: 0, width: contentSize.width, height: contentSize.height, scale: 1 } };
  }
  const result = await send('Page.captureScreenshot', params);
  await writeFile(`.qa-${name}.png`, Buffer.from(result.data, 'base64'));
}

await Promise.all([send('Page.enable'), send('Runtime.enable'), send('Log.enable')]);
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await navigate('http://localhost:3000');
await evaluate('sessionStorage.clear(); location.reload(); true');
await waitFor("document.querySelector('.travia-intro--ready') !== null");
await sleep(150);
const check300 = await evaluate(`({ overlay: Boolean(document.querySelector('.travia-intro')), canvases: document.querySelectorAll('canvas').length, stored: sessionStorage.getItem('travia-signature-intro-v1'), reduced: matchMedia('(prefers-reduced-motion: reduce)').matches })`);
await shot('desktop-stars');
await sleep(1400);
const check1500 = await evaluate(`({ overlay: Boolean(document.querySelector('.travia-intro')), canvases: document.querySelectorAll('canvas').length })`);
await shot('desktop-burj');
await sleep(600);
await shot('desktop-trace');
await sleep(850);
await shot('desktop-handoff');
await sleep(700);
await shot('desktop-hero');
await shot('desktop-full', true);

const firstVisit = await evaluate(`({
  overlay: Boolean(document.querySelector('.travia-intro')),
  canvases: document.querySelectorAll('canvas').length,
  introStored: sessionStorage.getItem('travia-signature-intro-v1'),
  webgl: Boolean(document.createElement('canvas').getContext('webgl')),
  heroImageReady: Boolean(document.querySelector('#hero img')?.complete && document.querySelector('#hero img')?.naturalWidth),
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  title: document.querySelector('#hero-title')?.textContent?.trim()
})`);

await evaluate('location.reload(); true');
await sleep(500);
await shot('desktop-return');
const returnVisit = await evaluate(`({ overlay: Boolean(document.querySelector('.travia-intro')), canvases: document.querySelectorAll('canvas').length })`);

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true, screenWidth: 390, screenHeight: 844 });
await evaluate('sessionStorage.clear(); location.reload(); true');
await waitFor("document.querySelector('.travia-intro--ready') !== null");
await sleep(1400);
await shot('mobile-burj');
await sleep(1350);
await shot('mobile-handoff');
await sleep(700);
await shot('mobile-hero');
await shot('mobile-full', true);
const mobile = await evaluate(`({
  overlay: Boolean(document.querySelector('.travia-intro')),
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  heroHeight: document.querySelector('#hero')?.getBoundingClientRect().height,
  menuLabel: document.querySelector('button[aria-label="Menüyü aç"]')?.getAttribute('aria-expanded')
  ,overflowers: [...document.querySelectorAll('*')].filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0, 8).map((element) => ({ tag: element.tagName, className: element.className?.toString().slice(0, 120), right: Math.round(element.getBoundingClientRect().right) }))
})`);

await evaluate(`document.querySelector('button[aria-label="Menüyü aç"]')?.click(); true`);
await sleep(250);
const menuOpen = await evaluate(`({
  dialog: Boolean(document.querySelector('[role="dialog"][aria-label="Mobil menü"]')),
  expanded: document.querySelector('button[aria-label="Menüyü aç"]')?.getAttribute('aria-expanded'),
  activeLabel: document.activeElement?.getAttribute('aria-label')
})`);
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
await sleep(250);
const menuClosed = await evaluate(`({
  dialog: Boolean(document.querySelector('[role="dialog"][aria-label="Mobil menü"]')),
  activeLabel: document.activeElement?.getAttribute('aria-label')
})`);
const journeys = await evaluate(`({
  whatsapp: [...document.querySelectorAll('a')].some((link) => link.href.includes('wa.me')),
  experience: [...document.querySelectorAll('a')].some((link) => link.pathname.startsWith('/experiences/')),
  contact: Boolean(document.querySelector('#contact')),
  planner: Boolean(document.querySelector('#planner')),
  heroCta: [...document.querySelectorAll('#hero button')].some((button) => button.textContent.includes('Deneyimleri keşfet'))
})`);

await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await evaluate('sessionStorage.clear(); location.reload(); true');
await sleep(500);
await shot('reduced-motion');
const reducedMotion = await evaluate(`({ overlay: Boolean(document.querySelector('.travia-intro')), canvases: document.querySelectorAll('canvas').length })`);

await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
await navigate('http://localhost:3000/experiences/helicopter-tour');
const detailRoute = await evaluate(`({ overlay: Boolean(document.querySelector('.travia-intro')), title: document.querySelector('h1')?.textContent?.trim() })`);

await evaluate('sessionStorage.clear()');
await send('Page.addScriptToEvaluateOnNewDocument', { source: `HTMLCanvasElement.prototype.getContext = function () { return null; }` });
await navigate('http://localhost:3000/?webgl=fallback');
const webglFallback = await evaluate(`({ overlay: Boolean(document.querySelector('.travia-intro')), hero: Boolean(document.querySelector('#hero-title')), imageReady: Boolean(document.querySelector('#hero img')?.complete) })`);

console.log(JSON.stringify({ check300, check1500, firstVisit, returnVisit, mobile, menuOpen, menuClosed, journeys, reducedMotion, detailRoute, webglFallback, events }, null, 2));
socket.close();
