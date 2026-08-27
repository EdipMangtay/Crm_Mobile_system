/**
 * TRAVIA DUBAI — Premium Card Component
 */
import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius, shadows } from '../../design/tokens';
import { springConfig } from '../../design/animations';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  glowBorder?: boolean;
  enterDelay?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Card({
  children,
  onPress,
  style,
  elevated = false,
  glowBorder = false,
  enterDelay = 0,
}: CardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!onPress) return;
    scale.value = withSpring(0.98, springConfig.responsive);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    if (!onPress) return;
    scale.value = withSpring(1, springConfig.responsive);
  };

  const Wrapper = onPress ? AnimatedPressable : Animated.View;

  return (
    <Wrapper
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      entering={FadeInDown.delay(enterDelay).duration(500).springify()}
      style={[
        styles.card,
        elevated && shadows.cardElevated,
        !elevated && shadows.card,
        glowBorder && styles.glowBorder,
        animatedStyle,
        style,
      ]}
    >
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  glowBorder: {
    borderColor: colors.borderActive,
  },
});
