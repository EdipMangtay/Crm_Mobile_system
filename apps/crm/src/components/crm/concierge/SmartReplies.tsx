'use client';

import { Sparkles, Utensils, Ship, Car, CreditCard } from 'lucide-react';

interface SmartRepliesProps {
  customerName: string;
  onSelectReply: (replyText: string) => void;
}

export default function SmartReplies({ customerName, onSelectReply }: SmartRepliesProps) {
  const firstName = customerName.split(' ')[0] || 'Misafirimiz';

  const TEMPLATES = [
    {
      label: 'Restoran Önerisi',
      icon: Utensils,
      text: `Elbette ${firstName} Bey/Hanım. Dubai'deki en seçkin masanızı hazırlamak için üç imza seçeneğimiz hazır: Nobu Dubai (Teras Manzara), Carna Steakhouse (DIFC) ve Nusr-Et. Sizin için hangisinde masa ayırtmamızı istersiniz? 🥂`,
    },
    {
      label: 'Yat İskele Bilgisi',
      icon: Ship,
      text: `${firstName} Bey/Hanım, özel yat turunuz için kaptanımız ve mürettebatımız Dubai Marina Yacht Club Pier 7'de sizi bekliyor olacaktır. VIP transfer aracınız sizi otel lobisinden 45 dakika önce alacaktır.`,
    },
    {
      label: 'Transfer & Şoför Teyidi',
      icon: Car,
      text: `Uçuş kodunuz radarımızda canlı olarak takip edilmektedir ${firstName} Bey/Hanım. VIP Mercedes V-Class aracımız ve özel tahsisli şoförünüz iniş saatinde Terminal 3 VIP kapısında hazır olacaktır.`,
    },
    {
      label: 'Dress Code Bilgisi',
      icon: Sparkles,
      text: `Mekan için tavsiye edilen giyim kodu: 'Elegant Chic / Akşam Şıklığı'dır. Erkek misafirlerimiz için ceket veya şık gömlek, hanımefendiler için kokteyl elbisesi tavsiye edilmektedir.`,
    },
    {
      label: 'Tahsilat / Ödeme Linki',
      icon: CreditCard,
      text: `${firstName} Bey/Hanım, rezervasyon kaporanız için güvenli ödeme bağlantınızı buradan iletiyoruz: https://pay.traviadubai.com/checkout/TRV-892104. Dilediğiniz kredi kartı ile 3D Secure güvencesiyle tamamlayabilirsiniz.`,
    },
  ];

  return (
    <div className="py-2.5 px-4 bg-[#111827]/60 border-t border-[#C9A66B]/10 overflow-x-auto flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#C9A66B] uppercase shrink-0 mr-1">
        <Sparkles className="w-3 h-3" />
        <span>AI Copilot:</span>
      </div>
      {TEMPLATES.map((t, idx) => {
        const Icon = t.icon;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectReply(t.text)}
            className="px-2.5 py-1 rounded-lg bg-[#0B0F1A] border border-[#C9A66B]/20 hover:border-[#C9A66B]/50 text-[11px] text-[#F5F1E8]/70 hover:text-[#E8C77A] whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0"
          >
            <Icon className="w-3 h-3 text-[#C9A66B]/70" />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
