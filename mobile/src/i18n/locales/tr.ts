/**
 * TRAVIA DUBAI — Turkish Locale (MVP Default)
 * All UI strings centralized here. No hardcoded Turkish text in components.
 */

const tr = {
  // ─── Common ─────────────────────────────────────────
  common: {
    loading: 'Yükleniyor...',
    retry: 'Tekrar Dene',
    cancel: 'İptal',
    confirm: 'Onayla',
    save: 'Kaydet',
    send: 'Gönder',
    close: 'Kapat',
    back: 'Geri',
    next: 'İleri',
    continue: 'Devam Et',
    seeDetails: 'Detayı Gör',
    seeAll: 'Tümünü Gör',
    noConnection: 'İnternet bağlantınız yok.',
    offlineMessage: 'Son güncellenen bilgiler gösteriliyor.',
    connectionError: 'Bağlantı kurulamadı',
    connectionErrorMessage: 'İnternet bağlantınızı kontrol edip tekrar deneyin.',
    errorGeneric: 'Bir hata oluştu',
    errorGenericMessage: 'Lütfen tekrar deneyin veya Travia ekibiyle iletişime geçin.',
  },

  // ─── Auth ───────────────────────────────────────────
  auth: {
    welcome: "Dubai deneyiminize hoş geldiniz.",
    usernameLabel: 'Kullanıcı Adı',
    usernamePlaceholder: 'Kullanıcı adınız',
    passwordLabel: 'Şifre',
    passwordPlaceholder: 'Şifreniz',
    login: 'Giriş Yap',
    loginHelp: 'Giriş bilgileriniz için Travia temsilcinizle iletişime geçin.',
    invalidCredentials: 'Kullanıcı adı veya şifre hatalı.',
    accountDisabled: 'Hesabınız devre dışı bırakılmıştır. Travia ile iletişime geçin.',
    // First login
    firstLoginTitle: "Travia'ya Hoş Geldiniz",
    firstLoginGreeting: 'Hoş Geldiniz, {{name}}.',
    firstLoginSubtitle: 'Dubai deneyiminiz hazır.',
    changePasswordTitle: 'Şifrenizi Değiştirin',
    newPasswordLabel: 'Yeni Şifre',
    newPasswordPlaceholder: 'Yeni şifrenizi girin',
    confirmPasswordLabel: 'Şifre Tekrar',
    confirmPasswordPlaceholder: 'Şifrenizi tekrar girin',
    passwordMismatch: 'Şifreler eşleşmiyor.',
    passwordTooShort: 'Şifre en az 8 karakter olmalıdır.',
    passwordChanged: 'Şifreniz başarıyla değiştirildi.',
    logout: 'Çıkış Yap',
  },

  // ─── Splash ─────────────────────────────────────────
  splash: {
    tagline: "Dubai'yi Size Özel Yaşayın.",
  },

  // ─── Navigation ─────────────────────────────────────
  nav: {
    home: 'Ana Sayfa',
    trip: 'Seyahatim',
    concierge: 'Concierge',
    explore: 'Keşfet',
    profile: 'Profil',
    // Staff
    customers: 'Müşteriler',
    messages: 'Mesajlar',
    operations: 'Operasyon',
    menu: 'Menü',
  },

  // ─── Home ───────────────────────────────────────────
  home: {
    greeting: 'Günaydın',
    greetingAfternoon: 'İyi Günler',
    greetingEvening: 'İyi Akşamlar',
    greetingNight: 'İyi Geceler',
    experienceLabel: 'Dubai deneyiminiz',
    countdown: "Dubai'ye {{days}} Gün Kaldı",
    countdownToday: "Dubai'ye Bugün Uçuyorsunuz!",
    tripActive: 'Dubai Deneyiminiz Başladı',
    tripCompleted: 'Bir sonraki Dubai deneyiminizde görüşmek üzere.',
    nextExperience: 'SIRADAKİ DENEYİM',
    todaySchedule: 'Bugünün Programı',
    noScheduleToday: 'Bugün programınızda etkinlik bulunmuyor.',
    conciergeCard: {
      title: 'Travia Concierge',
      subtitle: "Dubai'de ihtiyacınız olan her şey için yanınızdayız.",
      cta: "Concierge'e Yaz",
      online: 'Travia ekibi çevrimiçi',
    },
    inHours: '{{hours}} saat {{minutes}} dakika sonra',
    inMinutes: '{{minutes}} dakika sonra',
  },

  // ─── Trip ───────────────────────────────────────────
  trip: {
    title: 'Dubai Seyahatiniz',
    nights: '{{count}} Gece',
    pax: '{{count}} Kişi',
    day: 'GÜN {{number}}',
    dayTitle: '{{date}} — {{title}}',
    noItinerary: 'Seyahat programınız henüz hazırlanıyor.',
    noItineraryMessage: 'Travia ekibiniz programınızı en kısa sürede oluşturacaktır.',
  },

  // ─── Booking ────────────────────────────────────────
  booking: {
    status: 'Durum',
    date: 'Tarih',
    time: 'Saat',
    location: 'Konum',
    meetingPoint: 'Buluşma Noktası',
    pax: 'Kişi Sayısı',
    dressCode: 'Kıyafet Kodu',
    included: 'Dahil Olanlar',
    notes: 'Notlar',
    driver: 'Şoförünüz',
    vehicle: 'Araç',
    plate: 'Plaka',
    pickup: 'Alım Noktası',
    callDriver: 'Şoförü Ara',
    whatsappDriver: 'WhatsApp',
    openLocation: 'Konumu Aç',
  },

  // ─── Concierge ──────────────────────────────────────
  concierge: {
    title: 'Travia Concierge',
    subtitle: 'Size özel seyahat asistanınız',
    inputPlaceholder: 'Mesajınızı yazın...',
    noMessages: 'Henüz mesajınız yok',
    noMessagesSubtitle: 'Travia Concierge seyahatiniz boyunca burada olacak.',
    startChat: "Concierge'e Yaz",
    newRequest: 'Yeni Talep',
  },

  // ─── Requests ───────────────────────────────────────
  request: {
    title: 'Taleplerim',
    new: 'Yeni Talep',
    category: 'Kategori',
    date: 'Tarih',
    time: 'Saat',
    pax: 'Kişi Sayısı',
    budget: 'Bütçe',
    preferences: 'Tercih',
    notes: 'Not',
    submit: "Concierge'e Gönder",
    submitted: 'Talebiniz İletildi',
    submittedMessage: 'En kısa sürede sizinle iletişime geçeceğiz.',
    noRequests: 'Aktif Talebiniz Yok',
    noRequestsSubtitle: 'Yeni bir deneyim veya rezervasyon için concierge ekibimize ulaşabilirsiniz.',
    categories: {
      restaurant: 'Restoran',
      transfer: 'Transfer',
      yacht: 'Yat',
      beach_club: 'Beach Club',
      activity: 'Aktivite',
      private_driver: 'Özel Şoför',
      booking_change: 'Rezervasyon Değişikliği',
      itinerary_change: 'Seyahat Planı Değişikliği',
      other: 'Diğer',
    },
    status: {
      received: 'Talep Alındı',
      reviewing: 'İnceleniyor',
      preparing_offer: 'Teklif Hazırlanıyor',
      pending_approval: 'Onay Bekliyor',
      confirmed: 'Onaylandı',
      completed: 'Tamamlandı',
      cancelled: 'İptal',
    },
  },

  // ─── Documents ──────────────────────────────────────
  documents: {
    title: 'Belgelerim',
    noDocuments: 'Henüz belgeniz bulunmuyor.',
    noDocumentsSubtitle: 'Seyahat belgeleriniz burada görünecektir.',
    types: {
      hotel_voucher: 'Otel Voucher',
      yacht_confirmation: 'Yat Onayı',
      safari_voucher: 'Safari Voucher',
      transfer_confirmation: 'Transfer Onayı',
      invoice: 'Fatura',
      payment_receipt: 'Ödeme Makbuzu',
      visa_document: 'Vize Belgesi',
      travel_document: 'Seyahat Belgesi',
      other: 'Diğer',
    },
  },

  // ─── Payments ───────────────────────────────────────
  payments: {
    title: 'Ödemeler',
    total: 'Paket Toplamı',
    paid: 'Ödenen',
    remaining: 'Kalan',
    history: 'Ödeme Geçmişi',
    status: {
      pending: 'Beklemede',
      received: 'Alındı',
      refunded: 'İade Edildi',
      cancelled: 'İptal',
    },
    deposit: 'Kapora',
    noPayments: 'Ödeme kaydı bulunmuyor.',
  },

  // ─── Profile ────────────────────────────────────────
  profile: {
    title: 'Profilim',
    name: 'Ad Soyad',
    username: 'Kullanıcı Adı',
    phone: 'Telefon',
    whatsapp: 'WhatsApp',
    email: 'E-posta',
    country: 'Ülke',
    language: 'Dil',
    myTrips: 'Seyahatlerim',
    myDocuments: 'Belgelerim',
    myPayments: 'Ödemelerim',
    myRequests: 'Taleplerim',
    notifications: 'Bildirimler',
    contactTravia: 'Travia ile İletişim',
    changePassword: 'Şifre Değiştir',
  },

  // ─── Notifications ─────────────────────────────────
  notifications: {
    title: 'Bildirimler',
    noNotifications: 'Bildiriminiz bulunmuyor.',
    markAllRead: 'Tümünü Okundu İşaretle',
  },

  // ─── Explore ────────────────────────────────────────
  explore: {
    title: 'Keşfet',
    subtitle: "Dubai'nin en özel deneyimlerini keşfedin",
    addToTrip: 'Seyahatime Ekle',
    requestInfo: 'Bilgi İste',
    categories: {
      transfer: 'Özel Araç',
      yacht: 'Yat',
      restaurant: 'Fine Dining',
      desert_safari: 'Desert Safari',
      beach_club: 'Beach Club',
      helicopter: 'Helikopter',
      supercar: 'Supercar',
      activity: 'Abu Dhabi',
      other: 'Etkinlikler',
    },
  },

  // ─── Staff ──────────────────────────────────────────
  staff: {
    home: {
      greeting: 'Günaydın',
      today: 'Bugün',
      activeGuests: 'Aktif Misafir',
      operations: 'Operasyon',
      newRequests: 'Yeni Talep',
      unreadMessages: 'Okunmamış Mesaj',
      pendingApproval: 'Bekleyen Onay',
    },
    customers: {
      title: 'Aktif Müşteriler',
      inDubai: "Dubai'de",
      daysLeft: '{{days}} gün kaldı',
      unread: 'okunmamış',
    },
    requests: {
      title: 'Talepler',
      open: 'Talebi Aç',
      approve: 'Talebi Onayla',
      reject: 'Reddet',
      addNote: 'Not Ekle',
      newUpsell: 'YENİ UPSELL TALEBİ',
    },
    operations: {
      title: 'Operasyon',
      todayTimeline: 'Bugünün Operasyonları',
      statusActions: {
        confirmed: 'Onaylandı',
        notified: 'Müşteri Bilgilendirildi',
        started: 'Başladı',
        completed: 'Tamamlandı',
        issue: 'Sorun Var',
      },
    },
    chat: {
      context: {
        trip: 'Trip',
        next: 'Sıradaki',
        outstanding: 'Kalan Ödeme',
      },
    },
  },

  // ─── Time ───────────────────────────────────────────
  time: {
    today: 'Bugün',
    tomorrow: 'Yarın',
    yesterday: 'Dün',
    nights: 'Gece',
    hours: 'saat',
    minutes: 'dakika',
    ago: 'önce',
    later: 'sonra',
  },
} as const;

export default tr;
