/**
 * TRAVIA DUBAI — Staff Chat Screen with Customer Context (PRD §41)
 * Real-time synchronized chat with customer.
 */
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useTraviaStore } from '../../src/stores/traviaStore';
import SafeScreen from '../../src/components/layout/SafeScreen';
import MessageBubble from '../../src/components/chat/MessageBubble';
import ChatInput from '../../src/components/chat/ChatInput';

export default function StaffMessagesScreen() {
  const { messages, sendStaffMessage, markStaffMessagesAsRead, customer, trip } = useTraviaStore();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    markStaffMessagesAsRead();
  }, [messages.length]);

  const handleStaffSend = (text: string) => {
    if (!text.trim()) return;
    sendStaffMessage(text);
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Customer Context Top Card (PRD §41) */}
        <View style={styles.contextHeader}>
          <View style={styles.contextTopRow}>
            <View>
              <Text style={styles.customerName}>{customer.first_name} {customer.last_name}</Text>
              <Text style={styles.tripMeta}>Trip: {trip.nights} Gece · {trip.hotel_name || 'Dubai'}</Text>
            </View>
            <View style={styles.locationBadge}>
              <Text style={styles.locationText}>{customer.country === 'TR' ? "Dubai'de" : customer.country}</Text>
            </View>
          </View>

          <View style={styles.contextBottomRow}>
            <View style={styles.contextInfoItem}>
              <Feather name="clock" size={12} color={colors.gold} />
              <Text style={styles.contextInfoText}>Sıradaki: Yat Turu (14:00)</Text>
            </View>
            <View style={styles.contextInfoItem}>
              <Feather name="credit-card" size={12} color={colors.gold} />
              <Text style={styles.contextInfoText}>Kalan: 13.500 AED</Text>
            </View>
          </View>
        </View>

        {/* Message Feed */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Staff Chat Input */}
        <ChatInput
          onSend={handleStaffSend}
          placeholder="Müşteriye yanıt yazın..."
        />
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  contextHeader: {
    backgroundColor: '#0B0F1A',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderActive,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  contextTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  customerName: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  tripMeta: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  locationBadge: {
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
  locationText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: 10,
    color: colors.success,
  },
  contextBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  contextInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contextInfoText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: 11,
    color: colors.goldSoft,
  },
  messageList: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
});
