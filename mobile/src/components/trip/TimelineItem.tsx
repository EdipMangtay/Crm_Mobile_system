/**
 * TRAVIA DUBAI — TimelineItem Component (PRD §17, §20)
 * Chronological activity node with gold vertical line, time, status, and detail trigger
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';
import { ItineraryItem } from '../../types/models';
import StatusBadge from '../ui/StatusBadge';

interface TimelineItemProps {
  item: ItineraryItem;
  isLast?: boolean;
  onPress?: () => void;
}

export default function TimelineItem({
  item,
  isLast = false,
  onPress,
}: TimelineItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* Left Node & Vertical Line */}
      <View style={styles.timelineColumn}>
        <View style={[styles.node, item.is_highlight && styles.highlightNode]}>
          <Feather
            name={item.icon === 'plane' ? 'send' : item.icon === 'car' ? 'truck' : 'check'}
            size={12}
            color={item.is_highlight ? colors.textInverse : colors.gold}
          />
        </View>
        {!isLast && <View style={styles.verticalLine} />}
      </View>

      {/* Right Content Card */}
      <View style={[styles.contentCard, item.is_highlight && styles.highlightCard]}>
        <View style={styles.topRow}>
          <Text style={styles.time}>{item.time?.slice(0, 5) || '--:--'}</Text>
          <StatusBadge status={item.status} />
        </View>

        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}

        {item.location && (
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={12} color={colors.textTertiary} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.base,
  },
  timelineColumn: {
    width: 32,
    alignItems: 'center',
  },
  node: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderActive,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  highlightNode: {
    backgroundColor: colors.gold,
    borderColor: colors.goldSoft,
  },
  verticalLine: {
    flex: 1,
    width: 1,
    backgroundColor: colors.border,
    marginTop: 4,
    marginBottom: -4,
  },
  contentCard: {
    flex: 1,
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginLeft: spacing.sm,
  },
  highlightCard: {
    borderColor: colors.borderActive,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  time: {
    fontFamily: fontFamily.sans.bold,
    fontSize: fontSize.sm,
    color: colors.goldSoft,
  },
  title: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    marginTop: 2,
  },
  subtitle: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  locationText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textTertiary,
    marginLeft: 4,
  },
});
