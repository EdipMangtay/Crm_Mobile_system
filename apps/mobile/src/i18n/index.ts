/**
 * TRAVIA DUBAI — i18n Internationalization Setup
 * MVP: Turkish only. Architecture ready for: en, ar, ru
 */

import tr from './locales/tr';

type TranslationKeys = typeof tr;

// Flatten nested keys to dot notation: 'home.greeting' → string
type FlattenKeys<T, Prefix extends string = ''> = T extends string
  ? Prefix
  : {
      [K in keyof T]: K extends string
        ? FlattenKeys<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
        : never;
    }[keyof T];

type TranslationKey = FlattenKeys<TranslationKeys>;

// Current language
let currentLocale: 'tr' | 'en' | 'ar' | 'ru' = 'tr';

const locales: Record<string, TranslationKeys> = {
  tr,
};

/**
 * Get a translation value by dot-notation key
 * @example t('home.greeting') // "Günaydın"
 * @example t('home.tripDays', { count: '5' }) // "5 Gece"
 */
export function t(key: string, params?: Record<string, string>): string {
  const locale = locales[currentLocale] || locales.tr;
  const keys = key.split('.');
  let value: unknown = locale;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      // Key not found — return key itself as fallback
      return key;
    }
  }

  if (typeof value !== 'string') return key;

  // Interpolate params: "Merhaba, {{name}}" → "Merhaba, Edip"
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => params[paramKey] ?? '');
  }

  return value;
}

/**
 * Set the active locale
 */
export function setLocale(locale: 'tr' | 'en' | 'ar' | 'ru') {
  currentLocale = locale;
}

/**
 * Get current locale
 */
export function getLocale() {
  return currentLocale;
}
