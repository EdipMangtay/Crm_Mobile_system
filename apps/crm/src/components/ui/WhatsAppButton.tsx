'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Merhaba, Dubai VIP gezi ve concierge hizmetleri hakkında bilgi almak istiyorum.');

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/905320000000?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-[#0B0F1A] border border-[#C9A66B]/30 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl mb-2 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#C9A66B]/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-xs font-semibold text-[#F5F1E8]">Travia VIP Concierge</p>
                <p className="text-[10px] text-emerald-400 font-mono">Çevrimiçi · Anında Yanıt</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#F5F1E8]/30 hover:text-[#F5F1E8] transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-3 text-xs bg-[#111827] p-3 rounded-xl border border-[#C9A66B]/10 text-[#F5F1E8]/80 leading-relaxed">
            Dubai seyahatiniz için özel yat, helikopter, çöl safarisi veya otel rezervasyonunuzu anında WhatsApp üzerinden planlayalım.
          </div>

          <div className="space-y-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="w-full p-2.5 text-xs rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/40 resize-none"
            />
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#05070F] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp ile Başlat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 border-2 border-[#E8C77A]/40 flex items-center justify-center text-[#05070F] shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-110 transition-transform relative group"
        aria-label="WhatsApp VIP Concierge"
      >
        <MessageCircle className="w-7 h-7 text-[#05070F] fill-current" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A66B] text-[9px] font-bold text-[#05070F] flex items-center justify-center">
          1
        </span>
      </button>
    </div>
  );
}
