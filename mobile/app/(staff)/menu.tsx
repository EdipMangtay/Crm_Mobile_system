/**
 * TRAVIA DUBAI — Staff Menu & Settings Screen
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useAuthStore } from '../../src/stores/authStore';
import SafeScreen from '../../src/components/layout/SafeScreen';
import Avatar from '../../src/components/ui/Avatar';

export default function StaffMenuScreen() {
  const router = useRouter();
  const { profile, signOut } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Staff oturumunuzu sonlandırmak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Çıkış Yap',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const handleSwitchToCustomer = () => {
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
  };

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Staff Profile Box */}
        <View style={styles.profileBox}>
          <Avatar name={profile?.first_name || 'Efza Yılmaz'} size={60} />
          <View style={styles.profileInfo}>
            <Text style={styles.staffName}>
              {profile?.first_name || 'Efza'} {profile?.last_name || 'Yılmaz'}
            </Text>
            <Text style={styles.roleTag}>TRAVIA CONCIERGE OPERATÖRÜ</Text>
            <Text style={styles.emailText}>efza@traviadubai.com</Text>
          </View>
        </View>

        {/* Demo Fast Switch */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DEMO HIZLI GEÇİŞ</Text>

          <Pressable onPress={handleSwitchToCustomer} style={styles.menuItem}>
            <View style={styles.iconWrap}>
              <Feather name="refresh-cw" size={18} color={colors.gold} />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.menuTitle}>Müşteri Moduna Geç</Text>
              <Text style={styles.menuSubtitle}>Edip Mangtay (Müşteri) ekranına geçiş yap</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textTertiary} />
          </Pressable>
        </View>

        {/* Settings & Info */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AYARLAR & GÜVENLİK</Text>

          <Pressable onPress={handleLogout} style={styles.menuItem}>
            <View style={[styles.iconWrap, { backgroundColor: 'rgba(239, 68, 68, 0.12)' }]}>
              <Feather name="log-out" size={18} color={colors.error} />
            </View>
            <View style={styles.textWrap}>
              <Text style={[styles.menuTitle, { color: colors.error }]}>Çıkış Yap</Text>
              <Text style={styles.menuSubtitle}>Staff oturumunu kapat</Text>
            </View>
          </Pressable>
        </View>

        {/* App Version */}
        <View style={styles.versionWrap}>
          <Text style={styles.versionText}>TRAVIA DUBAI MOBILE v1.0.0 (MVP)</Text>
          <Text style={styles.versionSubText}>ONE CUSTOMER · ONE DATABASE</Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    paddingBottom: spacing['4xl'],
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.base,
  },
  staffName: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  roleTag: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
    marginTop: 2,
  },
  emailText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
    marginBottom: spacing.sm,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    marginBottom: spacing.xs,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuTitle: {
    fontFamily: fontFamily.serif.medium,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  menuSubtitle: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  versionWrap: {
    alignItems: 'center',
    marginTop: spacing['2xl'],
  },
  versionText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.goldSoft,
  },
  versionSubText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.textTertiary,
    marginTop: 2,
  },
});
