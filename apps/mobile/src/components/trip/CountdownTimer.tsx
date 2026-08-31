/**
 * TRAVIA DUBAI — CountdownTimer Component (PRD §15)
 * Luxury boarding pass countdown banner with gold accents
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';
import { daysUntil } from '../../utils/date';

interface CountdownTimerProps {
  startDate: string;
  endDate: string;
}

export default function CountdownTimer({ startDate, endDate }: CountdownTimerProps) {
  const days = daysUntil(startDate);
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let message = '';
  let subMessage = '';
  let iconName: keyof typeof Feather.glyphMap = 'compass';

  if (now > end) {
    message = 'Dubai Deneyimi Tamamlandı';
    subMessage = 'Bir sonraki seyahatinizde görüşmek üzere.';
    iconName = 'check-circle';
  } else if (now >= start && now <= end) {
    message = 'Dubai Deneyiminiz Başladı';
    subMessage = 'Bugün harika anlar ve VIP ayrıcalıklar sizi bekliyor';
    iconName = 'compass';
  } else if (days === 0) {
    message = 'Yolculuğunuz Bugün Başlıyor!';
    subMessage = 'Valizler hazır, VIP transferiniz yolda';
    iconName = 'send';
  } else if (days === 1) {
    message = "Dubai'ye Son 24 Saat";
    subMessage = 'Yarın Dubai semalarında buluşuyoruz';
    iconName = 'clock';
  } else {
    message = `Dubai'ye ${days} Gün Kaldı`;
    subMessage = 'Özel concierge ekibiniz seyahatinizi hazırlıyor';
    iconName = 'clock';
  }

  return (
    <View style={styles.container}>
      {/* Left Icon with Luxury Ambient Ring */}
      <View style={styles.iconRing}>
        <View style={styles.iconCircle}>
          <Feather name={iconName} size={18} color={colors.gold} />
        </View>
      </View>

      {/* Center Details */}
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.badgeLabel}>VIP COUNTDOWN</Text>
          {days > 0 && <Text style={styles.daysBadge}>{days} GÜN</Text>}
        </View>
        <Text style={styles.message}>{message}</Text>
        {subMessage ? <Text style={styles.subMessage}>{subMessage}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0C111E',
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.28)',
    borderRadius: radius['2xl'],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  iconRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.3)',
    backgroundColor: 'rgba(201, 166, 107, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  badgeLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
  },
  daysBadge: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 10,
    color: colors.goldSoft,
    backgroundColor: 'rgba(201, 166, 107, 0.12)',
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  message: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  subMessage: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
