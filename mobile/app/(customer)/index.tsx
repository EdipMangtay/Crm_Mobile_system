/**
 * TRAVIA DUBAI — Customer Home Dashboard (PRD §14, §15, §16, §17, §18, §35)
 * Dynamic, reactive connection to useTraviaStore.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  Modal,
  Linking,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useAuthStore } from '../../src/stores/authStore';
import { useTraviaStore } from '../../src/stores/traviaStore';
import { Booking, ItineraryItem } from '../../src/types/models';
import SafeScreen from '../../src/components/layout/SafeScreen';
import TripHeroCard from '../../src/components/trip/TripHeroCard';
import CountdownTimer from '../../src/components/trip/CountdownTimer';
import NextExperienceCard from '../../src/components/trip/NextExperienceCard';
import TimelineItem from '../../src/components/trip/TimelineItem';
import StatusBadge from '../../src/components/ui/StatusBadge';
import Button from '../../src/components/ui/Button';
import Avatar from '../../src/components/ui/Avatar';
import { getGreeting, timeUntil } from '../../src/utils/date';

export default function CustomerHomeScreen() {
  const router = useRouter();
  const { profile } = useAuthStore();
  const {
    trip,
    itineraryDays,
    bookings,
    notifications,
    messages,
    markNotificationsAsRead,
  } = useTraviaStore();

  const [refreshing, setRefreshing] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [selectedBookingModal, setSelectedBookingModal] = useState<Booking | null>(null);

  const greeting = getGreeting();
  const firstName = profile?.first_name || 'Edip';
  const todayItems = itineraryDays[0]?.items || [];
  const nextBooking = bookings[0];

  const unreadNotifCount = notifications.filter((n) => !n.is_read).length;
  const unreadMessageCount = messages.filter(
    (m) => m.sender_role === 'concierge' && m.status !== 'read'
  ).length;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleOpenNotifications = () => {
    setIsNotifModalOpen(true);
    markNotificationsAsRead();
  };

  const handleItemPress = (item: ItineraryItem) => {
    if (item.booking) {
      setSelectedBookingModal(item.booking);
    } else {
      const match = bookings.find((b) => item.title.includes(b.type) || item.title.includes(b.title));
      if (match) {
        setSelectedBookingModal(match);
      } else {
        router.push('/(customer)/trip');
      }
    }
  };

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.gold}
          />
        }
      >
        {/* Top Header Block */}
        <View style={styles.topBar}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.subGreeting}>TRAVIA DUBAI · VIP</Text>
              <Text style={styles.mainGreeting}>
                {greeting}, {firstName}
              </Text>
            </View>
          </View>

          <View style={styles.topActions}>
            {/* Notification Bell with Badge (PRD §35) */}
            <Pressable
              onPress={handleOpenNotifications}
              style={styles.notifBtn}
              hitSlop={8}
            >
              <Feather name="bell" size={20} color={colors.gold} />
              {unreadNotifCount > 0 && (
                <View style={styles.notifBadge}>
                  <Text style={styles.notifBadgeText}>{unreadNotifCount}</Text>
                </View>
              )}
            </Pressable>

            {/* Profile Avatar */}
            <Pressable
              onPress={() => router.push('/(customer)/profile')}
              style={styles.avatarBtn}
            >
              <Avatar name={`${firstName} ${profile?.last_name || ''}`} size={38} />
            </Pressable>
          </View>
        </View>

        {/* Big Hero Card (PRD §14) */}
        <TripHeroCard
          trip={trip}
          onPress={() => router.push('/(customer)/trip')}
        />

        {/* Countdown Timer (PRD §15) */}
        <CountdownTimer
          startDate={trip.start_date}
          endDate={trip.end_date}
        />

        {/* Next Experience Card (PRD §16) */}
        {nextBooking && (
          <NextExperienceCard
            booking={nextBooking}
            countdownText={nextBooking.start_time ? timeUntil(new Date(), nextBooking.start_time) : timeUntil(trip.start_date)}
            onPressDetail={() => setSelectedBookingModal(nextBooking)}
          />
        )}

        {/* Today's Schedule Timeline (PRD §17) */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionBadge}>GÜNLÜK AKIŞ</Text>
            <Text style={styles.sectionTitle}>Bugünün Programı</Text>
          </View>
          <Pressable
            onPress={() => router.push('/(customer)/trip')}
            hitSlop={8}
          >
            <Text style={styles.seeAllText}>Tüm Program ({itineraryDays.length} Gün)</Text>
          </Pressable>
        </View>

        <View style={styles.timelineWrapper}>
          {todayItems.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={index === todayItems.length - 1}
              onPress={() => handleItemPress(item)}
            />
          ))}
        </View>

        {/* Travia Concierge Card (PRD §18) */}
        <View style={styles.conciergeCard}>
          <View style={styles.conciergeTop}>
            <View style={styles.conciergeBadgeWrap}>
              <View style={styles.liveGreenDot} />
              <Text style={styles.liveGreenText}>Travia ekibi çevrimiçi</Text>
            </View>

            {unreadMessageCount > 0 && (
              <View style={styles.msgBadgeWrap}>
                <Feather name="message-square" size={10} color={colors.gold} />
                <Text style={styles.msgBadgeText}>{unreadMessageCount} Yeni Mesaj</Text>
              </View>
            )}
          </View>

          <Text style={styles.conciergeTitle}>Travia Concierge</Text>
          <Text style={styles.conciergeSubtitle}>
            Dubai'de ihtiyacınız olan her an, restoran rezervasyonundan özel yat talebine kadar yanınızdayız.
          </Text>

          <Button
            variant="gold"
            size="md"
            onPress={() => router.push('/(customer)/concierge')}
            icon={<Feather name="message-circle" size={16} color={colors.textInverse} />}
            style={styles.conciergeBtn}
          >
            Concierge'e Yaz
          </Button>
        </View>
      </ScrollView>

      {/* ─── MODAL: BİLDİRİM MERKEZİ (PRD §35) ───────────────────── */}
      <Modal
        visible={isNotifModalOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsNotifModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="bell" size={18} color={colors.gold} style={{ marginRight: 8 }} />
                <Text style={styles.modalTitle}>Bildirimler</Text>
              </View>
              <Pressable onPress={() => setIsNotifModalOpen(false)} style={styles.closeBtn}>
                <Feather name="x" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {notifications.length === 0 ? (
                <Text style={styles.emptyNotifText}>Henüz yeni bildiriminiz bulunmuyor.</Text>
              ) : (
                notifications.map((notif) => (
                  <View key={notif.id} style={styles.notifItem}>
                    <View style={styles.notifIconWrap}>
                      <Feather
                        name={
                          notif.type.includes('driver')
                            ? 'truck'
                            : notif.type.includes('booking')
                            ? 'check-circle'
                            : notif.type.includes('message')
                            ? 'message-circle'
                            : 'bell'
                        }
                        size={16}
                        color={colors.gold}
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={styles.notifItemTitle}>{notif.title}</Text>
                      {notif.body && <Text style={styles.notifItemBody}>{notif.body}</Text>}
                      <Text style={styles.notifItemDate}>
                        {notif.created_at?.slice(11, 16) || 'Şimdi'}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>

            <Button
              variant="gold"
              size="md"
              onPress={() => setIsNotifModalOpen(false)}
              style={{ marginTop: spacing.base }}
            >
              Tamam
            </Button>
          </View>
        </View>
      </Modal>

      {/* ─── MODAL: BOOKING / DRIVER DETAIL (PRD §21, §22) ───────── */}
      <Modal
        visible={!!selectedBookingModal}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedBookingModal(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {selectedBookingModal && (
              <>
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalBadge}>REZERVASYON DETAYI</Text>
                    <Text style={styles.modalTitle}>{selectedBookingModal.title}</Text>
                  </View>
                  <Pressable onPress={() => setSelectedBookingModal(null)} style={styles.closeBtn}>
                    <Feather name="x" size={20} color={colors.textSecondary} />
                  </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 380 }}>
                  <View style={styles.detailCard}>
                    <View style={styles.badgeRow}>
                      <StatusBadge status={selectedBookingModal.status} />
                      <Text style={styles.dateTimeText}>
                        {selectedBookingModal.date} · {selectedBookingModal.start_time || '10:30'}
                      </Text>
                    </View>

                    {selectedBookingModal.description && (
                      <Text style={styles.descText}>{selectedBookingModal.description}</Text>
                    )}

                    {selectedBookingModal.meeting_point && (
                      <View style={styles.infoRow}>
                        <Feather name="map-pin" size={14} color={colors.gold} />
                        <Text style={styles.infoRowText}>
                          Buluşma Noktası: {selectedBookingModal.meeting_point}
                        </Text>
                      </View>
                    )}

                    {/* Driver Information Card (PRD §22) */}
                    {selectedBookingModal.driver_name && (
                      <View style={styles.driverSection}>
                        <Text style={styles.driverHeading}>ŞOFÖR BİLGİLERİ</Text>
                        <View style={styles.driverBox}>
                          <Avatar name={selectedBookingModal.driver_name} size={44} />
                          <View style={{ flex: 1, marginLeft: spacing.md }}>
                            <Text style={styles.driverName}>{selectedBookingModal.driver_name}</Text>
                            <Text style={styles.driverVehicle}>
                              {selectedBookingModal.vehicle_type} · Plaka: {selectedBookingModal.vehicle_plate}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.driverActionsRow}>
                          {selectedBookingModal.driver_phone && (
                            <Button
                              variant="outline"
                              size="sm"
                              onPress={() =>
                                Linking.openURL(`tel:${selectedBookingModal.driver_phone?.replace(/\s+/g, '')}`)
                              }
                              icon={<Feather name="phone" size={14} color={colors.gold} />}
                              style={{ flex: 1, marginRight: 6 }}
                            >
                              Şoförü Ara
                            </Button>
                          )}
                          {selectedBookingModal.driver_whatsapp && (
                            <Button
                              variant="gold"
                              size="sm"
                              onPress={() =>
                                Linking.openURL(
                                  `https://wa.me/${selectedBookingModal.driver_whatsapp?.replace(/\D/g, '')}`
                                )
                              }
                              icon={<Feather name="message-circle" size={14} color={colors.textInverse} />}
                              style={{ flex: 1, marginLeft: 6 }}
                            >
                              WhatsApp
                            </Button>
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                </ScrollView>

                <Button
                  variant="gold"
                  size="md"
                  onPress={() => setSelectedBookingModal(null)}
                  style={{ marginTop: spacing.md }}
                >
                  Kapat
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
    paddingBottom: 120,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
    paddingVertical: spacing.xs,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.4)',
  },
  subGreeting: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.xs,
    color: colors.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  mainGreeting: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['2xl'],
    color: colors.textPrimary,
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notifBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: colors.gold,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  notifBadgeText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    color: colors.textInverse,
  },
  avatarBtn: {
    padding: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionBadge: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 2,
    color: colors.gold,
  },
  sectionTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginTop: 2,
  },
  seeAllText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
  },
  timelineWrapper: {
    marginTop: spacing.xs,
  },
  conciergeCard: {
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.xl,
    marginTop: spacing.lg,
    ...shadows.cardElevated,
  },
  conciergeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  conciergeBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.full,
  },
  liveGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  liveGreenText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: 10,
    color: colors.success,
  },
  msgBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    gap: 4,
  },
  msgBadgeText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: 10,
    color: colors.gold,
  },
  conciergeTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  conciergeSubtitle: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  conciergeBtn: {
    marginTop: spacing.base,
  },
  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#0B0F1A',
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.xl,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  modalBadge: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 2,
    color: colors.gold,
  },
  modalTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  emptyNotifText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  notifIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(201, 166, 107, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  notifItemTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  notifItemBody: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  notifItemDate: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 10,
    color: colors.textTertiary,
    marginTop: 4,
  },
  detailCard: {
    paddingVertical: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  dateTimeText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
  },
  descText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  infoRowText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
  },
  driverSection: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  driverHeading: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
    marginBottom: spacing.sm,
  },
  driverBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  driverName: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  driverVehicle: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  driverActionsRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
});
