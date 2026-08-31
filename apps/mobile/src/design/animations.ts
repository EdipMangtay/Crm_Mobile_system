/**
 * TRAVIA DUBAI — Animation Presets
 * Premium but performant: 60fps target
 * Uses react-native-reanimated worklets
 */
import {
  withSpring,
  withTiming,
  Easing,
  type WithSpringConfig,
  type WithTimingConfig,
} from 'react-native-reanimated';

// ─── Spring Configs ───────────────────────────────────────────

export const springConfig = {
  /** Gentle card entrance */
  gentle: {
    damping: 20,
    stiffness: 150,
    mass: 0.8,
  } satisfies WithSpringConfig,

  /** Responsive button feedback */
  responsive: {
    damping: 15,
    stiffness: 250,
    mass: 0.5,
  } satisfies WithSpringConfig,

  /** Bouncy modal / sheet */
  bouncy: {
    damping: 12,
    stiffness: 180,
    mass: 0.7,
  } satisfies WithSpringConfig,

  /** Snappy tab switch */
  snappy: {
    damping: 25,
    stiffness: 400,
    mass: 0.3,
  } satisfies WithSpringConfig,
} as const;

// ─── Timing Configs ───────────────────────────────────────────

export const timingConfig = {
  /** Fast micro-interaction */
  fast: {
    duration: 150,
    easing: Easing.out(Easing.cubic),
  } satisfies WithTimingConfig,

  /** Default transition */
  normal: {
    duration: 300,
    easing: Easing.out(Easing.cubic),
  } satisfies WithTimingConfig,

  /** Smooth entrance */
  smooth: {
    duration: 500,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  } satisfies WithTimingConfig,

  /** Cinematic reveal */
  cinematic: {
    duration: 800,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  } satisfies WithTimingConfig,

  /** Skeleton shimmer */
  shimmer: {
    duration: 1200,
    easing: Easing.linear,
  } satisfies WithTimingConfig,
} as const;

// ─── Stagger Delays ──────────────────────────────────────────

export const stagger = {
  /** Fast list items */
  fast: 50,
  /** Normal card entrances */
  normal: 80,
  /** Dramatic timeline items */
  dramatic: 120,
} as const;

// ─── Common Animation Values ──────────────────────────────────

export const animationValues = {
  /** Card entrance: translate Y offset */
  cardEntrance: {
    from: { opacity: 0, translateY: 30, scale: 0.97 },
    to: { opacity: 1, translateY: 0, scale: 1 },
  },
  /** Fade in */
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  /** Scale press feedback */
  pressScale: {
    active: 0.97,
    inactive: 1,
  },
  /** Skeleton shimmer translate X range */
  shimmerRange: [-300, 300],
} as const;
