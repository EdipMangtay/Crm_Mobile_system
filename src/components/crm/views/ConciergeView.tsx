'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Search, Phone, MessageCircle, Sparkles } from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import SmartReplies from '@/components/crm/concierge/SmartReplies';
import { INITIAL_USER_THREADS } from '@/shared/data/traviaData';
import { UserMessageThread, Message } from '@/types/models';

export default function ConciergeView() {
  const [threads, setThreads] = useState<Record<string, UserMessageThread>>(INITIAL_USER_THREADS);
  const [selectedThreadId, setSelectedThreadId] = useState<string>('thread-edip');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads[selectedThreadId] || Object.values(threads)[0];

  // Auto-scroll to bottom of active conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedThreadId, activeThread?.messages.length]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeThread) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      thread_id: activeThread.id,
      sender_role: 'concierge',
      type: 'text',
      content: messageInput,
      status: 'sent',
      created_at: new Date().toISOString(),
    };

    const updatedThread: UserMessageThread = {
      ...activeThread,
      last_message_at: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      last_message_preview: messageInput,
      messages: [...activeThread.messages, newMsg],
    };

    setThreads(prev => ({
      ...prev,
      [activeThread.id]: updatedThread,
    }));

    setMessageInput('');
  };

  const filteredThreads = Object.values(threads).filter(t =>
    t.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.trip_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex gap-4 h-[calc(100vh-8.5rem)] max-w-[1600px]">
      {/* ─── LEFT: USER THREADS LIST (Separated by Customer) ─── */}
      <div className="w-[340px] shrink-0 bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl overflow-hidden flex flex-col">
        {/* Header & Search */}
        <div className="p-4 border-b border-[#C9A66B]/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#C9A66B]" />
              <h2 className="text-sm font-semibold text-[#F5F1E8]">Misafir Konuşmaları</h2>
            </div>
            <span className="text-[10px] bg-[#C9A66B]/15 text-[#E8C77A] px-2 py-0.5 rounded-full font-mono">
              {filteredThreads.length} Misafir
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5F1E8]/20" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Misafir veya gezi ara..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:outline-none focus:border-[#C9A66B]/30"
            />
          </div>
        </div>

        {/* User-based threads */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#C9A66B]/5">
          {filteredThreads.map(thread => {
            const isSelected = selectedThreadId === thread.id;
            return (
              <button
                key={thread.id}
                onClick={() => {
                  setSelectedThreadId(thread.id);
                  // Mark read
                  setThreads(prev => ({
                    ...prev,
                    [thread.id]: { ...prev[thread.id], staff_unread_count: 0 },
                  }));
                }}
                className={`w-full flex items-start gap-3.5 p-4 text-left transition-all ${
                  isSelected
                    ? 'bg-[#C9A66B]/10 border-l-2 border-[#C9A66B]'
                    : 'hover:bg-[#F5F1E8]/[0.02]'
                }`}
              >
                {/* User Avatar */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                  isSelected
                    ? 'bg-[#C9A66B] text-[#05070F]'
                    : 'bg-[#111827] border border-[#C9A66B]/15 text-[#C9A66B]'
                }`}>
                  {thread.customer_name[0]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-xs">{thread.customer_country}</span>
                      <p className={`text-sm truncate ${isSelected ? 'text-[#F5F1E8] font-semibold' : 'text-[#F5F1E8]/80 font-medium'}`}>
                        {thread.customer_name}
                      </p>
                      {thread.customer_vip && <Badge variant="gold" size="sm">VIP</Badge>}
                    </div>
                    <span className="text-[10px] text-[#F5F1E8]/25 shrink-0 font-mono">{thread.last_message_at}</span>
                  </div>

                  <p className="text-[11px] text-[#C9A66B]/60 truncate mt-0.5">{thread.trip_title}</p>
                  <p className="text-xs text-[#F5F1E8]/40 truncate mt-1 leading-snug">{thread.last_message_preview}</p>
                </div>

                {/* Unread badge */}
                {thread.staff_unread_count > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#C9A66B] text-[#05070F] text-[10px] font-bold flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(201,166,107,0.4)]">
                    {thread.staff_unread_count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── RIGHT: DEDICATED CONVERSATION VIEW FOR SELECTED USER ─── */}
      <div className="flex-1 bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl overflow-hidden flex flex-col">
        {/* Active User Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9A66B]/10 bg-[#0B0F1A]/80 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/5 border border-[#C9A66B]/20 flex items-center justify-center text-sm font-bold text-[#C9A66B]">
              {activeThread.customer_name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base">{activeThread.customer_country}</span>
                <h3 className="text-base font-semibold text-[#F5F1E8]">{activeThread.customer_name}</h3>
                {activeThread.customer_vip && <Badge variant="gold" size="sm">VIP GUEST</Badge>}
              </div>
              <p className="text-xs text-[#C9A66B]/60 mt-0.5">{activeThread.trip_title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`${activeThread.customer_name} ile WhatsApp hattı açılıyor...`)}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </button>
            <button
              onClick={() => alert(`${activeThread.customer_name} doğrudan aranıyor...`)}
              className="p-2 rounded-xl bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8]/40 hover:text-[#F5F1E8] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C9A66B]" />
            </button>
          </div>
        </div>

        {/* Message Feed for this specific user */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeThread.messages.map((msg: Message) => {
            const isCustomer = msg.sender_role === 'customer';
            const isSystem = msg.type === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-3">
                  <div className="px-4 py-2 rounded-full bg-[#111827] border border-[#C9A66B]/20 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
                    <span className="text-xs font-medium text-[#E8C77A]">{msg.content}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-lg ${
                  isCustomer
                    ? 'bg-[#111827] border border-[#C9A66B]/15 rounded-bl-sm text-[#F5F1E8]'
                    : 'bg-gradient-to-br from-[#C9A66B]/15 to-[#C9A66B]/5 border border-[#C9A66B]/25 rounded-br-sm text-[#F5F1E8]'
                }`}>
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-[10px] font-mono uppercase text-[#C9A66B]/60 font-semibold">
                      {isCustomer ? activeThread.customer_name : 'Travia Concierge Ekibi'}
                    </span>
                    <span className="text-[10px] font-mono text-[#F5F1E8]/25">
                      {new Date(msg.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* AI Concierge Copilot Smart Replies */}
        <SmartReplies
          customerName={activeThread.customer_name}
          onSelectReply={(replyText) => setMessageInput(replyText)}
        />

        {/* Staff Reply Box for this specific customer */}
        <div className="p-4 border-t border-[#C9A66B]/10 bg-[#0B0F1A]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`${activeThread.customer_name} için concierge yanıtı yazın...`}
              className="flex-1 px-4 py-3 text-sm rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8] placeholder-[#F5F1E8]/25 focus:outline-none focus:border-[#C9A66B]/40 transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold hover:opacity-90 transition-all disabled:opacity-30 flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(201,166,107,0.25)]"
            >
              <Send className="w-4 h-4" />
              <span>Gönder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
