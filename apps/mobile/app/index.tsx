/**
 * TRAVIA DUBAI — Splash Screen (PRD §8)
 * Displays brand mark, gold embers, tagline, then transitions to auth or app shell
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../src/design/tokens';
import { fontFamily, fontSize } from '../src/design/typography';
import { useAuthStore } from '../src/stores/authStore';

export default function SplashScreen() {
  const router = useRouter();
  const { initialize, isAuthenticated, isCustomer, isStaff, mustChangePassword } = useAuthStore();

  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.92);
  const taglineOpacity = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    // Initial animations
    logoOpacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.cubic) });
    logoScale.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.cubic) });
    glowOpacity.value = withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) });
    taglineOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));

    // Initialize auth and route
    const timer = setTimeout(async () => {
      await initialize();
      const state = useAuthStore.getState();

      if (state.isAuthenticated) {
        if (state.mustChangePassword) {
          router.replace('/(auth)/change-password');
        } else if (state.isCustomer) {
          router.replace('/(customer)');
        } else {
          router.replace('/(staff)');
        }
      } else {
        router.replace('/(auth)/login');
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Subtle Radial Glow */}
      <Animated.View style={[styles.glowOrb, glowStyle]} />

      {/* Center Brand Identity */}
      <Animated.View style={[styles.centerContent, logoStyle]}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.splashLogo}
          resizeMode="contain"
        />
        <Text style={styles.brandTitle}>TRAVIA</Text>
        <Text style={styles.brandSubtitle}>DUBAI</Text>
      </Animated.View>

      {/* Bottom Tagline */}
      <Animated.View style={[styles.bottomContainer, taglineStyle]}>
        <View style={styles.goldHairline} />
        <Text style={styles.tagline}>Dubai'yi Size Özel Yaşayın.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOrb: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(201, 166, 107, 0.08)',
  },
  centerContent: {
    alignItems: 'center',
  },
  splashLogo: {
    width: 140,
    height: 140,
    marginBottom: 24,
    borderRadius: 28,
  },
  brandTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['4xl'],
    letterSpacing: 8,
    color: colors.textPrimary,
  },
  brandSubtitle: {
    fontFamily: fontFamily.serif.medium,
    fontSize: fontSize.lg,
    letterSpacing: 10,
    color: colors.gold,
    marginTop: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  goldHairline: {
    width: 40,
    height: 1,
    backgroundColor: colors.borderActive,
    marginBottom: 12,
  },
  tagline: {
    fontFamily: fontFamily.serif.medium,
    fontSize: fontSize.sm,
    color: colors.goldSoft,
    letterSpacing: 1,
  },
});
