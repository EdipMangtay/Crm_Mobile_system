/**
 * TRAVIA DUBAI — SafeScreen Layout Component
 * Standard background, status bar style, and safe area insets
 */
import React from 'react';
import { View, StyleSheet, StatusBar, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../design/tokens';

interface SafeScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export default function SafeScreen({
  children,
  style,
  edges = ['top', 'left', 'right'],
}: SafeScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
