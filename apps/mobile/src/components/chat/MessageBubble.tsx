/**
 * TRAVIA DUBAI — MessageBubble Component (PRD §24, §25)
 * Handles customer, concierge, and system message types with luxury design
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';
import { Message } from '../../types/models';
import { chatTimestamp } from '../../utils/date';

interface MessageBubbleProps {
  message: Message;
  onPressAction?: () => void;
}

export default function MessageBubble({ message, onPressAction }: MessageBubbleProps) {
  // System Message (PRD §25)
  if (message.type === 'system') {
    return (
      <View style={styles.systemContainer}>
        <View style={styles.systemBox}>
          <View style={styles.systemHeader}>
            <Feather name="bell" size={14} color={colors.gold} />
            <Text style={styles.systemBadge}>BİLDİRİM</Text>
          </View>
          <Text style={styles.systemContent}>{message.content}</Text>
          {onPressAction && (
            <Pressable onPress={onPressAction} style={styles.systemAction}>
              <Text style={styles.systemActionText}>Detayı Gör</Text>
              <Feather name="arrow-right" size={12} color={colors.gold} />
            </Pressable>
          )}
        </View>
        <Text style={styles.systemTime}>{chatTimestamp(message.created_at)}</Text>
      </View>
    );
  }

  const isCustomer = message.sender_role === 'customer';

  return (
    <View style={[styles.bubbleWrapper, isCustomer ? styles.customerWrapper : styles.staffWrapper]}>
      {/* Sender Header for Staff */}
      {!isCustomer && (
        <View style={styles.staffHeader}>
          <View style={styles.conciergeDot} />
          <Text style={styles.staffLabel}>TRAVIA CONCIERGE</Text>
        </View>
      )}

      {/* Bubble Box */}
      <View style={[styles.bubble, isCustomer ? styles.customerBubble : styles.staffBubble]}>
        <Text style={[styles.messageText, isCustomer ? styles.customerText : styles.staffText]}>
          {message.content}
        </Text>

        {/* Footer with time & read status */}
        <View style={styles.footerRow}>
          <Text style={styles.timestamp}>{chatTimestamp(message.created_at)}</Text>
          {isCustomer && (
            <Feather
              name={message.status === 'read' ? 'check' : 'check'}
              size={12}
              color={message.status === 'read' ? colors.gold : colors.textTertiary}
              style={{ marginLeft: 4 }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleWrapper: {
    marginVertical: spacing.xs,
    maxWidth: '82%',
  },
  customerWrapper: {
    alignSelf: 'flex-end',
  },
  staffWrapper: {
    alignSelf: 'flex-start',
  },
  staffHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginLeft: 4,
  },
  conciergeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gold,
    marginRight: 6,
  },
  staffLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
  },
  bubble: {
    borderRadius: radius['2xl'],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
  },
  customerBubble: {
    backgroundColor: 'rgba(201, 166, 107, 0.22)',
    borderWidth: 1,
    borderColor: colors.borderActive,
    borderBottomRightRadius: 4,
  },
  staffBubble: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.base,
    lineHeight: 22,
  },
  customerText: {
    color: colors.textPrimary,
  },
  staffText: {
    color: colors.textPrimary,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  timestamp: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 10,
    color: colors.textTertiary,
  },
  // System Message Styles
  systemContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
    width: '100%',
  },
  systemBox: {
    backgroundColor: 'rgba(201, 166, 107, 0.08)',
    borderWidth: 1,
    borderColor: colors.borderActive,
    borderRadius: radius.xl,
    padding: spacing.md,
    width: '90%',
  },
  systemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  systemBadge: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
    marginLeft: 6,
  },
  systemContent: {
    fontFamily: fontFamily.serif.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  systemAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  systemActionText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.xs,
    color: colors.gold,
    marginRight: 4,
  },
  systemTime: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 10,
    color: colors.textTertiary,
    marginTop: 4,
  },
});
