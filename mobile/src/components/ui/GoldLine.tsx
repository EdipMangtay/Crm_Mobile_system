/**
 * TRAVIA DUBAI — Decorative Gold Line
 */
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../design/tokens';

interface GoldLineProps {
  style?: ViewStyle;
  vertical?: boolean;
}

export default function GoldLine({ style, vertical = false }: GoldLineProps) {
  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
    backgroundColor: colors.border,
  },
  vertical: {
    width: 1,
    height: '100%',
    backgroundColor: colors.border,
  },
});
