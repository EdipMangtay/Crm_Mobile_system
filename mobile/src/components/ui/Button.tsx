/**
 * TRAVIA DUBAI — Premium Button Component
 * Gold primary, dark outline, ghost variants
 */
import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, spacing, radius } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';
import { springConfig } from '../../design/animations';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'gold' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, springConfig.responsive);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig.responsive);
  };

  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        styles.base,
        variantStyles.container,
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyles.textColor}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              { color: variantStyles.textColor },
              sizeStyles.text,
              icon ? { marginLeft: spacing.sm } : undefined,
            ]}
          >
            {children}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
}

const variants: Record<ButtonVariant, { container: ViewStyle; textColor: string }> = {
  gold: {
    container: {
      backgroundColor: colors.gold,
      borderWidth: 0,
    },
    textColor: colors.textInverse,
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.borderActive,
    },
    textColor: colors.gold,
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    textColor: colors.gold,
  },
  danger: {
    container: {
      backgroundColor: colors.errorBg,
      borderWidth: 1,
      borderColor: colors.error,
    },
    textColor: colors.error,
  },
};

const sizes: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.base,
      borderRadius: radius.md,
    },
    text: {
      fontSize: fontSize.sm,
    },
  },
  md: {
    container: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.lg,
    },
    text: {
      fontSize: fontSize.base,
    },
  },
  lg: {
    container: {
      paddingVertical: spacing.base,
      paddingHorizontal: spacing['2xl'],
      borderRadius: radius.xl,
    },
    text: {
      fontSize: fontSize.md,
    },
  },
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fontFamily.sans.semiBold,
    letterSpacing: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },
});
