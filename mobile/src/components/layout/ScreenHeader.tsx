/**
 * TRAVIA DUBAI — ScreenHeader Component
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  canGoBack?: boolean;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export default function ScreenHeader({
  title,
  subtitle,
  canGoBack = false,
  rightAction,
  style,
}: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={[styles.header, style]}>
      <View style={styles.left}>
        {canGoBack && (
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={12}
          >
            <Feather name="chevron-left" size={24} color={colors.gold} />
          </Pressable>
        )}
        <View>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      {rightAction && <View style={styles.right}>{rightAction}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize['2xs'],
    color: colors.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
