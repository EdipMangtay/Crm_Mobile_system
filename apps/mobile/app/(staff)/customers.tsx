/**
 * TRAVIA DUBAI — Staff Active Customers Screen (PRD §40)
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useTraviaStore, StaffCustomerItem } from '../../src/stores/traviaStore';
import SafeScreen from '../../src/components/layout/SafeScreen';
import Avatar from '../../src/components/ui/Avatar';
import Button from '../../src/components/ui/Button';

export default function StaffCustomersScreen() {
  const router = useRouter();
  const { staffCustomers, setActiveCustomer } = useTraviaStore();
  const [selectedCustomer, setSelectedCustomer] = useState<StaffCustomerItem | null>(null);

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerBadge}>MİSAFİR YÖNETİMİ</Text>
          <Text style={styles.headerTitle}>Aktif Müşteriler</Text>
          <Text style={styles.headerSubtitle}>
            Bugün ilgilenilen ve yaklaşan seyahati olan misafirler
          </Text>
        </View>

        {/* Customer List */}
        <View style={styles.listContainer}>
          {staffCustomers.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => setSelectedCustomer(c)}
              style={styles.customerCard}
            >
              <Avatar name={c.name} size={48} />

              <View style={styles.cardCenter}>
                <Text style={styles.customerName}>{c.name}</Text>
                <Text style={styles.paxLabel}>{c.paxLabel}</Text>
                <Text style={styles.datesLabel}>{c.dates} · {c.hotel}</Text>
              </View>

              <View style={styles.cardRight}>
                <View style={[styles.statusBadge, c.isInsideDubai && styles.statusBadgeActive]}>
                  <Text style={[styles.statusBadgeText, c.isInsideDubai && styles.statusBadgeTextActive]}>
                    {c.statusText}
                  </Text>
                </View>

                {c.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCountText}>{c.unreadCount} yeni</Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Customer Context Detail Modal (PRD §40) */}
      <Modal
        visible={!!selectedCustomer}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedCustomer(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            {selectedCustomer && (
              <>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={styles.modalBadge}>MÜŞTERİ DETAYI & CONTEXT</Text>
                    <Text style={styles.modalTitle}>{selectedCustomer.name}</Text>
                  </View>
                  <Pressable onPress={() => setSelectedCustomer(null)} style={styles.closeBtn}>
                    <Feather name="x" size={20} color={colors.textSecondary} />
                  </Pressable>
                </View>

                <View style={styles.contextCard}>
                  <View style={styles.contextRow}>
                    <Text style={styles.contextLabel}>Durum:</Text>
                    <Text style={styles.contextValue}>{selectedCustomer.statusText}</Text>
                  </View>
                  <View style={styles.contextRow}>
                    <Text style={styles.contextLabel}>Konaklama:</Text>
                    <Text style={styles.contextValue}>{selectedCustomer.hotel}</Text>
                  </View>
                  <View style={styles.contextRow}>
                    <Text style={styles.contextLabel}>Tarihler:</Text>
                    <Text style={styles.contextValue}>{selectedCustomer.dates}</Text>
                  </View>
                  <View style={styles.contextRow}>
                    <Text style={styles.contextLabel}>Kalan Bakiye:</Text>
                    <Text style={[styles.contextValue, { color: colors.goldSoft }]}>
                      {selectedCustomer.outstanding}
                    </Text>
                  </View>
                </View>

                <Button
                  variant="gold"
                  size="md"
                  onPress={() => {
                    setActiveCustomer(selectedCustomer.customerId);
                    setSelectedCustomer(null);
                    router.push('/(staff)/messages');
                  }}
                  icon={<Feather name="message-circle" size={16} color={colors.textInverse} />}
                  style={{ marginTop: spacing.base }}
                >
                  Müşteriyle Mesajlaş
                </Button>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    gap: 10,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
  },
  cardCenter: {
    flex: 1,
    marginLeft: spacing.md,
  },
  customerName: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  paxLabel: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.goldSoft,
    marginTop: 1,
  },
  datesLabel: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.full,
  },
  statusBadgeActive: {
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
  },
  statusBadgeText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: 10,
    color: colors.gold,
  },
  statusBadgeTextActive: {
    color: colors.success,
  },
  unreadBadge: {
    backgroundColor: 'rgba(201, 166, 107, 0.2)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: radius.sm,
    marginTop: 6,
  },
  unreadCountText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    color: colors.goldSoft,
  },
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 15, 0.85)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.surfaceElevated,
    borderTopLeftRadius: radius['3xl'],
    borderTopRightRadius: radius['3xl'],
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.xl,
    maxHeight: '80%',
    ...shadows.cardElevated,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  modalBadge: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 2,
    color: colors.gold,
  },
  modalTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contextCard: {
    backgroundColor: 'rgba(11, 15, 26, 0.8)',
    borderRadius: radius.xl,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  contextLabel: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  contextValue: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
