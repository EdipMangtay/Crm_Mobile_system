'use client';

import dynamic from 'next/dynamic';
import { Component, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { INTRO_TIMING } from '@/lib/motion';

const ParticleScene = dynamic(() => import('./ParticleScene'), {
  ssr: false,
  loading: () => null,
});

// Survives client navigation, but a full document load (including refresh) resets it.
let playedInDocument = false;

function phase(time: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (time - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

class IntroErrorBoundary extends Component<{
  children: ReactNode;
  onFailure: () => void;
}, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!context) return false;
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function CinematicIntro() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const complete = useCallback(() => setActive(false), []);
  const markReady = useCallback(() => setReady(true), []);
  const progress = useCallback((time: number, mobile: boolean) => {
    const element = overlayRef.current;
    if (!element) return;
    const timing = mobile ? INTRO_TIMING.mobile : INTRO_TIMING.desktop;
    // The photograph opens from the city upwards on the same clock as the GPU.
    element.style.setProperty('--intro-lower', String(1 - phase(time, timing.revealStart, timing.cityEnd - 0.32)));
    element.style.setProperty('--intro-upper', String(1 - phase(time, timing.revealStart + 0.16, timing.cityEnd - 0.12)));
    element.style.setProperty('--intro-brand', String(phase(time, timing.brandStart, timing.brandStart + 0.2) * (1 - phase(time, timing.brandEnd - 0.24, timing.brandEnd))));
  }, []);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      if (reduced) { setActive(false); return; }
      if (playedInDocument) return;
      playedInDocument = true;
      if (document.hidden || window.scrollY > window.innerHeight || !supportsWebGL()) return;
      setActive(true);
    });
    return () => { cancelled = true; };
  }, [reduced]);

  useEffect(() => {
    if (!active) return;
    const failSafe = window.setTimeout(complete, ready ? (INTRO_TIMING.desktop.duration + 0.7) * 1000 : 2200);
    const hide = () => { if (document.hidden) setActive(false); };
    const scroll = () => { if (window.scrollY > 80) complete(); };
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      window.clearTimeout(failSafe);
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('scroll', scroll);
    };
  }, [active, ready, complete]);

  if (!active || reduced) return null;

  return (
    <div ref={overlayRef} className={`travia-intro${ready ? ' travia-intro--ready' : ''}`} aria-hidden="true">
      <div className="travia-intro__veil travia-intro__veil--upper" />
      <div className="travia-intro__veil travia-intro__veil--lower" />
      <IntroErrorBoundary onFailure={complete}>
        <ParticleScene onReady={markReady} onComplete={complete} onFailure={complete} onProgress={progress} />
      </IntroErrorBoundary>
      <div className="travia-intro__brand">
        <span className="travia-intro__wordmark">TRAVIA</span>
        <span className="travia-intro__coordinates">25.2048° N&nbsp;&nbsp; 55.2708° E</span>
      </div>
    </div>
  );
}
