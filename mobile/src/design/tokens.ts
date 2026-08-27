/**
 * TRAVIA DUBAI — Mobile Design Tokens
 * Derived from the web site's visual DNA:
 * - Deep navy/midnight backgrounds
 * - Premium gold accents
 * - Ivory/cream typography
 * - Glassmorphism surfaces
 */

// ─── Colors ───────────────────────────────────────────────────
export const colors = {
  // Backgrounds
  background: '#05070F',
  surface: '#0B0F1A',
  surfaceElevated: '#111827',
  surfaceCard: 'rgba(11, 15, 26, 0.7)',

  // Gold palette
  gold: '#C9A66B',
  goldSoft: '#E8C77A',
  goldLight: '#F0D99A',
  goldDark: '#A8854D',
  goldMuted: 'rgba(201, 166, 107, 0.15)',

  // Text
  textPrimary: '#F5F1E8',
  textSecondary: 'rgba(245, 241, 232, 0.6)',
  textTertiary: 'rgba(245, 241, 232, 0.4)',
  textInverse: '#05070F',

  // Borders
  border: 'rgba(201, 166, 107, 0.15)',
  borderActive: 'rgba(201, 166, 107, 0.4)',
  borderStrong: 'rgba(201, 166, 107, 0.6)',

  // Accents
  sapphire: '#1B3A6B',

  // Semantic
  success: '#4ADE80',
  successBg: 'rgba(74, 222, 128, 0.12)',
  warning: '#FBBF24',
  warningBg: 'rgba(251, 191, 36, 0.12)',
  error: '#EF4444',
  errorBg: 'rgba(239, 68, 68, 0.12)',

  // Brand
  whatsapp: '#25D366',
  whatsappBg: 'rgba(37, 211, 102, 0.12)',

  // Overlays
  overlay: 'rgba(5, 7, 15, 0.7)',
  overlayLight: 'rgba(5, 7, 15, 0.4)',
} as const;

// ─── Spacing ──────────────────────────────────────────────────
export const spacing = {
  '2xs': 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
} as const;

// ─── Border Radius ────────────────────────────────────────────
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

// ─── Shadows ──────────────────────────────────────────────────
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  cardElevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 12,
  },
  button: {
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  glow: {
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },
} as const;

// ─── Hit Slop for Touch Targets ───────────────────────────────
export const hitSlop = {
  default: { top: 8, right: 8, bottom: 8, left: 8 },
  large: { top: 12, right: 12, bottom: 12, left: 12 },
} as const;

// ─── Icon Sizes ───────────────────────────────────────────────
export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
} as const;

// ─── Status Colors (for bookings, requests) ──────────────────
export const statusColors = {
  pending: { bg: 'rgba(251, 191, 36, 0.12)', text: '#FBBF24', label: 'Beklemede' },
  confirmed: { bg: 'rgba(74, 222, 128, 0.12)', text: '#4ADE80', label: 'Onaylandı' },
  in_progress: { bg: 'rgba(96, 165, 250, 0.12)', text: '#60A5FA', label: 'Devam Ediyor' },
  completed: { bg: 'rgba(148, 163, 184, 0.12)', text: '#94A3B8', label: 'Tamamlandı' },
  cancelled: { bg: 'rgba(239, 68, 68, 0.12)', text: '#EF4444', label: 'İptal Edildi' },
  issue: { bg: 'rgba(239, 68, 68, 0.12)', text: '#EF4444', label: 'Sorun Var' },
  received: { bg: 'rgba(201, 166, 107, 0.12)', text: '#C9A66B', label: 'Talep Alındı' },
  reviewing: { bg: 'rgba(96, 165, 250, 0.12)', text: '#60A5FA', label: 'İnceleniyor' },
  preparing_offer: { bg: 'rgba(251, 191, 36, 0.12)', text: '#FBBF24', label: 'Teklif Hazırlanıyor' },
  pending_approval: { bg: 'rgba(232, 199, 122, 0.12)', text: '#E8C77A', label: 'Onay Bekliyor' },
} as const;
