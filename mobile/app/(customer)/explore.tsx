/**
 * TRAVIA DUBAI — Keşfet (Explore & Curated Upsells) (PRD §29, §30, §31)
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
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useTraviaStore } from '../../src/stores/traviaStore';
import { mockExperiences } from '../../src/lib/mockData';
import { ExperienceItem, RequestCategory } from '../../src/types/models';
import SafeScreen from '../../src/components/layout/SafeScreen';
import Button from '../../src/components/ui/Button';
import Input from '../../src/components/ui/Input';

export default function ExploreScreen() {
  const { createCustomerRequest } = useTraviaStore();
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [requestDate, setRequestDate] = useState('2026-09-15');
  const [requestPax, setRequestPax] = useState('2');
  const [requestNotes, setRequestNotes] = useState('');

  const handleSendUpsell = () => {
    if (!selectedExperience) return;

    let cat: RequestCategory = 'activity';
    if (selectedExperience.category === 'yacht') cat = 'yacht';
    if (selectedExperience.category === 'transfer') cat = 'transfer';
    if (selectedExperience.category === 'restaurant') cat = 'restaurant';

    createCustomerRequest({
      category: cat,
      title: `${selectedExperience.title} Talebi`,
      date: requestDate,
      time: '14:00',
      pax_count: parseInt(requestPax, 10) || 2,
      notes: requestNotes || `${selectedExperience.duration} süreli seçkin Dubai deneyimi talebi.`,
    });

    Alert.alert(
      'Talebiniz Alındı',
      `${selectedExperience.title} için talebiniz concierge ekibimize iletildi ve seyahat taleplerinize eklendi.`,
      [{ text: 'Tamam', onPress: () => setSelectedExperience(null) }]
    );
  };

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Block */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerBadge}>SEÇKİN DENEYİMLER</Text>
          <Text style={styles.headerTitle}>Dubai'yi Keşfedin</Text>
          <Text style={styles.headerSubtitle}>
            Seyahatinize ekleyebileceğiniz özel şoförlü turlar, yatlar ve aktiviteler.
          </Text>
        </View>

        {/* Experiences List */}
        <View style={styles.cardsContainer}>
          {mockExperiences.map((exp) => (
            <View key={exp.id} style={styles.experienceCard}>
              {/* Top Tag & Duration */}
              <View style={styles.cardHeaderRow}>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{exp.category.toUpperCase()}</Text>
                </View>
                <View style={styles.durationWrap}>
                  <Feather name="clock" size={12} color={colors.gold} />
                  <Text style={styles.durationText}>{exp.duration}</Text>
                </View>
              </View>

              {/* Title & Description */}
              <Text style={styles.expTitle}>{exp.title}</Text>
              <Text style={styles.expDescription}>{exp.description}</Text>

              {/* Highlights */}
              <View style={styles.highlightsRow}>
                {exp.highlights.map((h, i) => (
                  <View key={i} style={styles.highlightPill}>
                    <Feather name="check" size={10} color={colors.gold} />
                    <Text style={styles.highlightText}>{h}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsRow}>
                <Button
                  variant="gold"
                  size="sm"
                  onPress={() => setSelectedExperience(exp)}
                  icon={<Feather name="plus" size={14} color={colors.textInverse} />}
                  style={{ flex: 1, marginRight: spacing.xs }}
                >
                  Seyahatime Ekle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => setSelectedExperience(exp)}
                  style={{ flex: 1, marginLeft: spacing.xs }}
                >
                  Bilgi İste
                </Button>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Upsell Request Modal (PRD §31) */}
      <Modal
        visible={!!selectedExperience}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedExperience(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {selectedExperience && (
              <>
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalBadge}>YENİ DENEYİM TALEBİ</Text>
                    <Text style={styles.modalTitle}>{selectedExperience.title}</Text>
                  </View>
                  <Pressable
                    onPress={() => setSelectedExperience(null)}
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
                    label="Kişi Sayısı"
                    placeholder="2"
                    value={requestPax}
                    onChangeText={setRequestPax}
                    keyboardType="numeric"
                  />

                  <Input
                    label="Özel Notlar"
                    placeholder="Özel istekler, transfer ihtiyacı vb."
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
                    Talebi Concierge'e İlet
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
  },
  cardsContainer: {
    gap: 16,
  },
  experienceCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    ...shadows.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  tagBadge: {
    backgroundColor: 'rgba(201, 166, 107, 0.12)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.md,
  },
  tagText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
  },
  durationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.goldSoft,
  },
  expTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginTop: spacing.xs,
    marginBottom: 4,
  },
  expDescription: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
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
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
    gap: 4,
  },
  highlightText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 10,
    color: colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
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
});
