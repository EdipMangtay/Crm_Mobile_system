'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Send,
  Search,
  Phone,
  MessageCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  Hotel,
} from 'lucide-react';
import {
  TravelBadge,
  TravelButton,
} from '@/components/ui/travel';
import SmartReplies from '@/components/crm/concierge/SmartReplies';
import { INITIAL_USER_THREADS, traviaData } from '@/shared/data/traviaData';
import { UserMessageThread, Message } from '@/types/models';

export default function ConciergeView() {
  const [threads, setThreads] = React.useState<Record<string, UserMessageThread>>(INITIAL_USER_THREADS);
  const [selectedThreadId, setSelectedThreadId] = React.useState<string>('thread-edip');
  const [messageInput, setMessageInput] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showMobileList, setShowMobileList] = React.useState(false);
  const [showRightContext, setShowRightContext] = React.useState(true);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const activeThread = threads[selectedThreadId] || Object.values(threads)[0];
  const activeCustomer = traviaData.getCustomer(activeThread?.customer_id || '');
  const activeTrip = activeThread ? traviaData.getTrip(activeThread.customer_id) : null;

  // Auto-scroll to bottom on thread change or new message
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedThreadId, activeThread?.messages.length]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeThread) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      thread_id: activeThread.id,
      sender_role: 'concierge',
      type: 'text',
      content: messageInput.trim(),
      status: 'sent',
      created_at: new Date().toISOString(),
    };

    const updatedThread: UserMessageThread = {
      ...activeThread,
      last_message_at: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      last_message_preview: messageInput.trim(),
      messages: [...activeThread.messages, newMsg],
    };

    setThreads((prev) => ({
      ...prev,
      [activeThread.id]: updatedThread,
    }));

    setMessageInput('');
  };

  const filteredThreads = Object.values(threads).filter(
    (t) =>
      t.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.trip_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex gap-3.5 h-[calc(100vh-8.5rem)] max-w-[1600px] select-none">
      {/* ─── COLUMN 1: USER THREADS LIST (Left 310px) ─── */}
      <div
        className={`w-full lg:w-[310px] shrink-0 bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] rounded-xl overflow-hidden flex flex-col ${
          showMobileList ? 'block' : 'hidden lg:flex'
        }`}
      >
        {/* Header & Search */}
        <div className="p-3.5 border-b border-[rgba(201,166,107,0.08)] space-y-2.5 bg-[#101524]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#C9A66B]" />
              <h2 className="text-xs font-semibold text-[#F5F1E8] uppercase tracking-wider font-mono">
                Misafir Kanalları
              </h2>
            </div>
            <span className="text-[10px] bg-[rgba(201,166,107,0.15)] text-[#E8C77A] px-2 py-0.2 rounded font-mono">
              {filteredThreads.length} Misafir
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5F1E8]/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Misafir veya gezi ara..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.14)] text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:outline-none focus:border-[#C9A66B]/50"
            />
          </div>
        </div>

        {/* Threads list */}
        <div className="flex-1 overflow-y-auto divide-y divide-[rgba(201,166,107,0.05)]">
          {filteredThreads.map((thread) => {
            const isSelected = selectedThreadId === thread.id;
            return (
              <button
                key={thread.id}
                onClick={() => {
                  setSelectedThreadId(thread.id);
                  setShowMobileList(false);
                  setThreads((prev) => ({
                    ...prev,
                    [thread.id]: { ...prev[thread.id], staff_unread_count: 0 },
                  }));
                }}
                className={`w-full flex items-start gap-3 p-3.5 text-left transition-all ${
                  isSelected
                    ? 'bg-[rgba(201,166,107,0.12)] border-l-2 border-[#C9A66B]'
                    : 'hover:bg-[rgba(245,241,232,0.02)]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-serif font-bold text-xs ${
                    isSelected
                      ? 'bg-[#C9A66B] text-[#05070F]'
                      : 'bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#E8C77A]'
                  }`}
                >
                  {thread.customer_name[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-xs">{thread.customer_country}</span>
                      <p
                        className={`text-xs truncate ${
                          isSelected ? 'text-[#F5F1E8] font-semibold' : 'text-[#F5F1E8]/80 font-medium'
                        }`}
                      >
                        {thread.customer_name}
                      </p>
                      {thread.customer_vip && (
                        <TravelBadge variant="gold" size="sm" className="text-[9px] py-0 h-3.5 px-1 font-mono">
                          VIP
                        </TravelBadge>
                      )}
                    </div>
                    <span className="text-[10px] text-[#F5F1E8]/30 shrink-0 font-mono">
                      {thread.last_message_at}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#C9A66B]/70 truncate mt-0.5 font-mono">
                    {thread.trip_title}
                  </p>
                  <p className="text-xs text-[#F5F1E8]/40 truncate mt-1 leading-snug">
                    {thread.last_message_preview}
                  </p>
                </div>

                {thread.staff_unread_count > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#C9A66B] text-[#05070F] text-[9px] font-bold flex items-center justify-center shrink-0 mt-1">
                    {thread.staff_unread_count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── COLUMN 2: ACTIVE CHAT CONVERSATION (Center) ─── */}
      <div
        className={`flex-1 bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] rounded-xl overflow-hidden flex flex-col min-w-0 ${
          showMobileList ? 'hidden lg:flex' : 'flex'
        }`}
      >
        {/* Active Chat Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(201,166,107,0.08)] bg-[#101524]/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileList(true)}
              className="lg:hidden p-1.5 rounded text-[#F5F1E8]/40 hover:text-[#F5F1E8]"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/5 border border-[#C9A66B]/20 flex items-center justify-center text-xs font-serif font-bold text-[#E8C77A] shrink-0">
              {activeThread?.customer_name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{activeThread?.customer_country}</span>
                <h3 className="text-sm font-semibold text-[#F5F1E8]">{activeThread?.customer_name}</h3>
                {activeThread?.customer_vip && (
                  <TravelBadge variant="gold" size="sm" className="text-[9px] py-0 h-3.5 px-1 font-mono">
                    VIP GUEST
                  </TravelBadge>
                )}
              </div>
              <p className="text-[11px] text-[#C9A66B]/70 font-mono mt-0.5">{activeThread?.trip_title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${(activeCustomer?.whatsapp || activeCustomer?.phone || '').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TravelButton variant="outline" size="sm" className="h-7 text-[11px] border-[rgba(201,166,107,0.15)] text-emerald-400 hover:bg-emerald-500/10 gap-1">
                <MessageCircle className="w-3 h-3" />
                <span className="hidden sm:inline">WhatsApp</span>
              </TravelButton>
            </a>
            <a href={`tel:${activeCustomer?.phone || ''}`}>
              <TravelButton variant="outline" size="sm" className="h-7 text-[11px] border-[rgba(201,166,107,0.15)] text-[#F5F1E8]/80 hover:text-[#F5F1E8]">
                <Phone className="w-3 h-3 text-[#C9A66B]" />
              </TravelButton>
            </a>
            <TravelButton
              variant="ghost"
              size="sm"
              onClick={() => setShowRightContext(!showRightContext)}
              className="h-7 px-2 text-[11px] text-[#F5F1E8]/50 hover:text-[#F5F1E8] hidden xl:flex gap-1"
              title="Misafir Bilgi Panelini Aç/Kapat"
            >
              <Info className="w-3.5 h-3.5 text-[#C9A66B]" />
            </TravelButton>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {activeThread?.messages.map((msg: Message) => {
            const isCustomer = msg.sender_role === 'customer';
            const isSystem = msg.type === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#101524] border border-[rgba(201,166,107,0.15)] flex items-center gap-1.5 text-xs text-[#E8C77A]">
                    <Sparkles className="w-3 h-3 text-[#C9A66B]" />
                    <span className="font-medium text-[11px]">{msg.content}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-2.5 shadow-sm space-y-1 ${
                    isCustomer
                      ? 'bg-[#101524] border border-[rgba(201,166,107,0.12)] text-[#F5F1E8]'
                      : 'bg-gradient-to-br from-[rgba(201,166,107,0.18)] to-[rgba(201,166,107,0.06)] border border-[rgba(201,166,107,0.25)] text-[#F5F1E8]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-mono uppercase text-[#C9A66B] font-semibold">
                      {isCustomer ? activeThread.customer_name : 'Travia Concierge Masası'}
                    </span>
                    <span className="text-[10px] font-mono text-[#F5F1E8]/30">
                      {new Date(msg.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{msg.content}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Realistic Smart Replies Bar */}
        <SmartReplies
          customerName={activeThread?.customer_name || ''}
          onSelectReply={(replyText) => setMessageInput(replyText)}
        />

        {/* Message Input Box */}
        <div className="p-3.5 border-t border-[rgba(201,166,107,0.08)] bg-[#101524]/60 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`${activeThread?.customer_name || 'Misafir'} için yanıt yazın...`}
              className="flex-1 px-3.5 py-2 text-xs rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.14)] text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:outline-none focus:border-[#C9A66B]/50 transition-all"
            />
            <TravelButton
              variant="primary"
              size="sm"
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="h-8 px-3.5 text-xs font-semibold gap-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gönder</span>
            </TravelButton>
          </div>
        </div>
      </div>

      {/* ─── COLUMN 3: GUEST CONTEXT PANEL (Right 280px) ─── */}
      {showRightContext && (
        <div className="w-[280px] shrink-0 bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] rounded-xl overflow-y-auto hidden xl:flex flex-col p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(201,166,107,0.08)]">
            <h3 className="text-xs font-semibold text-[#F5F1E8] uppercase tracking-wider font-mono">
              Misafir & Gezi Özeti
            </h3>
          </div>

          {/* Guest Identity */}
          <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#F5F1E8]">{activeThread?.customer_name}</span>
              <span className="text-sm">{activeThread?.customer_country}</span>
            </div>
            <p className="text-[11px] text-[#F5F1E8]/40 font-mono truncate">{activeCustomer?.email || 'email@example.com'}</p>
            <p className="text-[11px] text-[#F5F1E8]/40 font-mono">{activeCustomer?.phone || '+971 ...'}</p>

            <div className="flex flex-wrap gap-1 pt-1">
              {(activeCustomer?.tags || ['VIP', 'Luxury']).map((tag) => (
                <TravelBadge key={tag} variant={tag === 'VIP' ? 'gold' : 'neutral'} size="sm" className="text-[9px] py-0 h-3.5 px-1">
                  {tag}
                </TravelBadge>
              ))}
            </div>

            {activeCustomer && (
              <Link href={`/crm/customers/${activeCustomer.id}`} className="block pt-2">
                <TravelButton variant="ghost" size="sm" className="w-full justify-between text-[11px] text-[#C9A66B] h-6 px-1">
                  <span>360 Müşteri Profiline Git</span>
                  <ExternalLink className="w-3 h-3" />
                </TravelButton>
              </Link>
            )}
          </div>

          {/* Active Trip Summary */}
          {activeTrip && (
            <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)] space-y-2">
              <span className="text-[10px] font-mono text-[#C9A66B] uppercase block">
                Bağlı Gezi Programı
              </span>
              <p className="text-xs font-semibold text-[#F5F1E8]">{activeTrip.title}</p>
              <div className="space-y-1 text-[11px] text-[#F5F1E8]/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#C9A66B]" />
                  <span className="font-mono">{activeTrip.start_date} – {activeTrip.end_date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Hotel className="w-3 h-3 text-[#C9A66B]" />
                  <span className="truncate">{activeTrip.hotel_name || 'Lüks Otel'}</span>
                </div>
              </div>

              <Link href={`/crm/trips/${activeTrip.id}`} className="block pt-1">
                <TravelButton variant="ghost" size="sm" className="w-full justify-between text-[11px] text-[#C9A66B] h-6 px-1">
                  <span>Gezi Programını Aç</span>
                  <ExternalLink className="w-3 h-3" />
                </TravelButton>
              </Link>
            </div>
          )}

          {/* Staff Operational Notes */}
          <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)] space-y-1.5 text-xs">
            <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase block">
              Dahili Operasyon Notu
            </span>
            <p className="text-[11px] text-[#F5F1E8]/70 leading-relaxed italic">
              {activeCustomer?.notes || 'Misafir VIP protokolündedir. Özel Türkçe/İngilizce concierge desteği sağlanmaktadır.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
