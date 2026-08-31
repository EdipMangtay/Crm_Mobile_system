/**
 * TRAVIA DUBAI — Typography System
 * Serif: Playfair Display (headings, brand, prices)
 * Sans: Inter (body, UI elements)
 */
import { TextStyle, Platform } from 'react-native';
import { colors } from './tokens';

// Font family constants (uses built-in platform luxury fonts)
export const fontFamily = {
  serif: {
    regular: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    medium: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    semiBold: Platform.OS === 'ios' ? 'Georgia-Bold' : 'serif',
    bold: Platform.OS === 'ios' ? 'Georgia-Bold' : 'serif',
    italic: Platform.OS === 'ios' ? 'Georgia-Italic' : 'serif',
  },
  sans: {
    light: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
    regular: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    medium: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    semiBold: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    bold: Platform.OS === 'ios' ? 'System' : 'sans-serif-bold',
  },
} as const;

// Type scale
export const fontSize = {
  '2xs': 10,
  xs: 11,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 44,
} as const;

// Line heights
export const lineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.65,
} as const;

// Letter spacing
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
  heading: 1.5,
  section: 3,
} as const;

// Pre-composed text styles
export const typography = {
  // ─── Display Headings (Serif) ────────────────────────
  displayLarge: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['5xl'],
    lineHeight: fontSize['5xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.heading,
    color: colors.textPrimary,
  } satisfies TextStyle,

  displayMedium: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize['4xl'],
    lineHeight: fontSize['4xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.heading,
    color: colors.textPrimary,
  } satisfies TextStyle,

  displaySmall: {
    fontFamily: fontFamily.serif.medium,
    fontSize: fontSize['3xl'],
    lineHeight: fontSize['3xl'] * lineHeight.snug,
    letterSpacing: letterSpacing.wide,
    color: colors.textPrimary,
  } satisfies TextStyle,

  // ─── Headings (Serif) ───────────────────────────────
  h1: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize['2xl'],
    lineHeight: fontSize['2xl'] * lineHeight.snug,
    letterSpacing: letterSpacing.wide,
    color: colors.textPrimary,
  } satisfies TextStyle,

  h2: {
    fontFamily: fontFamily.serif.medium,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.snug,
    letterSpacing: letterSpacing.wide,
    color: colors.textPrimary,
  } satisfies TextStyle,

  h3: {
    fontFamily: fontFamily.serif.medium,
    fontSize: fontSize.lg,
    lineHeight: fontSize.lg * lineHeight.snug,
    color: colors.textPrimary,
  } satisfies TextStyle,

  // ─── Section Label (Gold Uppercase) ─────────────────
  sectionLabel: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize['2xs'],
    lineHeight: fontSize['2xs'] * lineHeight.normal,
    letterSpacing: letterSpacing.section,
    textTransform: 'uppercase' as const,
    color: colors.gold,
  } satisfies TextStyle,

  // ─── Body (Sans) ────────────────────────────────────
  bodyLarge: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.relaxed,
    color: colors.textPrimary,
  } satisfies TextStyle,

  body: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.relaxed,
    color: colors.textSecondary,
  } satisfies TextStyle,

  bodySmall: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.relaxed,
    color: colors.textSecondary,
  } satisfies TextStyle,

  // ─── UI Elements ────────────────────────────────────
  button: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.normal,
    letterSpacing: letterSpacing.wide,
    color: colors.textPrimary,
  } satisfies TextStyle,

  buttonSmall: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.wide,
    color: colors.textPrimary,
  } satisfies TextStyle,

  label: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
    color: colors.textSecondary,
  } satisfies TextStyle,

  caption: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * lineHeight.normal,
    color: colors.textTertiary,
  } satisfies TextStyle,

  // ─── Mono (Badges, Tags, Timestamps) ────────────────
  mono: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: fontSize['2xs'],
    lineHeight: fontSize['2xs'] * lineHeight.normal,
    letterSpacing: letterSpacing.wider,
    color: colors.gold,
  } satisfies TextStyle,

  // ─── Numbers (Stats, Prices) ────────────────────────
  statLarge: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['4xl'],
    lineHeight: fontSize['4xl'] * lineHeight.tight,
    color: colors.textPrimary,
  } satisfies TextStyle,

  price: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.tight,
    color: colors.textPrimary,
  } satisfies TextStyle,
} as const;
