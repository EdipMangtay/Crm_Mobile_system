/**
 * TRAVIA DUBAI — TripHeroCard Component (PRD §14)
 * Luxury hero card displaying trip dates, hotel, pax label, and destination backdrop
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';
import { formatDateRange } from '../../utils/date';
import { Trip } from '../../types/models';

interface TripHeroCardProps {
  trip: Trip;
  onPress?: () => void;
}

export default function TripHeroCard({ trip, onPress }: TripHeroCardProps) {
  const dateRangeText = formatDateRange(trip.start_date, trip.end_date);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* Background Image */}
      <Image
        source={{
          uri: trip.cover_image_url || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
        }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={300}
      />

      {/* Dark Luxury Multi-Stop Vignette */}
      <View style={styles.gradientOverlayTop} />
      <View style={styles.gradientOverlayBottom} />

      {/* Gold Top Accent Hairline */}
      <View style={styles.topAccentBar} />

      {/* Content */}
      <View style={styles.content}>
        {/* Brand Tag & Live Status */}
        <View style={styles.brandRow}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandTag}>TRAVIA DUBAI</Text>
          </View>
          <View style={styles.statusPill}>
            <View style={styles.liveDot} />
            <Text style={styles.statusText}>REZERVASYON ONAYLI</Text>
          </View>
        </View>

        {/* Dates */}
        <Text style={styles.datesText}>{dateRangeText}</Text>

        {/* Sub details */}
        <View style={styles.detailsRow}>
          <Text style={styles.detailItem}>
            {trip.nights} Gece · {trip.pax_count} Kişi
          </Text>
          {trip.pax_label && (
            <>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.detailItem}>{trip.pax_label}</Text>
            </>
          )}
        </View>

        {/* Hotel & Location */}
        {trip.hotel_name && (
          <View style={styles.hotelRow}>
            <View style={styles.hotelIconWrap}>
              <Feather name="map-pin" size={12} color={colors.gold} />
            </View>
            <Text style={styles.hotelText}>{trip.hotel_name}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 230,
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.35)',
    ...shadows.cardElevated,
    marginVertical: spacing.md,
    backgroundColor: '#05070F',
  },
  topAccentBar: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: colors.gold,
    opacity: 0.8,
    borderRadius: 1,
    zIndex: 10,
  },
  gradientOverlayTop: {
    ...StyleSheet.absoluteFill as object,
    backgroundColor: 'rgba(5, 7, 15, 0.45)',
  },
  gradientOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: 'rgba(5, 7, 15, 0.75)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.xl,
    zIndex: 5,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  brandBadge: {
    backgroundColor: 'rgba(5, 7, 15, 0.6)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.3)',
  },
  brandTag: {
    fontFamily: fontFamily.serif.bold,
    fontSize: 10,
    letterSpacing: 2.5,
    color: colors.gold,
    textTransform: 'uppercase',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.16)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.4)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 5,
  },
  statusText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.success,
  },
  datesText: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['3xl'],
    color: colors.textPrimary,
    letterSpacing: 0.5,
    marginVertical: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailItem: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  separator: {
    color: colors.gold,
    marginHorizontal: spacing.xs,
  },
  hotelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  hotelIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  hotelText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
  },
});
