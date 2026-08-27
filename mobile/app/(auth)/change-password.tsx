/**
 * TRAVIA DUBAI — Force Password Change Screen (PRD §12)
 * Mandatory step on initial login with temporary credentials
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useAuthStore } from '../../src/stores/authStore';
import Input from '../../src/components/ui/Input';
import Button from '../../src/components/ui/Button';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { profile, changePassword } = useAuthStore();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (password.length < 8) {
      setError('Şifre en az 8 karakter olmalıdır.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler birbiriyle eşleşmiyor.');
      return;
    }

    setLoading(true);
    const res = await changePassword(password);
    setLoading(false);

    if (res?.error) {
      setError('Şifre güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
      return;
    }

    useAuthStore.setState({ mustChangePassword: false });
    router.replace('/(customer)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Block */}
        <View style={styles.headerBlock}>
          <View style={styles.iconCircle}>
            <Feather name="shield" size={28} color={colors.gold} />
          </View>
          <Text style={styles.welcomeTitle}>
            Hoş Geldiniz, {profile?.first_name || 'Misafirimiz'}.
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Dubai deneyiminiz hazır. Güvenliğiniz için lütfen yeni bir şifre belirleyin.
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Input
            label="Yeni Şifre"
            icon="lock"
            placeholder="En az 8 karakter"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Input
            label="Yeni Şifre Tekrar"
            icon="lock"
            placeholder="Şifrenizi tekrar girin"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {error ? (
            <View style={styles.errorBox}>
              <Feather name="alert-triangle" size={14} color={colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Button
            variant="gold"
            size="lg"
            onPress={handleSubmit}
            loading={loading}
            style={{ marginTop: spacing.md }}
          >
            Şifreyi Kaydet ve Devam Et
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    borderWidth: 1,
    borderColor: colors.borderActive,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  welcomeTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['2xl'],
    color: colors.textPrimary,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    maxWidth: 300,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorBg,
    padding: spacing.sm,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    gap: 6,
  },
  errorText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.error,
  },
});
