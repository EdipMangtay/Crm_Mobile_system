/**
 * TRAVIA DUBAI — Concierge Chat & Request Screen (PRD §23, §24, §25, §26, §27, §28)
 * Real-time synchronized messaging + structured VIP requests
 */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useTraviaStore } from '../../src/stores/traviaStore';
import { RequestCategory } from '../../src/types/models';
import SafeScreen from '../../src/components/layout/SafeScreen';
import MessageBubble from '../../src/components/chat/MessageBubble';
import ChatInput from '../../src/components/chat/ChatInput';
import Input from '../../src/components/ui/Input';
import Button from '../../src/components/ui/Button';

const requestCategories: { key: RequestCategory; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { key: 'restaurant', label: 'Restoran', icon: 'coffee' },
  { key: 'transfer', label: 'Özel Transfer', icon: 'truck' },
  { key: 'yacht', label: 'Yat Kiralama', icon: 'navigation' },
  { key: 'beach_club', label: 'Beach Club', icon: 'umbrella' },
  { key: 'activity', label: 'Aktivite', icon: 'compass' },
  { key: 'private_driver', label: 'Özel Şoför', icon: 'user' },
  { key: 'booking_change', label: 'Plan Değişikliği', icon: 'edit-2' },
  { key: 'other', label: 'Diğer İstek', icon: 'more-horizontal' },
];

export default function ConciergeScreen() {
  const router = useRouter();
  const {
    messages,
    sendCustomerMessage,
    createCustomerRequest,
    markCustomerMessagesAsRead,
  } = useTraviaStore();

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Structured request form state
  const [selectedCategory, setSelectedCategory] = useState<RequestCategory>('restaurant');
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDate, setRequestDate] = useState('2026-09-14');
  const [requestTime, setRequestTime] = useState('20:30');
  const [requestPax, setRequestPax] = useState('2');
  const [requestNotes, setRequestNotes] = useState('');

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    markCustomerMessagesAsRead();
  }, [messages.length]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    sendCustomerMessage(text);
  };

  const handleCreateRequest = () => {
    const categoryObj = requestCategories.find((c) => c.key === selectedCategory);
    const title = requestTitle.trim() || `${categoryObj?.label} Talebi`;

    createCustomerRequest({
      category: selectedCategory,
      title,
      date: requestDate,
      time: requestTime,
      pax_count: parseInt(requestPax, 10) || 2,
      notes: requestNotes,
    });

    setIsRequestModalOpen(false);
    setRequestTitle('');
    setRequestNotes('');
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Chat Header (PRD §24) */}
        <View style={styles.chatHeader}>
          <View>
            <View style={styles.headerTitleRow}>
              <View style={styles.activeDot} />
              <Text style={styles.headerTitle}>Travia Concierge</Text>
            </View>
            <Text style={styles.headerSubtitle}>Size özel seyahat asistanınız</Text>
          </View>

          {/* New Request Button */}
          <Button
            variant="gold"
            size="sm"
            onPress={() => setIsRequestModalOpen(true)}
            icon={<Feather name="plus" size={14} color={colors.textInverse} />}
          >
            Yeni Talep
          </Button>
        </View>

        {/* Message Feed */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              onPressAction={
                item.type === 'system'
                  ? () => router.push('/(customer)/trip')
                  : undefined
              }
            />
          )}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Chat Input */}
        <ChatInput onSend={handleSendMessage} placeholder="Concierge ekibine yazın..." />
      </KeyboardAvoidingView>

      {/* ─── MODAL: YENİ TALEP OLUŞTUR (PRD §26, §27) ───────────────── */}
      <Modal
        visible={isRequestModalOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsRequestModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalBadge}>ÖZEL VIP TALEP</Text>
                <Text style={styles.modalTitle}>Yeni Hizmet Talebi</Text>
              </View>
              <Pressable onPress={() => setIsRequestModalOpen(false)} style={styles.closeBtn}>
                <Feather name="x" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
              {/* Category Picker (PRD §26) */}
              <Text style={styles.inputLabel}>KATEGORİ SEÇİN</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryPickerRow}
              >
                {requestCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.key;
                  return (
                    <Pressable
                      key={cat.key}
                      onPress={() => setSelectedCategory(cat.key)}
                      style={[styles.catChip, isSelected && styles.catChipActive]}
                    >
                      <Feather
                        name={cat.icon}
                        size={14}
                        color={isSelected ? colors.textInverse : colors.gold}
                      />
                      <Text style={[styles.catChipText, isSelected && styles.catChipTextActive]}>
                        {cat.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              {/* Title / Venue Input */}
              <Input
                label="HİZMET / MEKAN ADI"
                value={requestTitle}
                onChangeText={setRequestTitle}
                placeholder="Örn: Zuma Dubai veya 4 Saatlik Yat"
              />

              {/* Date & Time Row */}
              <View style={styles.formRow}>
                <View style={{ flex: 1, marginRight: spacing.sm }}>
                  <Input
                    label="TARİH"
                    value={requestDate}
                    onChangeText={setRequestDate}
                    placeholder="2026-09-14"
                  />
                </View>
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                  <Input
                    label="SAAT"
                    value={requestTime}
                    onChangeText={setRequestTime}
                    placeholder="20:30"
                  />
                </View>
              </View>

              {/* Pax Count */}
              <Input
                label="KİŞİ SAYISI"
                value={requestPax}
                onChangeText={setRequestPax}
                keyboardType="numeric"
                placeholder="2"
              />

              {/* Special Notes */}
              <Input
                label="ÖZEL TERCİH VEYA NOTLARINIZ"
                value={requestNotes}
                onChangeText={setRequestNotes}
                placeholder="Örn: Deniz manzaralı masa, yıldönümü kutlaması..."
                multiline
                numberOfLines={3}
              />
            </ScrollView>

            <Button
              variant="gold"
              size="lg"
              onPress={handleCreateRequest}
              icon={<Feather name="send" size={16} color={colors.textInverse} />}
              style={{ marginTop: spacing.base }}
            >
              Concierge'e Gönder
            </Button>
          </View>
        </View>
      </Modal>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: '#0B0F1A',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
    marginTop: 2,
  },
  messageList: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    flexGrow: 1,
  },
  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#0B0F1A',
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
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
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  inputLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
    marginBottom: spacing.xs,
  },
  categoryPickerRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: spacing.md,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  catChipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.goldSoft,
  },
  catChipText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
  },
  catChipTextActive: {
    color: colors.textInverse,
  },
  formRow: {
    flexDirection: 'row',
  },
});
