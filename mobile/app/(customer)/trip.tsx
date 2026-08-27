/**
 * TRAVIA DUBAI — Seyahatim (Trip & Itinerary Screen) (PRD §19, §20, §21, §22)
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useTraviaStore } from '../../src/stores/traviaStore';
import { ItineraryItem, Booking } from '../../src/types/models';
import SafeScreen from '../../src/components/layout/SafeScreen';
import TimelineItem from '../../src/components/trip/TimelineItem';
import StatusBadge from '../../src/components/ui/StatusBadge';
import Button from '../../src/components/ui/Button';

export default function TripScreen() {
  const { trip, itineraryDays, bookings } = useTraviaStore();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [activeBookingModal, setActiveBookingModal] = useState<Booking | null>(null);

  const selectedDay = itineraryDays[selectedDayIndex] || itineraryDays[0] || { day_number: 1, date: '2026-09-12', title: 'Dubai', items: [] };

  const handleItemPress = (item: ItineraryItem) => {
    if (item.booking) {
      setActiveBookingModal(item.booking);
    } else {
      const match = bookings.find(
        (b) => item.booking_id === b.id || item.title.toLowerCase().includes(b.type) || item.title === b.title
      );
      if (match) {
        setActiveBookingModal(match);
      } else {
        setActiveBookingModal({
          id: item.id,
          company_id: 'a0000000-0000-0000-0000-000000000001',
          trip_id: trip.id,
          customer_id: trip.customer_id,
          type: 'activity',
          status: item.status,
          title: item.title,
          description: item.subtitle || 'Travia Dubai VIP program aktivitesi.',
          date: selectedDay.date,
          start_time: item.time,
          location: item.location,
          meeting_point: item.location || 'Otel Lobisi',
          pax_count: 2,
          dress_code: 'Smart Casual',
        });
      }
    }
  };

  const handleCallDriver = (phone?: string) => {
    if (phone) Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`);
  };

  const handleWhatsAppDriver = (whatsapp?: string) => {
    if (whatsapp) Linking.openURL(`https://wa.me/${whatsapp.replace(/\D/g, '')}`);
  };

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Block (PRD §19) */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerBadge}>SEYAHAT PROGRAMI</Text>
          <Text style={styles.headerTitle}>{trip.title}</Text>
          <Text style={styles.headerSubtitle}>
            12 – 17 Eylül · {trip.nights} Gece · {trip.pax_count} Kişi ({trip.pax_label})
          </Text>
        </View>

        {/* Horizontal Day Tabs (PRD §19) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayTabsContainer}
        >
          {itineraryDays.map((day, idx) => {
            const isSelected = idx === selectedDayIndex;
            return (
              <Pressable
                key={day.id}
                onPress={() => setSelectedDayIndex(idx)}
                style={[styles.dayTab, isSelected && styles.activeDayTab]}
              >
                <Text style={[styles.dayTabNum, isSelected && styles.activeDayTabText]}>
                  GÜN {day.day_number}
                </Text>
                <Text style={[styles.dayTabDate, isSelected && styles.activeDayDateText]}>
                  {day.date.slice(8, 10)} Eyl
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Selected Day Header (PRD §20) */}
        <View style={styles.dayInfoCard}>
          <View style={styles.dayBadgePill}>
            <Text style={styles.dayBadgeText}>GÜN {selectedDay.day_number}</Text>
          </View>
          <Text style={styles.dayTitleText}>{selectedDay.title}</Text>
        </View>

        {/* Day Timeline (PRD §20) */}
        <View style={styles.timelineList}>
          {selectedDay.items?.map((item, idx) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={idx === (selectedDay.items?.length || 0) - 1}
              onPress={() => handleItemPress(item)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Experience / Driver Detail Modal (PRD §21, §22) */}
      <Modal
        visible={!!activeBookingModal}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveBookingModal(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {activeBookingModal && (
              <>
                {/* Modal Top Header */}
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <StatusBadge status={activeBookingModal.status} />
                    <Text style={styles.modalTitle}>{activeBookingModal.title}</Text>
                  </View>
                  <Pressable
                    onPress={() => setActiveBookingModal(null)}
                    style={styles.closeBtn}
                  >
                    <Feather name="x" size={20} color={colors.textSecondary} />
                  </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Time & Meeting Point */}
                  <View style={styles.infoRow}>
                    <Feather name="clock" size={16} color={colors.gold} />
                    <Text style={styles.infoText}>
                      {activeBookingModal.start_time?.slice(0, 5)} - {activeBookingModal.end_time?.slice(0, 5)}
                    </Text>
                  </View>

                  {activeBookingModal.meeting_point && (
                    <View style={styles.infoRow}>
                      <Feather name="map-pin" size={16} color={colors.gold} />
                      <Text style={styles.infoText}>{activeBookingModal.meeting_point}</Text>
                    </View>
                  )}

                  {/* Driver / Vehicle Info Card (PRD §22) */}
                  {activeBookingModal.driver_name && (
                    <View style={styles.driverCard}>
                      <View style={styles.driverBadgeRow}>
                        <Text style={styles.driverSectionLabel}>ŞOFÖRÜNÜZ & ARAÇ BİLGİSİ</Text>
                      </View>

                      <View style={styles.driverMainRow}>
                        <View style={styles.driverAvatarCircle}>
                          <Feather name="user" size={24} color={colors.gold} />
                        </View>
                        <View style={{ flex: 1, marginLeft: spacing.md }}>
                          <Text style={styles.driverName}>{activeBookingModal.driver_name}</Text>
                          <Text style={styles.vehicleInfo}>
                            {activeBookingModal.vehicle_type} · {activeBookingModal.vehicle_plate}
                          </Text>
                        </View>
                      </View>

                      {/* Driver Action Buttons */}
                      <View style={styles.driverActionButtons}>
                        <Button
                          variant="gold"
                          size="sm"
                          onPress={() => handleCallDriver(activeBookingModal.driver_phone)}
                          icon={<Feather name="phone" size={14} color={colors.textInverse} />}
                          style={{ flex: 1, marginRight: spacing.xs }}
                        >
                          Şoförü Ara
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onPress={() => handleWhatsAppDriver(activeBookingModal.driver_whatsapp)}
                          icon={<Feather name="message-circle" size={14} color={colors.gold} />}
                          style={{ flex: 1, marginLeft: spacing.xs }}
                        >
                          WhatsApp
                        </Button>
                      </View>
                    </View>
                  )}

                  {/* Description & Included */}
                  {activeBookingModal.description && (
                    <View style={styles.descSection}>
                      <Text style={styles.sectionHeading}>Hizmet Detayı</Text>
                      <Text style={styles.descBody}>{activeBookingModal.description}</Text>
                    </View>
                  )}

                  {activeBookingModal.dress_code && (
                    <View style={styles.detailPillRow}>
                      <Text style={styles.pillLabel}>Kıyafet Kodu:</Text>
                      <Text style={styles.pillValue}>{activeBookingModal.dress_code}</Text>
                    </View>
                  )}
                </ScrollView>

                <Button
                  variant="gold"
                  size="md"
                  onPress={() => setActiveBookingModal(null)}
                  style={{ marginTop: spacing.md }}
                >
                  Tamam
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
    textTransform: 'uppercase',
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
  dayTabsContainer: {
    paddingVertical: spacing.sm,
    gap: 8,
    marginBottom: spacing.md,
  },
  dayTab: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  activeDayTab: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  dayTabNum: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 11,
    color: colors.goldSoft,
    letterSpacing: 1,
  },
  activeDayTabText: {
    color: colors.textInverse,
  },
  dayTabDate: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 10,
    color: colors.textTertiary,
    marginTop: 2,
  },
  activeDayDateText: {
    color: colors.textInverse,
  },
  dayInfoCard: {
    backgroundColor: 'rgba(201, 166, 107, 0.08)',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.base,
    marginBottom: spacing.lg,
  },
  dayBadgePill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(201, 166, 107, 0.2)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: radius.sm,
    marginBottom: 4,
  },
  dayBadgeText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
  },
  dayTitleText: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  timelineList: {
    marginTop: spacing.xs,
  },
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 15, 0.85)',
    justifyContent: 'flex-end',
  },
  modalCard: {
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
  modalTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.sm,
    color: colors.goldSoft,
    marginLeft: spacing.sm,
  },
  driverCard: {
    backgroundColor: 'rgba(11, 15, 26, 0.8)',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.base,
    marginVertical: spacing.md,
  },
  driverBadgeRow: {
    marginBottom: spacing.sm,
  },
  driverSectionLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 2,
    color: colors.gold,
  },
  driverMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  driverAvatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverName: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  vehicleInfo: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  driverActionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  descSection: {
    marginVertical: spacing.sm,
  },
  sectionHeading: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.xs,
    color: colors.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  descBody: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  detailPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  pillLabel: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    marginRight: 6,
  },
  pillValue: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
  },
});
