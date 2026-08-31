/**
 * TRAVIA DUBAI — Premium Input Component
 */
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { colors, spacing, radius } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';
import { timingConfig } from '../../design/animations';
import { Feather } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Feather.glyphMap;
  rightIcon?: keyof typeof Feather.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

export default function Input({
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useSharedValue<string>(colors.border);

  const animatedBorder = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  const handleFocus = () => {
    setIsFocused(true);
    borderColor.value = withTiming(colors.gold, timingConfig.fast);
    props.onFocus?.({} as any);
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderColor.value = withTiming(
      error ? colors.error : colors.border,
      timingConfig.fast
    );
    props.onBlur?.({} as any);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      <Animated.View style={[styles.inputContainer, animatedBorder, error && styles.errorBorder]}>
        {icon && (
          <Feather
            name={icon}
            size={18}
            color={isFocused ? colors.gold : colors.textTertiary}
            style={styles.icon}
          />
        )}

        <TextInput
          {...props}
          style={[styles.input, props.style]}
          placeholderTextColor={colors.textTertiary}
          selectionColor={colors.goldSoft}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {rightIcon && (
          <Pressable onPress={onRightIconPress} hitSlop={12}>
            <Feather
              name={rightIcon}
              size={18}
              color={colors.textTertiary}
            />
          </Pressable>
        )}
      </Animated.View>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.xs,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.gold,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 15, 26, 0.8)',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.base,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    paddingVertical: spacing.base,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  error: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
