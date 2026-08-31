/**
 * TRAVIA DUBAI — NextExperienceCard Component (PRD §16)
 * Crucial home screen card highlighting the immediate upcoming activity
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';
import { Booking } from '../../types/models';
import StatusBadge from '../ui/StatusBadge';

interface NextExperienceCardProps {
  booking: Booking;
  countdownText?: string;
  onPressDetail?: () => void;
}

export default function NextExperienceCard({
  booking,
  countdownText = '2 saat 14 dakika sonra',
  onPressDetail,
}: NextExperienceCardProps) {
  const isTransfer = booking.type === 'transfer';

  return (
    <View style={styles.card}>
      {/* Top Gold Accent Line */}
      <View style={styles.topAccent} />

      {/* Top Header */}
      <View style={styles.headerRow}>
        <View style={styles.badgeWrap}>
          <Feather
            name={isTransfer ? 'navigation' : 'star'}
            size={12}
            color={colors.gold}
          />
          <Text style={styles.sectionBadge}>SIRADAKİ DENEYİM</Text>
        </View>
        <StatusBadge status={booking.status} />
      </View>

      {/* Title */}
      <Text style={styles.title}>{booking.title}</Text>

      {/* Time & Countdown */}
      <View style={styles.timeRow}>
        <View style={styles.timeWrap}>
          <Feather name="clock" size={14} color={colors.gold} />
          <Text style={styles.timeText}>
            {booking.date ? 'Bugün ' : ''}{booking.start_time?.slice(0, 5) || '10:30'}
          </Text>
        </View>
        <View style={styles.countdownBadge}>
          <View style={styles.countdownDot} />
          <Text style={styles.countdownText}>{countdownText}</Text>
        </View>
      </View>

      {/* Chauffeur / Vehicle info tag (if transfer) */}
      {isTransfer && booking.driver_name && (
        <View style={styles.driverPill}>
          <Feather name="user-check" size={12} color={colors.gold} />
          <Text style={styles.driverText}>
            {(booking as any).vehicle ? `${(booking as any).vehicle} · ` : ''}Şoför: {booking.driver_name}
          </Text>
        </View>
      )}

      {/* Location / Route */}
      {(booking.pickup_location || booking.location) && (
        <View style={styles.routeRow}>
          <Feather name="map-pin" size={12} color={colors.textTertiary} />
          <Text style={styles.routeText} numberOfLines={1}>
            {booking.pickup_location && booking.dropoff_location
              ? `${booking.pickup_location} → ${booking.dropoff_location}`
              : booking.location}
          </Text>
        </View>
      )}

      {/* Action Footer */}
      <Pressable onPress={onPressDetail} style={styles.actionButton}>
        <Text style={styles.actionText}>Deneyim ve İletişim Detayları</Text>
        <View style={styles.arrowCircle}>
          <Feather name="chevron-right" size={14} color={colors.gold} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0C111E',
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.35)',
    padding: spacing.xl,
    marginVertical: spacing.md,
    ...shadows.cardElevated,
    overflow: 'hidden',
    position: 'relative',
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 24,
    height: 2,
    backgroundColor: colors.gold,
    opacity: 0.7,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 166, 107, 0.12)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.md,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.25)',
  },
  sectionBadge: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['2xl'],
    color: colors.textPrimary,
    marginVertical: spacing.xs,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
    gap: 8,
  },
  timeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: fontSize.base,
    color: colors.goldSoft,
  },
  countdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 166, 107, 0.12)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.25)',
  },
  countdownDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.gold,
  },
  countdownText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: 10,
    color: colors.goldSoft,
  },
  driverPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    gap: 6,
  },
  driverText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: 11,
    color: colors.textPrimary,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
    gap: 5,
  },
  routeText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.xs,
    color: colors.gold,
    letterSpacing: 0.5,
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
