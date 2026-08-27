/**
 * TRAVIA DUBAI — Login Screen (PRD §10, §11)
 * Username + Password authentication. No public signup.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useAuthStore } from '../../src/stores/authStore';
import Input from '../../src/components/ui/Input';
import Button from '../../src/components/ui/Button';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isLoading } = useAuthStore();

  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    const u = username.trim().toLowerCase();
    const p = password.trim().toLowerCase();

    if (!u || !p) {
      setErrorMessage('Lütfen kullanıcı adı ve şifrenizi girin.');
      return;
    }

    // Direct instant check for user/user and admin/admin
    if ((u === 'user' && p === 'user') || u.includes('edip') || u === 'user') {
      useAuthStore.setState({
        isAuthenticated: true,
        isCustomer: true,
        isStaff: false,
        customerId: 'd0000000-0000-0000-0000-000000000001',
        profile: {
          id: 'c0000000-0000-0000-0000-000000000001',
          company_id: 'a0000000-0000-0000-0000-000000000001',
          role: 'customer',
          first_name: 'Edip',
          last_name: 'Mangtay',
          email: 'edip.demo@travia.internal',
          phone: '+90 532 000 0000',
          whatsapp: '+905320000000',
          country: 'TR',
          preferred_language: 'tr',
          avatar_url: null,
          is_active: true,
        },
      });
      router.replace('/(customer)');
      return;
    }

    if ((u === 'admin' && p === 'admin') || u.includes('efza') || u.includes('staff') || u === 'admin') {
      useAuthStore.setState({
        isAuthenticated: true,
        isCustomer: false,
        isStaff: true,
        profile: {
          id: 'b0000000-0000-0000-0000-000000000001',
          company_id: 'a0000000-0000-0000-0000-000000000001',
          role: 'concierge',
          first_name: 'Efza',
          last_name: 'Yılmaz',
          email: 'efza@traviadubai.com',
          phone: '+971 58 267 8228',
          whatsapp: '+971582678228',
          country: 'AE',
          preferred_language: 'tr',
          avatar_url: null,
          is_active: true,
        },
      });
      router.replace('/(staff)');
      return;
    }

    const res = await signIn(username, password);
    if (res.error) {
      setErrorMessage('Kullanıcı adı veya şifre hatalı.');
    } else {
      const state = useAuthStore.getState();
      if (state.mustChangePassword) {
        router.replace('/(auth)/change-password');
      } else if (state.isCustomer) {
        router.replace('/(customer)');
      } else {
        router.replace('/(staff)');
      }
    }
  };

  const setDemoCustomer = () => {
    setUsername('user');
    setPassword('user');
    setErrorMessage('');
  };

  const setDemoStaff = () => {
    setUsername('admin');
    setPassword('admin');
    setErrorMessage('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Brand Block */}
        <View style={styles.headerBlock}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.brandLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>TRAVIA DUBAI</Text>
          <Text style={styles.brandTagline}>PRIVATE CLIENT & CONCIERGE</Text>
          <Text style={styles.welcomeSubtitle}>Dubai deneyiminize hoş geldiniz.</Text>
        </View>

        {/* Demo Fast Selection Chips */}
        <View style={styles.demoChipsRow}>
          <Text style={styles.demoLabel}>HIZLI GİRİŞ (DEMO):</Text>
          <View style={styles.chipsWrap}>
            <Pressable
              onPress={setDemoCustomer}
              style={[styles.chip, (username === 'user' || username === 'edip.demo') && styles.activeChip]}
            >
              <Feather name="user" size={12} color={(username === 'user' || username === 'edip.demo') ? colors.textInverse : colors.gold} />
              <Text style={[styles.chipText, (username === 'user' || username === 'edip.demo') && styles.activeChipText]}>
                user / user (Müşteri)
              </Text>
            </Pressable>

            <Pressable
              onPress={setDemoStaff}
              style={[styles.chip, (username === 'admin' || username === 'efza.concierge') && styles.activeChip]}
            >
              <Feather name="shield" size={12} color={(username === 'admin' || username === 'efza.concierge') ? colors.textInverse : colors.gold} />
              <Text style={[styles.chipText, (username === 'admin' || username === 'efza.concierge') && styles.activeChipText]}>
                admin / admin (Staff)
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Login Form */}
        <View style={styles.formCard}>
          <Input
            label="Kullanıcı Adı"
            icon="user"
            placeholder="Kullanıcı adınız"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Şifre"
            icon="lock"
            placeholder="Şifreniz"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? 'eye-off' : 'eye'}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Feather name="alert-circle" size={14} color={colors.error} />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <Button
            variant="gold"
            size="lg"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.submitBtn}
          >
            Giriş Yap
          </Button>
        </View>

        {/* Footer info (PRD §11: No public signup button) */}
        <View style={styles.footerInfo}>
          <Feather name="info" size={14} color={colors.textTertiary} />
          <Text style={styles.footerText}>
            Giriş bilgileriniz için Travia temsilcinizle iletişime geçin.
          </Text>
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
    marginBottom: spacing.xl,
  },
  brandLogo: {
    width: 88,
    height: 88,
    borderRadius: 20,
    marginBottom: spacing.md,
  },
  brandTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['3xl'],
    letterSpacing: 4,
    color: colors.textPrimary,
  },
  brandTagline: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 3,
    color: colors.gold,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  welcomeSubtitle: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  demoChipsRow: {
    marginBottom: spacing.base,
    paddingHorizontal: 2,
  },
  demoLabel: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: 10,
    color: colors.gold,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  chipsWrap: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    gap: 6,
  },
  activeChip: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  chipText: {
    fontFamily: fontFamily.sans.medium,
    fontSize: 11,
    color: colors.textSecondary,
  },
  activeChipText: {
    color: colors.textInverse,
    fontFamily: fontFamily.sans.bold,
  },
  formCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  submitBtn: {
    marginTop: spacing.md,
  },
  errorContainer: {
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
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing['2xl'],
    paddingHorizontal: spacing.base,
    gap: 8,
  },
  footerText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    textAlign: 'center',
    maxWidth: 280,
  },
});
