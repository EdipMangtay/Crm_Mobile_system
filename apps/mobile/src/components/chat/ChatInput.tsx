/**
 * TRAVIA DUBAI — ChatInput Component
 * Supports quick action button ("+"), text input, and send trigger
 */
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, spacing, radius } from '../../design/tokens';
import { fontFamily, fontSize } from '../../design/typography';

interface ChatInputProps {
  onSend: (text: string) => void;
  onPressQuickAction?: () => void;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  onPressQuickAction,
  placeholder = 'Mesajınızı yazın...',
}: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSend(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      {/* Quick Action Button ("+") */}
      {onPressQuickAction && (
        <Pressable
          onPress={onPressQuickAction}
          style={styles.actionBtn}
          hitSlop={8}
        >
          <Feather name="plus" size={20} color={colors.gold} />
        </Pressable>
      )}

      {/* Text Input */}
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        selectionColor={colors.goldSoft}
        multiline
        style={styles.input}
      />

      {/* Send Button */}
      <Pressable
        onPress={handleSend}
        disabled={!text.trim()}
        style={[styles.sendBtn, !text.trim() && styles.disabledSend]}
      >
        <Feather
          name="arrow-up"
          size={18}
          color={text.trim() ? colors.textInverse : colors.textTertiary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(11, 15, 26, 0.9)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.base,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    marginBottom: 2,
  },
  disabledSend: {
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
  },
});
