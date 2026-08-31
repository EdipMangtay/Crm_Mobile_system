/**
 * TRAVIA DUBAI — Avatar Component
 */
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { colors, radius } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';

interface AvatarProps {
  url?: string | null;
  name: string;
  size?: number;
  style?: any;
}

export default function Avatar({ url, name, size = 44, style }: AvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'TD';

  if (url) {
    return (
      <Image
        source={{ uri: url }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
          style,
        ]}
        contentFit="cover"
        transition={200}
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: colors.borderActive,
  },
  fallback: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderActive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fontFamily.serif.semiBold,
    color: colors.goldSoft,
    letterSpacing: 1,
  },
});
