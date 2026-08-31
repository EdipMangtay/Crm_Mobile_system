/**
 * TRAVIA DUBAI — Date & Timezone Utilities
 * All DB timestamps are UTC. Display timezone is trip-based (default: Asia/Dubai)
 */

import { format, formatDistanceToNow, differenceInDays, differenceInHours, differenceInMinutes, isToday, isTomorrow, isYesterday, parseISO, isBefore, isAfter } from 'date-fns';
import { tr } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';

const DUBAI_TZ = 'Asia/Dubai';

/**
 * Convert UTC date to Dubai timezone
 */
export function toDubaiTime(date: Date | string): Date {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return toZonedTime(d, DUBAI_TZ);
}

/**
 * Format a date in Dubai timezone
 */
export function formatDubai(date: Date | string, formatStr: string): string {
  return format(toDubaiTime(date), formatStr, { locale: tr });
}

/**
 * Format time only (e.g., "10:30")
 */
export function formatTime(time: string): string {
  // time is "HH:mm:ss" from Postgres TIME type
  return time.substring(0, 5);
}

/**
 * Format date short (e.g., "12 Eylül")
 */
export function formatDateShort(date: Date | string): string {
  return formatDubai(date, 'd MMMM');
}

/**
 * Format date range (e.g., "12 – 17 Eylül")
 */
export function formatDateRange(start: Date | string, end: Date | string): string {
  const s = toDubaiTime(start);
  const e = toDubaiTime(end);

  const sMonth = format(s, 'MMMM', { locale: tr });
  const eMonth = format(e, 'MMMM', { locale: tr });

  if (sMonth === eMonth) {
    return `${format(s, 'd')} – ${format(e, 'd')} ${sMonth}`;
  }
  return `${format(s, 'd MMMM', { locale: tr })} – ${format(e, 'd MMMM', { locale: tr })}`;
}

/**
 * Get days until a date
 */
export function daysUntil(date: Date | string): number {
  const target = typeof date === 'string' ? parseISO(date) : date;
  return differenceInDays(target, new Date());
}

/**
 * Get time until next experience (e.g., "2 saat 14 dakika sonra")
 */
export function timeUntil(date: Date | string, time?: string): string {
  let target = typeof date === 'string' ? parseISO(date) : new Date(date);

  if (time) {
    const [hours, minutes] = time.split(':').map(Number);
    target = new Date(target);
    target.setHours(hours, minutes, 0, 0);
  }

  const now = new Date();
  const diffHours = differenceInHours(target, now);
  const diffMinutes = differenceInMinutes(target, now) % 60;

  if (diffHours > 0) {
    return `${diffHours} saat ${diffMinutes} dakika sonra`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} dakika sonra`;
  }
  return 'Şimdi';
}

/**
 * Relative time label (e.g., "Bugün", "Yarın", "3 gün kaldı", "Dubai'de")
 */
export function tripStatusLabel(startDate: string, endDate: string): string {
  const now = new Date();
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  if (isAfter(now, end)) {
    return 'Tamamlandı';
  }
  if (isAfter(now, start) && isBefore(now, end)) {
    return "Dubai'de";
  }
  const days = daysUntil(startDate);
  if (days === 0) return 'Bugün başlıyor';
  if (days === 1) return 'Yarın başlıyor';
  return `${days} gün kaldı`;
}

/**
 * Day label (e.g., "Bugün", "Yarın", "12 Eylül")
 */
export function dayLabel(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (isToday(d)) return 'Bugün';
  if (isTomorrow(d)) return 'Yarın';
  if (isYesterday(d)) return 'Dün';
  return formatDubai(d, 'd MMMM');
}

/**
 * Chat timestamp (e.g., "10:30" for today, "Dün 10:30", "12 Eyl 10:30")
 */
export function chatTimestamp(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (isToday(d)) return formatDubai(d, 'HH:mm');
  if (isYesterday(d)) return `Dün ${formatDubai(d, 'HH:mm')}`;
  return formatDubai(d, 'd MMM HH:mm');
}

/**
 * Greeting based on time of day (Dubai timezone)
 */
export function getGreeting(): string {
  const hour = toDubaiTime(new Date()).getHours();
  if (hour < 6) return 'İyi Geceler';
  if (hour < 12) return 'Günaydın';
  if (hour < 18) return 'İyi Günler';
  if (hour < 22) return 'İyi Akşamlar';
  return 'İyi Geceler';
}
