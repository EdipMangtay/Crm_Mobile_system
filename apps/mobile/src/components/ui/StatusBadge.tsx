/**
 * TRAVIA DUBAI — StatusBadge Component
 */
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { statusColors } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';

export type StatusKey = keyof typeof statusColors;

interface StatusBadgeProps {
  status: StatusKey | string;
  label?: string;
  style?: ViewStyle;
}

export default function StatusBadge({ status, label, style }: StatusBadgeProps) {
  const config = statusColors[status as StatusKey] || {
    bg: 'rgba(201, 166, 107, 0.12)',
    text: '#C9A66B',
    label: status,
  };

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, style]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.text, { color: config.text }]}>
        {label || config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize['2xs'],
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
