/**
 * TRAVIA DUBAI — Staff Operations & Quick Actions Screen (PRD §44, §45)
 * Real-time operational timeline with live status updates and customer alerts.
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useTraviaStore, OperationItem } from '../../src/stores/traviaStore';
import SafeScreen from '../../src/components/layout/SafeScreen';
import StatusBadge from '../../src/components/ui/StatusBadge';

export default function StaffOperationsScreen() {
  const { operations, updateOperationStatus } = useTraviaStore();

  const handleUpdateStatus = (id: string, newStatus: OperationItem['status'], label: string) => {
    updateOperationStatus(id, newStatus);
    Alert.alert('Durum Güncellendi', `Operasyon durumu "${label}" olarak değiştirildi ve müşteriye yansıtıldı.`);
  };

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerBadge}>GÜNLÜK ÇİZELGE</Text>
          <Text style={styles.headerTitle}>Bugünün Operasyonları</Text>
          <Text style={styles.headerSubtitle}>
            Rezervasyon durumlarını ve şoför akışlarını gerçek zamanlı yönetin ({operations.length} Operasyon)
          </Text>
        </View>

        {/* Operations Timeline List (PRD §44) */}
        <View style={styles.listContainer}>
          {operations.map((op) => (
            <View key={op.id} style={styles.card}>
              {/* Top Row */}
              <View style={styles.topRow}>
                <View style={styles.timeBadge}>
                  <Feather name="clock" size={12} color={colors.gold} />
                  <Text style={styles.timeText}>{op.time}</Text>
                </View>
                <StatusBadge status={op.status} />
              </View>

              {/* Title & Customer */}
              <Text style={styles.opType}>{op.type}</Text>
              <Text style={styles.customerName}>{op.customerName}</Text>
              <Text style={styles.detailsText}>{op.details}</Text>

              {/* Location / Driver */}
              <View style={styles.locationRow}>
                <Feather name="map-pin" size={12} color={colors.textTertiary} />
                <Text style={styles.locationText}>{op.driverOrLocation}</Text>
              </View>

              {/* Quick Status Action Buttons (PRD §45) */}
              <View style={styles.actionPillsRow}>
                <Pressable
                  onPress={() => handleUpdateStatus(op.id, 'confirmed', 'Onaylandı')}
                  style={[styles.pillBtn, op.status === 'confirmed' && styles.activePill]}
                >
                  <Text style={[styles.pillText, op.status === 'confirmed' && styles.activePillText]}>
                    Onaylandı
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => handleUpdateStatus(op.id, 'in_progress', 'Başladı')}
                  style={[styles.pillBtn, op.status === 'in_progress' && styles.activePill]}
                >
                  <Text style={[styles.pillText, op.status === 'in_progress' && styles.activePillText]}>
                    Başladı
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => handleUpdateStatus(op.id, 'completed', 'Tamamlandı')}
                  style={[styles.pillBtn, op.status === 'completed' && styles.activePill]}
                >
                  <Text style={[styles.pillText, op.status === 'completed' && styles.activePillText]}>
                    Tamamlandı
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => handleUpdateStatus(op.id, 'issue', 'Sorun Var')}
                  style={[styles.pillBtn, op.status === 'issue' && styles.issuePill]}
                >
                  <Text style={[styles.pillText, op.status === 'issue' && styles.issuePillText]}>
                    Sorun Var
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    paddingBottom: spacing['4xl'],
  },
  headerBlock: {
    marginBottom: spacing.base,
  },
  headerBadge: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
  },
  headerTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['3xl'],
    color: colors.textPrimary,
    marginTop: 2,
  },
  headerSubtitle: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 4,
  },
  listContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    ...shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
    gap: 4,
  },
  timeText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 12,
    color: colors.gold,
  },
  opType: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    marginTop: 2,
  },
  customerName: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
    marginTop: 2,
  },
  detailsText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  locationText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textTertiary,
  },
  actionPillsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  pillBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  activePill: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    borderColor: 'rgba(74, 222, 128, 0.4)',
  },
  issuePill: {
    backgroundColor: colors.errorBg,
    borderColor: colors.error,
  },
  pillText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: 10,
    color: colors.textSecondary,
  },
  activePillText: {
    color: colors.success,
    fontFamily: fontFamily.sans.bold,
  },
  issuePillText: {
    color: colors.error,
    fontFamily: fontFamily.sans.bold,
  },
});
