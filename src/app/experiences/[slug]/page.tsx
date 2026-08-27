import Link from 'next/link';
import { ArrowLeft, Clock, Users, Shield, Sparkles, Check, Phone, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { formatCurrency } from '@/types/crm';

interface ExperienceData {
  title: string;
  category: string;
  duration: string;
  capacity: string;
  startingPrice: number;
  location: string;
  overview: string;
  highlights: string[];
  inclusions: string[];
  itinerary: { time: string; title: string; desc: string }[];
}

const EXPERIENCES_DATA: Record<string, ExperienceData> = {
  'yacht-sunset': {
    title: 'Özel Süperyat Gün Batımı Seyri (Majesty 56ft)',
    category: 'Yat & Deniz Deneyimi',
    duration: '4 Saat',
    capacity: '10 Kişiye Kadar',
    startingPrice: 6800,
    location: 'Dubai Marina Yacht Club Pier 7',
    overview: 'Dubai Marina gökdelenleri, Ain Dubai ve Palm Jumeirah lagününde şampanya eşliğinde gün batımını özel lüks yatınızda deneyimleyin. Profesyonel mürettebat ve özel servis eşliğinde unutulmaz bir seyahat.',
    highlights: [
      'Majesty 56ft lüks süperyat özel kiralama',
      'Ain Dubai, Palm Jumeirah ve Burj Al Arab rotası',
      'Şampanya ve gurme meyve tabağı ikramı',
      'Lüks ses sistemi & Bluetooth bağlantısı',
      'Yüzme molası ve gün batımı fotoğraf noktaları',
    ],
    inclusions: [
      'Lisanslı kaptan ve 2 servis personeli',
      'Yakıt ve marina yanaşma ücretleri',
      'Sınırsız soft içecekler, su ve buz',
      'Can yelekleri ve deniz güvenlik ekipmanları',
      'Otelden marinaya VIP transfer imkanı',
    ],
    itinerary: [
      { time: '15:30', title: 'Marina Karşılama & Check-in', desc: 'Pier 7 VIP lounge alanında karşılama ve yatımıza biniş.' },
      { time: '16:00', title: 'Dubai Marina Kanal Çıkışı', desc: 'Gökdelenlerin arasından açık denize doğru büyüleyici seyir.' },
      { time: '17:30', title: 'Palm Jumeirah Gün Batımı', desc: 'Altın saatte şampanya ikramı ve lagünde fotoğraf çekimi.' },
      { time: '19:30', title: 'Marina Gece Işıkları Altında Dönüş', desc: 'Işıklandırılmış marina silüetinde iskeleye dönüş.' },
    ],
  },
  'desert-safari': {
    title: 'VIP Kızıl Kum Çöl Safarisi & Royal Majlis',
    category: 'Çöl & Macera Deneyimi',
    duration: '6 Saat',
    capacity: 'Özel Araç (1-6 Kişi)',
    startingPrice: 4200,
    location: 'Lahbab Çölü & Özel Majlis Kampı',
    overview: 'Turistik kalabalıklardan tamamen izole, sadece size özel ayrılmış Royal Majlis çadırında gurme akşam yemeği, şahin gösterisi ve yüksek kum tepelerinde heyecan dolu safari.',
    highlights: [
      'Özel modifiyeli lüks Land Cruiser ile safari',
      'Lahbab kızıl kum tepelerinde kum kayağı (sandboarding)',
      'Gün batımında şahinle özel hatıra fotoğrafı çekimi',
      'Özel uşaklı ve klimalı Royal Majlis çadırı',
      'Canlı ızgara şefli 5 yıldızlı gurme barbekü menüsü',
    ],
    inclusions: [
      'Otelinizden kapıdan kapıya özel VIP transfer',
      'Tüm milli park ve çöl koruma alanı giriş ücretleri',
      'Özel çöl rehberi ve safari uzmanı',
      'Geleneksel Arap kahvesi, hurma ve nargile servisi',
    ],
    itinerary: [
      { time: '15:00', title: 'Otelden Alınış', desc: 'Özel 4x4 araç ile otelinizin lobisinden hareket.' },
      { time: '16:15', title: 'Kızıl Kum Safarisi & Sandboarding', desc: 'Yüksek kum tepelerinde aksiyon ve fotoğraf molası.' },
      { time: '18:00', title: 'Royal Majlis Kampına Giriş', desc: 'Özel çadırınıza geçiş, gün batımı ikramları ve şahin gösterisi.' },
      { time: '19:30', title: 'Gurme Akşam Yemeği', desc: 'Yıldızların altında şefin özel barbekü ziyafeti.' },
      { time: '21:00', title: 'Otele Dönüş', desc: 'Konforlu transfer ile otele bırakılış.' },
    ],
  },
  'helicopter-tour': {
    title: '25 Dk Helikopter Şehir Turu (City Skyline)',
    category: 'Havacılık Deneyimi',
    duration: '25 Dakika',
    capacity: 'Özel Kiralama (6 Kişi)',
    startingPrice: 3600,
    location: 'Atlantis Helipad, Palm Jumeirah',
    overview: 'Dünyanın en ikonik yapay adası Palm Jumeirah, yelken otel Burj Al Arab ve dünyanın en yüksek gökdeleni Burj Khalifa üzerinden geçen nefes kesici kuşbakışı Dubai turu.',
    highlights: [
      'Burj Al Arab ve The World Islands üzerinde alçak uçuş',
      'Burj Khalifa ve Downtown silüetinin eşsiz açısı',
      'Bose gürültü önleyici aktif kulaklıklar ile pilot brifingi',
      'VIP Helipad lounge alanında karşılama',
    ],
    inclusions: [
      'Tüm havalimanı ve hava sahası sigortaları',
      'İki dilli profesyonel pilot anlatımı',
      'Uçuş öncesi güvenlik brifingi ve ikramlar',
    ],
    itinerary: [
      { time: '10:15', title: 'Helipad Karşılama & Pasaport Kontrolü', desc: 'Atlantis Helipad VIP lounge giriş.' },
      { time: '10:45', title: 'Kalkış & Palm Jumeirah Turu', desc: 'Kuşbakışı ada mimarisi ve sahil şeridi.' },
      { time: '11:00', title: 'Downtown & Burj Khalifa Geçişi', desc: 'Gökdelenlerin üzerinden panoramik dönüş.' },
      { time: '11:15', title: 'İniş & Hatıra Fotoğrafı', desc: 'Pilot ile helikopter önünde profesyonel fotoğraf çekimi.' },
    ],
  },
};

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = EXPERIENCES_DATA[slug] || EXPERIENCES_DATA['yacht-sunset'];

  return (
    <div className="min-h-screen bg-navy-900 text-cream">
      <Navbar />

      <main className="pt-28 pb-20 px-4 max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-xs text-gold-400 hover:text-gold-300 transition-colors mb-6 font-mono uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Tüm Deneyimlere Dön
        </Link>

        {/* Experience Header Card */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/25 rounded-3xl p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A66B]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B]/30 text-[#E8C77A] text-xs font-mono">
              ✦ {experience.category}
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5F1E8] tracking-tight leading-tight">
              {experience.title}
            </h1>

            <p className="text-sm sm:text-base text-[#F5F1E8]/60 max-w-2xl leading-relaxed">
              {experience.overview}
            </p>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#C9A66B]/15">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Süre</span>
                <p className="text-sm font-semibold text-[#F5F1E8] mt-0.5">{experience.duration}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Kapasite</span>
                <p className="text-sm font-semibold text-[#F5F1E8] mt-0.5">{experience.capacity}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Lokasyon</span>
                <p className="text-sm font-semibold text-[#F5F1E8] mt-0.5 truncate">{experience.location}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Özel Paket Fiyatı</span>
                <p className="text-lg font-semibold text-[#C9A66B] font-mono mt-0.5">{formatCurrency(experience.startingPrice)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Highlights & Itinerary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights */}
            <div className="bg-[#0B0F1A] border border-[#C9A66B]/15 rounded-2xl p-6">
              <h2 className="text-lg font-serif font-bold text-[#F5F1E8] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9A66B]" /> Öne Çıkan Ayrıcalıklar
              </h2>
              <div className="space-y-3">
                {experience.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#F5F1E8]/80">
                    <Check className="w-4 h-4 text-[#C9A66B] mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-[#0B0F1A] border border-[#C9A66B]/15 rounded-2xl p-6">
              <h2 className="text-lg font-serif font-bold text-[#F5F1E8] mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A66B]" /> Örnek Akış Programı
              </h2>
              <div className="space-y-4">
                {experience.itinerary.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-[#111827]/40 border border-[#C9A66B]/5">
                    <span className="text-xs font-mono text-[#C9A66B] font-semibold w-12 shrink-0">{item.time}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#F5F1E8]">{item.title}</p>
                      <p className="text-xs text-[#F5F1E8]/45 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="space-y-6">
            <div className="bg-[#0B0F1A] border border-[#C9A66B]/25 rounded-2xl p-6 sticky top-28 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A66B]">VIP Rezervasyon</span>
              <p className="text-2xl font-mono font-bold text-[#F5F1E8]">
                {formatCurrency(experience.startingPrice)}
                <span className="text-xs text-[#F5F1E8]/40 font-normal"> / paket</span>
              </p>

              <div className="space-y-2.5 pt-2 border-t border-[#C9A66B]/10 text-xs text-[#F5F1E8]/60">
                <p className="flex items-center gap-2">✓ Doğrudan İskele / Alış Transferi</p>
                <p className="flex items-center gap-2">✓ 7/24 WhatsApp Concierge Desteği</p>
                <p className="flex items-center gap-2">✓ Esnek İptal & Saat Değişikliği</p>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/905320000000?text=${encodeURIComponent(`Merhaba, "${experience.title}" deneyimi için rezervasyon oluşturmak istiyorum.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,166,107,0.3)] hover:opacity-90 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp ile Anında Ayırt</span>
                </a>
                <Link
                  href="/#trip-planner"
                  className="w-full py-3 rounded-xl bg-[#111827] border border-[#C9A66B]/20 text-[#F5F1E8] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#C9A66B]/10 transition-all"
                >
                  <span>Özel Gezi Paketine Ekle</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
