/**
 * TRAVIA DUBAI — Keşfet (Explore & Curated Upsells) (PRD §29, §30, §31)
 * Ultra-luxury experiences with high-resolution imagery, deep details modal, and 1-tap Concierge booking
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useTraviaStore } from '../../src/stores/traviaStore';
import { mockExperiences } from '../../src/lib/mockData';
import { ExperienceItem, RequestCategory } from '../../src/types/models';
import SafeScreen from '../../src/components/layout/SafeScreen';
import Button from '../../src/components/ui/Button';
import Input from '../../src/components/ui/Input';

const { width } = Dimensions.get('window');

const experienceImages: Record<string, any> = {
  'exp-1': require('../../assets/images/experiences/luxury-yacht.jpg'),
  'exp-2': require('../../assets/images/experiences/desert-safari.jpg'),
  'exp-3': require('../../assets/images/experiences/helicopter.jpg'),
  'exp-4': require('../../assets/images/experiences/fine-dining.jpg'),
  'exp-5': require('../../assets/images/experiences/vip-chauffeur.jpg'),
  'exp-6': require('../../assets/images/experiences/burj-cabana.jpg'),
};

const experienceGalleries: Record<string, any[]> = {
  'exp-1': [
    require('../../assets/images/experiences/luxury-yacht.jpg'),
    require('../../assets/images/experiences/hero-skyline.jpg'),
    require('../../assets/images/experiences/burj-cabana.jpg'),
  ],
  'exp-2': [
    require('../../assets/images/experiences/desert-safari.jpg'),
    require('../../assets/images/experiences/vip-chauffeur.jpg'),
    require('../../assets/images/experiences/hero-skyline.jpg'),
  ],
  'exp-3': [
    require('../../assets/images/experiences/helicopter.jpg'),
    require('../../assets/images/experiences/burj-cabana.jpg'),
    require('../../assets/images/experiences/hero-skyline.jpg'),
  ],
  'exp-4': [
    require('../../assets/images/experiences/fine-dining.jpg'),
    require('../../assets/images/experiences/hero-skyline.jpg'),
    require('../../assets/images/experiences/luxury-yacht.jpg'),
  ],
  'exp-5': [
    require('../../assets/images/experiences/vip-chauffeur.jpg'),
    require('../../assets/images/experiences/fine-dining.jpg'),
    require('../../assets/images/experiences/hero-skyline.jpg'),
  ],
  'exp-6': [
    require('../../assets/images/experiences/burj-cabana.jpg'),
    require('../../assets/images/experiences/luxury-yacht.jpg'),
    require('../../assets/images/experiences/helicopter.jpg'),
  ],
};

export default function ExploreScreen() {
  const router = useRouter();
  const { createCustomerRequest } = useTraviaStore();

  // Selected experience for full detail modal
  const [detailExperience, setDetailExperience] = useState<ExperienceItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Booking / Upsell request state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingTargetExperience, setBookingTargetExperience] = useState<ExperienceItem | null>(null);
  const [requestDate, setRequestDate] = useState('2026-09-15');
  const [requestPax, setRequestPax] = useState('2');
  const [requestNotes, setRequestNotes] = useState('');

  const handleOpenDetail = (exp: ExperienceItem) => {
    setDetailExperience(exp);
    setActiveGalleryIndex(0);
  };

  const handleOpenBooking = (exp: ExperienceItem) => {
    setBookingTargetExperience(exp);
    setIsBookingModalOpen(true);
  };

  const handleSendUpsell = () => {
    if (!bookingTargetExperience) return;

    let cat: RequestCategory = 'activity';
    if (bookingTargetExperience.category === 'yacht') cat = 'yacht';
    if (bookingTargetExperience.category === 'transfer') cat = 'transfer';
    if (bookingTargetExperience.category === 'restaurant') cat = 'restaurant';

    createCustomerRequest({
      category: cat,
      title: `${bookingTargetExperience.title} Talebi`,
      date: requestDate,
      time: '14:00',
      pax_count: parseInt(requestPax, 10) || 2,
      notes: requestNotes || `${bookingTargetExperience.duration} süreli seçkin Dubai deneyimi talebi.`,
    });

    Alert.alert(
      'Talebiniz Alındı',
      `${bookingTargetExperience.title} için talebiniz VIP Concierge ekibimize iletildi ve seyahatinize eklenmek üzere işleme alındı.`,
      [
        {
          text: 'Harika',
          onPress: () => {
            setIsBookingModalOpen(false);
            setBookingTargetExperience(null);
            setDetailExperience(null);
          },
        },
      ]
    );
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'yacht':
        return 'ÖZEL YAT';
      case 'desert_safari':
        return 'ÇÖL SAFARİSİ';
      case 'helicopter':
        return 'HELİKOPTER';
      case 'restaurant':
        return 'FINE DINING';
      case 'transfer':
        return 'VIP TRANSFER';
      default:
        return 'DENEYİM';
    }
  };

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Block */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerBadge}>SEÇKİN AYRICALIKLAR</Text>
          <Text style={styles.headerTitle}>Dubai'yi Keşfedin</Text>
          <Text style={styles.headerSubtitle}>
            Seyahatinize ekleyebileceğiniz özel şoförlü turlar, süperyatlar ve gastronomik deneyimler.
          </Text>
        </View>

        {/* Experiences Cards Feed */}
        <View style={styles.cardsContainer}>
          {mockExperiences.map((exp) => (
            <Pressable
              key={exp.id}
              style={styles.experienceCard}
              onPress={() => handleOpenDetail(exp)}
            >
              {/* Cover Image with Vignette */}
              <View style={styles.cardImageContainer}>
                <Image
                  source={experienceImages[exp.id] || { uri: exp.cover_image_url }}
                  style={styles.cardCoverImage}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay} />

                {/* Badges on Image */}
                <View style={styles.imageTopBar}>
                  <View style={styles.categoryPill}>
                    <Text style={styles.categoryPillText}>{getCategoryLabel(exp.category)}</Text>
                  </View>
                  <View style={styles.durationPill}>
                    <Feather name="clock" size={11} color={colors.gold} />
                    <Text style={styles.durationPillText}>{exp.duration}</Text>
                  </View>
                </View>

                {/* Price on Image Bottom Right */}
                {exp.price_label && (
                  <View style={styles.pricePill}>
                    <Text style={styles.priceText}>{exp.price_label}</Text>
                  </View>
                )}
              </View>

              {/* Card Body */}
              <View style={styles.cardBody}>
                <Text style={styles.expTitle}>{exp.title}</Text>
                <Text style={styles.expDescription} numberOfLines={2}>
                  {exp.description}
                </Text>

                {/* Highlight Pills */}
                <View style={styles.highlightsRow}>
                  {exp.highlights.slice(0, 3).map((h, i) => (
                    <View key={i} style={styles.highlightPill}>
                      <Feather name="check" size={11} color={colors.gold} />
                      <Text style={styles.highlightText}>{h}</Text>
                    </View>
                  ))}
                </View>

                {/* Action Row */}
                <View style={styles.cardActions}>
                  <Pressable
                    style={styles.detailLinkBtn}
                    onPress={() => handleOpenDetail(exp)}
                  >
                    <Text style={styles.detailLinkText}>Detayları İncele</Text>
                    <Feather name="arrow-right" size={14} color={colors.gold} />
                  </Pressable>

                  <Button
                    variant="gold"
                    size="sm"
                    onPress={() => handleOpenBooking(exp)}
                    icon={<Feather name="plus" size={14} color={colors.textInverse} />}
                  >
                    Seyahatime Ekle
                  </Button>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. FULL EXPERIENCE DETAIL MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      <Modal
        visible={!!detailExperience}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setDetailExperience(null)}
      >
        {detailExperience && (
          <View style={styles.detailModalContainer}>
            {/* Modal Header Bar with Close */}
            <View style={styles.detailModalHeader}>
              <View style={styles.detailModalHeaderLeft}>
                <Text style={styles.modalTagText}>
                  {getCategoryLabel(detailExperience.category)}
                </Text>
                <Text style={styles.modalDurationText}>
                  · {detailExperience.duration}
                </Text>
              </View>
              <Pressable
                onPress={() => setDetailExperience(null)}
                style={styles.modalCloseCircle}
              >
                <Feather name="x" size={20} color={colors.textPrimary} />
              </Pressable>
            </View>

            <ScrollView
              contentContainerStyle={styles.detailScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Main Photo Display */}
              <View style={styles.detailHeroImageWrap}>
                <Image
                  source={
                    (experienceGalleries[detailExperience.id] &&
                      experienceGalleries[detailExperience.id][activeGalleryIndex]) ||
                    experienceImages[detailExperience.id] ||
                    { uri: detailExperience.cover_image_url }
                  }
                  style={styles.detailHeroImage}
                  resizeMode="cover"
                />
                <View style={styles.heroOverlay} />
                {detailExperience.price_label && (
                  <View style={styles.heroPriceBadge}>
                    <Text style={styles.heroPriceBadgeText}>
                      {detailExperience.price_label}
                    </Text>
                  </View>
                )}
              </View>

              {/* Gallery Thumbnails */}
              {experienceGalleries[detailExperience.id] && (
                <View style={styles.galleryRow}>
                  {experienceGalleries[detailExperience.id].map((gImg, idx) => (
                    <Pressable
                      key={idx}
                      onPress={() => setActiveGalleryIndex(idx)}
                      style={[
                        styles.thumbWrap,
                        activeGalleryIndex === idx && styles.thumbActive,
                      ]}
                    >
                      <Image source={gImg} style={styles.thumbImage} resizeMode="cover" />
                    </Pressable>
                  ))}
                </View>
              )}

              {/* Title & Description */}
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>{detailExperience.title}</Text>
                <Text style={styles.detailDescText}>
                  {detailExperience.description}
                </Text>
              </View>

              {/* Inclusions (Dahil Olanlar) */}
              {detailExperience.inclusions && (
                <View style={styles.detailSection}>
                  <View style={styles.sectionHeaderRow}>
                    <Feather name="check-circle" size={16} color={colors.gold} />
                    <Text style={styles.sectionTitle}>VIP Dahil Olan Hizmetler</Text>
                  </View>
                  <View style={styles.inclusionsCard}>
                    {detailExperience.inclusions.map((inc, i) => (
                      <View key={i} style={styles.inclusionItem}>
                        <View style={styles.incCheckDot}>
                          <Feather name="check" size={12} color={colors.gold} />
                        </View>
                        <Text style={styles.inclusionText}>{inc}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* VIP Perks */}
              {detailExperience.vip_perks && (
                <View style={styles.detailSection}>
                  <View style={styles.sectionHeaderRow}>
                    <Feather name="star" size={16} color={colors.gold} />
                    <Text style={styles.sectionTitle}>Özel Ayrıcalıklar</Text>
                  </View>
                  <View style={styles.perksCard}>
                    {detailExperience.vip_perks.map((perk, i) => (
                      <View key={i} style={styles.perkItem}>
                        <Text style={styles.perkBullet}>✦</Text>
                        <Text style={styles.perkText}>{perk}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Operational Meta: Dress code & Meeting point */}
              <View style={styles.detailSection}>
                <View style={styles.metaRow}>
                  {detailExperience.dress_code && (
                    <View style={styles.metaBox}>
                      <Feather name="info" size={16} color={colors.gold} />
                      <Text style={styles.metaLabel}>Kıyafet Kodu</Text>
                      <Text style={styles.metaValue}>{detailExperience.dress_code}</Text>
                    </View>
                  )}
                  {detailExperience.meeting_point && (
                    <View style={styles.metaBox}>
                      <Feather name="map-pin" size={16} color={colors.gold} />
                      <Text style={styles.metaLabel}>Buluşma Noktası</Text>
                      <Text style={styles.metaValue}>{detailExperience.meeting_point}</Text>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>

            {/* Sticky Bottom Action Bar */}
            <View style={styles.stickyActionBar}>
              <Button
                variant="outline"
                size="md"
                onPress={() => {
                  setDetailExperience(null);
                  router.push('/(customer)/concierge');
                }}
                icon={<Feather name="message-circle" size={16} color={colors.gold} />}
                style={{ flex: 1, marginRight: 8 }}
              >
                Danış
              </Button>

              <Button
                variant="gold"
                size="md"
                onPress={() => handleOpenBooking(detailExperience)}
                icon={<Feather name="plus" size={16} color={colors.textInverse} />}
                style={{ flex: 2 }}
              >
                Seyahatime Ekle
              </Button>
            </View>
          </View>
        )}
      </Modal>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. UPSELL REQUEST / DATE SELECTION MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      <Modal
        visible={isBookingModalOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setIsBookingModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {bookingTargetExperience && (
              <>
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalBadge}>PROGRAMA EKLE</Text>
                    <Text style={styles.modalTitle}>{bookingTargetExperience.title}</Text>
                    <Text style={styles.modalPriceSub}>{bookingTargetExperience.price_label}</Text>
                  </View>
                  <Pressable
                    onPress={() => setIsBookingModalOpen(false)}
                    style={styles.closeBtn}
                  >
                    <Feather name="x" size={20} color={colors.textSecondary} />
                  </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Input
                    label="Tercih Edilen Tarih"
                    placeholder="YYYY-MM-DD"
                    value={requestDate}
                    onChangeText={setRequestDate}
                  />

                  <Input
                    label="Misafir Sayısı"
                    placeholder="2"
                    value={requestPax}
                    onChangeText={setRequestPax}
                    keyboardType="numeric"
                  />

                  <Input
                    label="Özel Notlar & Talepler"
                    placeholder="Özel şampanya tercihi, transfer saati veya rehber isteği..."
                    value={requestNotes}
                    onChangeText={setRequestNotes}
                    multiline
                  />

                  <Button
                    variant="gold"
                    size="lg"
                    onPress={handleSendUpsell}
                    style={{ marginTop: spacing.md, marginBottom: spacing.xl }}
                  >
                    Talebi Onayla & Concierge'e İlet
                  </Button>
                </ScrollView>
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
    lineHeight: 20,
  },
  cardsContainer: {
    gap: 20,
  },
  experienceCard: {
    backgroundColor: '#0C111E',
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.3)',
    overflow: 'hidden',
    ...shadows.cardElevated,
  },
  cardImageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  cardCoverImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill as object,
    backgroundColor: 'rgba(5, 7, 15, 0.35)',
  },
  imageTopBar: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryPill: {
    backgroundColor: 'rgba(5, 7, 15, 0.75)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.4)',
  },
  categoryPillText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 7, 15, 0.75)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.full,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  durationPillText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: 11,
    color: colors.textPrimary,
  },
  pricePill: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(5, 7, 15, 0.85)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderActive,
  },
  priceText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 11,
    color: colors.goldSoft,
  },
  cardBody: {
    padding: spacing.base,
  },
  expTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  expDescription: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  highlightsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.base,
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 166, 107, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(201, 166, 107, 0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
    gap: 4,
  },
  highlightText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 10,
    color: colors.textSecondary,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  detailLinkText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.xs,
    color: colors.gold,
  },

  // ─── Detail Modal Styles ──────────────────────────────────
  detailModalContainer: {
    flex: 1,
    backgroundColor: '#05070F',
  },
  detailModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: '#0B0F1A',
  },
  detailModalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalTagText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 11,
    color: colors.gold,
    letterSpacing: 1.5,
  },
  modalDurationText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  modalCloseCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailScrollContent: {
    paddingBottom: 100,
  },
  detailHeroImageWrap: {
    width: '100%',
    height: 240,
    position: 'relative',
  },
  detailHeroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill as object,
    backgroundColor: 'rgba(5, 7, 15, 0.25)',
  },
  heroPriceBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(5, 7, 15, 0.85)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderActive,
  },
  heroPriceBadgeText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: fontSize.sm,
    color: colors.gold,
  },
  galleryRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    gap: 8,
    backgroundColor: '#0B0F1A',
  },
  thumbWrap: {
    width: 60,
    height: 48,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumbActive: {
    borderColor: colors.gold,
    borderWidth: 2,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  detailSection: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  detailTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['2xl'],
    color: colors.textPrimary,
    marginBottom: 8,
  },
  detailDescText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  inclusionsCard: {
    backgroundColor: '#0C111E',
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  inclusionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  incCheckDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inclusionText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 18,
  },
  perksCard: {
    backgroundColor: '#0C111E',
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perkBullet: {
    color: colors.gold,
    fontSize: 12,
  },
  perkText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metaBox: {
    flex: 1,
    backgroundColor: '#0C111E',
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  metaLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 10,
    color: colors.gold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  metaValue: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  stickyActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#070A12',
    borderTopWidth: 1,
    borderTopColor: colors.borderActive,
    paddingHorizontal: spacing.base,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  // ─── Booking Modal Styles ─────────────────────────────────
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
  modalPriceSub: {
    fontFamily: fontFamily.sans.medium,
    fontSize: 12,
    color: colors.goldSoft,
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
});
