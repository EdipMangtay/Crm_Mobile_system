/**
 * TRAVIA DUBAI — Customer Profile, Documents, Payments & Notifications Screen
 * (PRD §32, §33, §34, §35, §36, §37)
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
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useAuthStore } from '../../src/stores/authStore';
import { useTraviaStore } from '../../src/stores/traviaStore';
import SafeScreen from '../../src/components/layout/SafeScreen';
import Avatar from '../../src/components/ui/Avatar';
import StatusBadge from '../../src/components/ui/StatusBadge';
import Button from '../../src/components/ui/Button';

type ActiveSection = 'none' | 'documents' | 'payments' | 'requests' | 'notifications' | 'trips';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, signOut } = useAuthStore();
  const {
    customer,
    activeCustomerId,
    setActiveCustomer,
    trip,
    documents,
    payments,
    requests,
    notifications,
    markNotificationsAsRead,
  } = useTraviaStore();

  const [activeModal, setActiveModal] = useState<ActiveSection>('none');

  const fullName = `${customer.first_name} ${customer.last_name}`;
  const unreadNotifs = notifications.filter((n) => !n.is_read).length;

  const totalAmount = trip.total_amount || 18500;
  const paidAmount = payments
    .filter((p) => p.status === 'received')
    .reduce((sum, p) => sum + p.amount, 0);
  const remainingAmount = totalAmount - paidAmount;

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkmak istediğinize emin misiniz?', [
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

  const handleOpenNotifications = () => {
    setActiveModal('notifications');
    markNotificationsAsRead();
  };

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <Avatar name={fullName} size={64} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.userHandle}>@{profile?.email?.split('@')[0] || 'edip.demo'}</Text>
            <View style={styles.userTagRow}>
              <View style={styles.userTag}>
                <Feather name="star" size={10} color={colors.gold} />
                <Text style={styles.userTagText}>VIP MİSAFİR</Text>
              </View>
              <Text style={styles.userPhone}>{customer.phone || '+90 532 000 0000'}</Text>
            </View>
          </View>
        </View>

        {/* Multi-Customer Demo Switcher */}
        <View style={{ marginBottom: spacing.lg }}>
          <Text style={{ fontFamily: fontFamily.sans.bold, fontSize: 9, letterSpacing: 1.5, color: colors.gold, marginBottom: spacing.xs }}>
            DEMO MİSAFİR PROFİLİ SEÇİMİ
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[
              { id: 'd0000000-0000-0000-0000-000000000001', label: 'Edip M. (VIP)' },
              { id: 'd0000000-0000-0000-0000-000000000002', label: 'Ahmet Y. (Aile)' },
              { id: 'd0000000-0000-0000-0000-000000000003', label: 'Canan Ö. (Solo)' },
            ].map((c) => (
              <Pressable
                key={c.id}
                onPress={() => setActiveCustomer(c.id)}
                style={{
                  paddingVertical: 7,
                  paddingHorizontal: 12,
                  borderRadius: radius.md,
                  borderWidth: 1,
                  backgroundColor: activeCustomerId === c.id ? 'rgba(201, 166, 107, 0.2)' : colors.surfaceElevated,
                  borderColor: activeCustomerId === c.id ? colors.gold : colors.borderActive,
                }}
              >
                <Text style={{
                  fontFamily: fontFamily.sans.semiBold,
                  fontSize: 11,
                  color: activeCustomerId === c.id ? colors.gold : colors.textSecondary,
                }}>
                  {c.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Quick Hub Options */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionHeaderLabel}>SEYAHAT YÖNETİMİ</Text>

          {/* Trips Option (PRD §36, §37) */}
          <Pressable
            onPress={() => setActiveModal('trips')}
            style={styles.menuItem}
          >
            <View style={styles.menuIconWrap}>
              <Feather name="map" size={18} color={colors.gold} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>Seyahatlerim</Text>
              <Text style={styles.menuDesc}>Aktif ve geçmiş Dubai tatil paketleriniz</Text>
            </View>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>2</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textTertiary} />
          </Pressable>

          {/* Documents Option (PRD §32) */}
          <Pressable
            onPress={() => setActiveModal('documents')}
            style={styles.menuItem}
          >
            <View style={styles.menuIconWrap}>
              <Feather name="file-text" size={18} color={colors.gold} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>Belgelerim</Text>
              <Text style={styles.menuDesc}>Otel voucher, vize ve yat onay belgeleri</Text>
            </View>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>{documents.length}</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textTertiary} />
          </Pressable>

          {/* Payments Option (PRD §33, §34) */}
          <Pressable
            onPress={() => setActiveModal('payments')}
            style={styles.menuItem}
          >
            <View style={styles.menuIconWrap}>
              <Feather name="credit-card" size={18} color={colors.gold} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>Ödeme Özeti</Text>
              <Text style={styles.menuDesc}>Paket toplamı, kapora ve kalan bakiye</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textTertiary} />
          </Pressable>

          {/* Requests Option (PRD §28) */}
          <Pressable
            onPress={() => setActiveModal('requests')}
            style={styles.menuItem}
          >
            <View style={styles.menuIconWrap}>
              <Feather name="inbox" size={18} color={colors.gold} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>Taleplerim</Text>
              <Text style={styles.menuDesc}>Concierge'e iletilen özel isteklerinizin durumu</Text>
            </View>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>{requests.length}</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textTertiary} />
          </Pressable>

          {/* Notifications Option (PRD §35) */}
          <Pressable
            onPress={handleOpenNotifications}
            style={styles.menuItem}
          >
            <View style={styles.menuIconWrap}>
              <Feather name="bell" size={18} color={colors.gold} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>Bildirimler</Text>
              <Text style={styles.menuDesc}>Şoför, rezervasyon ve seyahat güncellemeleri</Text>
            </View>
            {unreadNotifs > 0 && (
              <View style={[styles.badgeCount, { backgroundColor: colors.gold }]}>
                <Text style={[styles.badgeCountText, { color: colors.textInverse }]}>
                  {unreadNotifs}
                </Text>
              </View>
            )}
            <Feather name="chevron-right" size={18} color={colors.textTertiary} />
          </Pressable>
        </View>

        {/* Support & Security */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionHeaderLabel}>DESTEK & GÜVENLİK</Text>

          <Pressable
            onPress={() => Linking.openURL('https://wa.me/971582678228')}
            style={styles.menuItem}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: 'rgba(37, 211, 102, 0.12)' }]}>
              <Feather name="message-circle" size={18} color={colors.whatsapp} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>Travia VIP Destek Hattı</Text>
              <Text style={styles.menuDesc}>+971 58 267 8228 (7/24 WhatsApp)</Text>
            </View>
            <Feather name="external-link" size={16} color={colors.textTertiary} />
          </Pressable>

          <Pressable
            onPress={() => router.push('/(auth)/change-password')}
            style={styles.menuItem}
          >
            <View style={styles.menuIconWrap}>
              <Feather name="lock" size={18} color={colors.gold} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>Şifre Değiştir</Text>
              <Text style={styles.menuDesc}>Giriş şifrenizi güncelleyin</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textTertiary} />
          </Pressable>

          <Pressable onPress={handleLogout} style={styles.menuItem}>
            <View style={[styles.menuIconWrap, { backgroundColor: 'rgba(239, 68, 68, 0.12)' }]}>
              <Feather name="log-out" size={18} color={colors.error} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={[styles.menuTitle, { color: colors.error }]}>Çıkış Yap</Text>
              <Text style={styles.menuDesc}>Oturumunuzu sonlandırın</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>

      {/* ─── MODAL: SEYAHATLERİM (PRD §37) ─────────────────────── */}
      <Modal
        visible={activeModal === 'trips'}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal('none')}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seyahatlerim</Text>
              <Pressable onPress={() => setActiveModal('none')} style={styles.closeBtn}>
                <Feather name="x" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.subHeading}>AKTİF SEYAHAT</Text>
              <View style={styles.tripCardItem}>
                <View style={styles.tripHeaderRow}>
                  <Text style={styles.tripCardTitle}>{trip.title}</Text>
                  <View style={styles.activePill}>
                    <Text style={styles.activePillText}>AKTİF</Text>
                  </View>
                </View>
                <Text style={styles.tripCardSub}>
                  {trip.start_date} – {trip.end_date} · {trip.nights} Gece · {trip.hotel_name}
                </Text>
                <Text style={styles.tripCardPax}>
                  {trip.pax_count} Kişi ({trip.pax_label}) · 18.500 AED
                </Text>
              </View>

              <Text style={[styles.subHeading, { marginTop: spacing.md }]}>GEÇMİŞ SEYAHATLER</Text>
              <View style={styles.pastTripCardItem}>
                <View style={styles.tripHeaderRow}>
                  <Text style={styles.pastTripTitle}>Dubai Kış Kaçamağı</Text>
                  <Text style={styles.pastTripDate}>5 – 10 Ocak 2026</Text>
                </View>
                <Text style={styles.pastTripSub}>Armani Hotel Dubai · 5 Gece · Tamamlandı</Text>
              </View>
            </ScrollView>

            <Button variant="gold" size="md" onPress={() => setActiveModal('none')} style={{ marginTop: spacing.md }}>
              Kapat
            </Button>
          </View>
        </View>
      </Modal>

      {/* ─── MODAL: BELGELERİM (PRD §32) ───────────────────────── */}
      <Modal
        visible={activeModal === 'documents'}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal('none')}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Belgelerim</Text>
              <Pressable onPress={() => setActiveModal('none')} style={styles.closeBtn}>
                <Feather name="x" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {documents.map((doc) => (
                <View key={doc.id} style={styles.docItem}>
                  <View style={styles.docIconWrap}>
                    <Feather name="file-text" size={20} color={colors.gold} />
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.docTitle}>{doc.title}</Text>
                    <Text style={styles.docMeta}>
                      {doc.file_name} · {(doc.file_size! / 1024 / 1024).toFixed(1)} MB
                    </Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      Alert.alert('Belge Açılıyor', `${doc.title} güvenli sunucudan indiriliyor.`)
                    }
                    style={styles.docDownloadBtn}
                  >
                    <Feather name="download" size={16} color={colors.gold} />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
            <Button variant="gold" size="md" onPress={() => setActiveModal('none')} style={{ marginTop: spacing.md }}>
              Kapat
            </Button>
          </View>
        </View>
      </Modal>

      {/* ─── MODAL: ÖDEME ÖZETİ (PRD §33, §34) ──────────────────── */}
      <Modal
        visible={activeModal === 'payments'}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal('none')}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ödeme Özeti</Text>
              <Pressable onPress={() => setActiveModal('none')} style={styles.closeBtn}>
                <Feather name="x" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Summary Board */}
              <View style={styles.paymentSummaryCard}>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Paket Toplamı:</Text>
                  <Text style={styles.paymentValue}>{totalAmount.toLocaleString()} AED</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Ödenen Kapora:</Text>
                  <Text style={[styles.paymentValue, { color: colors.success }]}>
                    {paidAmount.toLocaleString()} AED
                  </Text>
                </View>
                <View style={[styles.paymentRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Kalan Bakiye:</Text>
                  <Text style={styles.totalValue}>{remainingAmount.toLocaleString()} AED</Text>
                </View>
              </View>

              <Text style={styles.subHeading}>ÖDEME GEÇMİŞİ</Text>
              {payments.map((p) => (
                <View key={p.id} style={styles.historyCard}>
                  <View>
                    <Text style={styles.historyTitle}>{p.description}</Text>
                    <Text style={styles.historySub}>{p.payment_method}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.historyAmount}>
                      {p.amount.toLocaleString()} {p.currency}
                    </Text>
                    <StatusBadge status={p.status} />
                  </View>
                </View>
              ))}
            </ScrollView>
            <Button variant="gold" size="md" onPress={() => setActiveModal('none')} style={{ marginTop: spacing.md }}>
              Kapat
            </Button>
          </View>
        </View>
      </Modal>

      {/* ─── MODAL: TALEPLERİM (PRD §28) ───────────────────────── */}
      <Modal
        visible={activeModal === 'requests'}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal('none')}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Taleplerim</Text>
              <Pressable onPress={() => setActiveModal('none')} style={styles.closeBtn}>
                <Feather name="x" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {requests.length === 0 ? (
                <Text style={styles.emptyText}>Henüz aktif bir talebiniz bulunmuyor.</Text>
              ) : (
                requests.map((req) => (
                  <View key={req.id} style={styles.reqCard}>
                    <View style={styles.reqHeaderRow}>
                      <Text style={styles.reqCategory}>{req.category.toUpperCase()}</Text>
                      <StatusBadge status={req.status} />
                    </View>
                    <Text style={styles.reqTitle}>{req.title}</Text>
                    <Text style={styles.reqDate}>
                      {req.date} · {req.time} {req.pax_count ? `· ${req.pax_count} Kişi` : ''}
                    </Text>
                    {req.notes && <Text style={styles.reqNotes}>"{req.notes}"</Text>}
                  </View>
                ))
              )}
            </ScrollView>
            <Button variant="gold" size="md" onPress={() => setActiveModal('none')} style={{ marginTop: spacing.md }}>
              Kapat
            </Button>
          </View>
        </View>
      </Modal>

      {/* ─── MODAL: BİLDİRİMLER (PRD §35) ──────────────────────── */}
      <Modal
        visible={activeModal === 'notifications'}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal('none')}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bildirim Merkezi</Text>
              <Pressable onPress={() => setActiveModal('none')} style={styles.closeBtn}>
                <Feather name="x" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {notifications.map((notif) => (
                <View key={notif.id} style={styles.notifCardItem}>
                  <View style={styles.notifIconWrap}>
                    <Feather name="bell" size={16} color={colors.gold} />
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={styles.notifTitle}>{notif.title}</Text>
                    {notif.body && <Text style={styles.notifBody}>{notif.body}</Text>}
                    <Text style={styles.notifTime}>{notif.created_at?.slice(11, 16) || 'Şimdi'}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <Button variant="gold" size="md" onPress={() => setActiveModal('none')} style={{ marginTop: spacing.md }}>
              Kapat
            </Button>
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.card,
  },
  userInfo: {
    flex: 1,
    marginLeft: spacing.base,
  },
  userName: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  userHandle: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
    marginTop: 1,
  },
  userTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 8,
  },
  userTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: radius.sm,
    gap: 4,
  },
  userTagText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.gold,
  },
  userPhone: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textTertiary,
  },
  menuSection: {
    marginBottom: spacing.xl,
  },
  sectionHeaderLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 2,
    color: colors.gold,
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
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
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextCol: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  menuDesc: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  badgeCount: {
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    marginRight: spacing.xs,
  },
  badgeCountText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 11,
    color: colors.gold,
  },
  // Modals
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#0B0F1A',
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.xl,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  modalTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  closeBtn: {
    padding: 4,
  },
  subHeading: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
    marginVertical: spacing.sm,
  },
  emptyText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  // Trip item
  tripCardItem: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.base,
  },
  tripHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tripCardTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  activePill: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radius.full,
  },
  activePillText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    color: colors.success,
  },
  tripCardSub: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
    marginTop: 4,
  },
  tripCardPax: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 4,
  },
  pastTripCardItem: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    opacity: 0.7,
  },
  pastTripTitle: {
    fontFamily: fontFamily.serif.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  pastTripDate: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textTertiary,
  },
  pastTripSub: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Doc item
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    marginBottom: spacing.xs,
  },
  docIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  docMeta: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
  },
  docDownloadBtn: {
    padding: spacing.xs,
  },
  // Payment card
  paymentSummaryCard: {
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.base,
    marginBottom: spacing.md,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  paymentLabel: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  paymentValue: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
    marginTop: spacing.xs,
  },
  totalLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: fontSize.base,
    color: colors.goldSoft,
  },
  totalValue: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.lg,
    color: colors.gold,
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    marginBottom: spacing.xs,
  },
  historyTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  historySub: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
  },
  historyAmount: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  // Req card
  reqCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    marginBottom: spacing.sm,
  },
  reqHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  reqCategory: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.gold,
  },
  reqTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  reqDate: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
    marginTop: 2,
  },
  reqNotes: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  // Notif Card
  notifCardItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    marginBottom: spacing.xs,
  },
  notifIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  notifTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  notifBody: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  notifTime: {
    fontFamily: fontFamily.sans.regular,
    fontSize: 10,
    color: colors.textTertiary,
    marginTop: 4,
  },
});
