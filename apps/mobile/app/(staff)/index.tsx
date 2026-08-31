/**
 * TRAVIA DUBAI — Staff Home Dashboard (PRD §39, §42, §43, §61)
 * Dynamic KPIs, live operations banner, and direct Request Inbox with 1-tap approval.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useAuthStore } from '../../src/stores/authStore';
import { useTraviaStore } from '../../src/stores/traviaStore';
import { CustomerRequest } from '../../src/types/models';
import SafeScreen from '../../src/components/layout/SafeScreen';
import Avatar from '../../src/components/ui/Avatar';
import StatusBadge from '../../src/components/ui/StatusBadge';
import Button from '../../src/components/ui/Button';

export default function StaffHomeScreen() {
  const router = useRouter();
  const { profile } = useAuthStore();
  const {
    staffCustomers,
    operations,
    requests,
    messages,
    approveRequest,
  } = useTraviaStore();

  const [selectedRequest, setSelectedRequest] = useState<CustomerRequest | null>(null);

  const staffName = profile?.first_name || 'Efza';

  const unreadMessagesCount = messages.filter(
    (m) => m.sender_role === 'customer' && m.status !== 'read'
  ).length;

  const pendingRequests = requests.filter(
    (r) => r.status === 'received' || r.status === 'reviewing'
  );

  const kpis = [
    {
      label: 'Aktif Misafir',
      value: '12',
      icon: 'users',
      color: colors.gold,
      onPress: () => router.push('/(staff)/customers'),
    },
    {
      label: 'Operasyon',
      value: `${operations.length}`,
      icon: 'calendar',
      color: '#60A5FA',
      onPress: () => router.push('/(staff)/operations'),
    },
    {
      label: 'Yeni Talep',
      value: `${pendingRequests.length}`,
      icon: 'inbox',
      color: '#FBBF24',
      onPress: () => {
        if (requests[0]) setSelectedRequest(requests[0]);
      },
    },
    {
      label: 'Okunmamış Mesaj',
      value: `${unreadMessagesCount}`,
      icon: 'message-circle',
      color: colors.success,
      onPress: () => router.push('/(staff)/messages'),
    },
    {
      label: 'Bekleyen Onay',
      value: `${requests.filter((r) => r.status === 'received').length}`,
      icon: 'clock',
      color: '#F87171',
      onPress: () => {
        if (requests[0]) setSelectedRequest(requests[0]);
      },
    },
  ];

  const handleApprove = (reqId: string, title: string) => {
    approveRequest(reqId);
    setSelectedRequest(null);
    Alert.alert(
      'Talep Onaylandı',
      `"${title}" başarıyla onaylandı, seyahat programına eklendi ve müşteriye bildirim iletildi.`
    );
  };

  const nextOp = operations.find((o) => o.status === 'confirmed') || operations[0];

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Block */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.roleLabel}>TRAVIA CONCIERGE & OPERASYON</Text>
            <Text style={styles.greetingTitle}>Günaydın, {staffName}</Text>
          </View>
          <Avatar name={staffName} size={42} />
        </View>

        {/* Section Heading */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>BUGÜNÜN ÖZETİ</Text>
          <Text style={styles.sectionTitle}>Operasyonel Durum</Text>
        </View>

        {/* KPI Grid (PRD §39) */}
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, idx) => (
            <Pressable
              key={idx}
              onPress={kpi.onPress}
              style={[styles.kpiCard, idx === 0 && styles.fullWidthKpi]}
            >
              <View style={[styles.kpiIconWrap, { backgroundColor: `${kpi.color}15` }]}>
                <Feather name={kpi.icon as any} size={20} color={kpi.color} />
              </View>
              <View>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={styles.kpiLabel}>{kpi.label}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Urgent Operations Banner */}
        {nextOp && (
          <View style={styles.urgentBanner}>
            <View style={styles.urgentTop}>
              <View style={styles.urgentDot} />
              <Text style={styles.urgentLabel}>YAKLAŞAN İLK OPERASYON ({nextOp.time})</Text>
            </View>
            <Text style={styles.urgentTitle}>
              {nextOp.customerName} · {nextOp.type}
            </Text>
            <Text style={styles.urgentSub}>{nextOp.details} · {nextOp.driverOrLocation}</Text>

            <Pressable
              onPress={() => router.push('/(staff)/operations')}
              style={styles.urgentAction}
            >
              <Text style={styles.urgentActionText}>Operasyon Detayını Gör</Text>
              <Feather name="arrow-right" size={14} color={colors.gold} />
            </Pressable>
          </View>
        )}

        {/* Gelen Talepler (Request Inbox - PRD §42, §43) */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionBadge}>TALEP MERKEZİ</Text>
            <Text style={styles.sectionTitle}>Gelen Müşteri Talepleri</Text>
          </View>
          <Text style={styles.reqCountBadge}>{requests.length} Talep</Text>
        </View>

        <View style={styles.requestsContainer}>
          {requests.slice(0, 4).map((req) => (
            <View key={req.id} style={styles.reqCard}>
              <View style={styles.reqTopRow}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{req.category.toUpperCase()}</Text>
                </View>
                <StatusBadge status={req.status} />
              </View>

              <Text style={styles.reqCustomerName}>{req.customer_name || 'Edip Mangtay'}</Text>
              <Text style={styles.reqTitleText}>{req.title}</Text>
              <Text style={styles.reqTimeText}>
                {req.date} · {req.time} {req.pax_count ? `· ${req.pax_count} Kişi` : ''}
              </Text>
              {req.notes && <Text style={styles.reqNotesText}>"{req.notes}"</Text>}

              <View style={styles.reqActionsRow}>
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => setSelectedRequest(req)}
                  style={{ flex: 1, marginRight: 6 }}
                >
                  Detayı İncele
                </Button>

                {req.status !== 'confirmed' && (
                  <Button
                    variant="gold"
                    size="sm"
                    onPress={() => handleApprove(req.id, req.title)}
                    icon={<Feather name="check" size={14} color={colors.textInverse} />}
                    style={{ flex: 1, marginLeft: 6 }}
                  >
                    Talebi Onayla
                  </Button>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ─── MODAL: REQUEST DETAIL & APPROVAL (PRD §43) ───────────── */}
      <Modal
        visible={!!selectedRequest}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedRequest(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {selectedRequest && (
              <>
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalBadge}>TALEP DETAYI & AKSİYON</Text>
                    <Text style={styles.modalTitle}>{selectedRequest.title}</Text>
                  </View>
                  <Pressable onPress={() => setSelectedRequest(null)} style={styles.closeBtn}>
                    <Feather name="x" size={20} color={colors.textSecondary} />
                  </Pressable>
                </View>

                <View style={styles.detailBox}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Müşteri:</Text>
                    <Text style={styles.detailVal}>{selectedRequest.customer_name || 'Edip Mangtay'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Tarih & Saat:</Text>
                    <Text style={styles.detailVal}>
                      {selectedRequest.date} · {selectedRequest.time}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Kişi Sayısı:</Text>
                    <Text style={styles.detailVal}>{selectedRequest.pax_count || 2} Kişi</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Durum:</Text>
                    <StatusBadge status={selectedRequest.status} />
                  </View>
                  {selectedRequest.notes && (
                    <View style={{ marginTop: spacing.sm }}>
                      <Text style={styles.detailLabel}>Müşteri Notu:</Text>
                      <Text style={styles.notesBox}>"{selectedRequest.notes}"</Text>
                    </View>
                  )}
                </View>

                <View style={styles.modalBtnRow}>
                  <Button
                    variant="outline"
                    size="md"
                    onPress={() => {
                      setSelectedRequest(null);
                      router.push('/(staff)/messages');
                    }}
                    icon={<Feather name="message-circle" size={16} color={colors.gold} />}
                    style={{ flex: 1, marginRight: 6 }}
                  >
                    Müşteriye Yaz
                  </Button>

                  {selectedRequest.status !== 'confirmed' && (
                    <Button
                      variant="gold"
                      size="md"
                      onPress={() => handleApprove(selectedRequest.id, selectedRequest.title)}
                      icon={<Feather name="check-circle" size={16} color={colors.textInverse} />}
                      style={{ flex: 1, marginLeft: 6 }}
                    >
                      Onayla & Ekle
                    </Button>
                  )}
                </View>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  roleLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 2,
    color: colors.gold,
  },
  greetingTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize['2xl'],
    color: colors.textPrimary,
    marginTop: 2,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionBadge: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.gold,
  },
  sectionTitle: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginTop: 2,
  },
  reqCountBadge: {
    fontFamily: fontFamily.sans.bold,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: spacing.lg,
  },
  kpiCard: {
    width: '48%',
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  fullWidthKpi: {
    width: '100%',
  },
  kpiIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiValue: {
    fontFamily: fontFamily.serif.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  kpiLabel: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  urgentBanner: {
    backgroundColor: 'rgba(201, 166, 107, 0.1)',
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.borderActive,
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  urgentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  urgentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F87171',
    marginRight: 6,
  },
  urgentLabel: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1.5,
    color: '#F87171',
  },
  urgentTitle: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  urgentSub: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  urgentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: 4,
  },
  urgentActionText: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: fontSize.xs,
    color: colors.gold,
  },
  // Requests Container
  requestsContainer: {
    gap: 12,
  },
  reqCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
  },
  reqTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    backgroundColor: 'rgba(201, 166, 107, 0.15)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radius.full,
  },
  categoryText: {
    fontFamily: fontFamily.sans.bold,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.gold,
  },
  reqCustomerName: {
    fontFamily: fontFamily.sans.medium,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
  },
  reqTitleText: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    marginTop: 2,
  },
  reqTimeText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  reqNotesText: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  reqActionsRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  // Modal
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
  detailBox: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radius.xl,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.base,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  detailVal: {
    fontFamily: fontFamily.serif.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  notesBox: {
    fontFamily: fontFamily.sans.regular,
    fontSize: fontSize.xs,
    color: colors.goldSoft,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: spacing.sm,
    borderRadius: radius.md,
    marginTop: 4,
  },
  modalBtnRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
});
