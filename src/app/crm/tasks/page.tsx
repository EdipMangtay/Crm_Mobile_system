'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  User,
  Trash2,
  CheckSquare,
} from 'lucide-react';
import { TravelBadge } from '@/components/ui/travel/TravelBadge';
import { TravelButton } from '@/components/ui/travel/TravelButton';
import { TravelDialog } from '@/components/ui/travel/TravelDialog';

interface StaffTask {
  id: string;
  title: string;
  relatedEntity: string;
  relatedLink: string;
  assignedTo: string;
  dueDate: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  completed: boolean;
  category: 'concierge' | 'operations' | 'sales' | 'finance';
}

const INITIAL_TASKS: StaffTask[] = [
  {
    id: 'task-1',
    title: 'Edip Mangtay için Sky Pool Villa özel karşılama çiçeği ve meyve sepeti teyidi al',
    relatedEntity: 'Edip Mangtay (VIP Müşteri)',
    relatedLink: '/crm/customers/d0000000-0000-0000-0000-000000000001',
    assignedTo: 'Melis Demir',
    dueDate: 'Bugün 14:00',
    priority: 'urgent',
    completed: false,
    category: 'concierge',
  },
  {
    id: 'task-2',
    title: '14 Eylül süperyat turu için Veuve Clicquot şampanya tedarik teyidi al',
    relatedEntity: 'Premium Couple Gezisi',
    relatedLink: '/crm/trips/f0000000-0000-0000-0000-000000000001',
    assignedTo: 'Deniz Acar',
    dueDate: 'Yarın 11:00',
    priority: 'high',
    completed: false,
    category: 'operations',
  },
  {
    id: 'task-3',
    title: 'Tobias Hartmann için VIP teklif revizyonu hazırla ve PDF paylaş',
    relatedEntity: 'Tobias Hartmann (Lead)',
    relatedLink: '/crm/leads/l0000000-0000-0000-0000-000000000001',
    assignedTo: 'Deniz Acar',
    dueDate: 'Bugün 18:00',
    priority: 'high',
    completed: false,
    category: 'sales',
  },
  {
    id: 'task-4',
    title: 'Kerem Aydın çöl safarisi çocuk menüsü listesini kampa ilet',
    relatedEntity: 'Kerem Aydın (Müşteri)',
    relatedLink: '/crm/customers/d0000000-0000-0000-0000-000000000002',
    assignedTo: 'Tariq Al-Mansoor',
    dueDate: '13 Eyl 18:00',
    priority: 'medium',
    completed: true,
    category: 'operations',
  },
  {
    id: 'task-5',
    title: 'Selin Arslan kalan bakiye ödeme linki oluştur ve ilet',
    relatedEntity: 'Selin Arslan (Müşteri)',
    relatedLink: '/crm/customers/d0000000-0000-0000-0000-000000000003',
    assignedTo: 'Edip Mangtay',
    dueDate: '15 Eyl 12:00',
    priority: 'medium',
    completed: false,
    category: 'finance',
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<StaffTask[]>(INITIAL_TASKS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'completed'>('open');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'urgent' | 'high' | 'medium'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Melis Demir');
  const [newTaskPriority, setNewTaskPriority] = useState<'urgent' | 'high' | 'medium'>('high');
  const [newTaskDue, setNewTaskDue] = useState('Bugün 18:00');
  const [newTaskEntity, setNewTaskEntity] = useState('Edip Mangtay (VIP Müşteri)');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const created: StaffTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      relatedEntity: newTaskEntity,
      relatedLink: '/crm/customers',
      assignedTo: newTaskAssignee,
      dueDate: newTaskDue,
      priority: newTaskPriority,
      completed: false,
      category: 'operations',
    };

    setTasks((prev) => [created, ...prev]);
    setNewTaskTitle('');
    setIsAddOpen(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter === 'open' && t.completed) return false;
    if (statusFilter === 'completed' && !t.completed) return false;
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
    return true;
  });

  const openCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="space-y-6 max-w-[1600px] pb-10">
      {/* ─── Header & Action ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
              Operasyonel Görevler & Takip Kuyruğu
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#C9A66B]/10 text-[#C9A66B] border border-[#C9A66B]/20">
              {openCount} Açık Görev
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Misafir talepleri, transfer hazırlıkları ve ekip içi iş atamaları
          </p>
        </div>

        <TravelButton
          variant="primary"
          size="sm"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="w-3.5 h-3.5" />
          Yeni Görev Ekle
        </TravelButton>
      </div>

      {/* ─── Filter Toolbar ─────────────────────────────────────────────── */}
      <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#F5F1E8]/40 mr-1 text-[11px] font-mono uppercase">Durum:</span>
          {(['all', 'open', 'completed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md transition-colors ${
                statusFilter === st
                  ? 'bg-white/10 text-[#F5F1E8] font-semibold'
                  : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'
              }`}
            >
              {st === 'all' ? 'Tümü' : st === 'open' ? 'Açık Görevler' : 'Tamamlananlar'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#F5F1E8]/40 mr-1 text-[11px] font-mono uppercase">Öncelik:</span>
          {(['all', 'urgent', 'high', 'medium'] as const).map((pr) => (
            <button
              key={pr}
              onClick={() => setPriorityFilter(pr)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                priorityFilter === pr
                  ? 'bg-white/10 text-[#C9A66B] font-semibold'
                  : 'text-[#F5F1E8]/40 hover:text-[#F5F1E8]'
              }`}
            >
              {pr === 'all' ? 'Tümü' : pr === 'urgent' ? 'Acil' : pr === 'high' ? 'Yüksek' : 'Normal'}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Task Queue List ────────────────────────────────────────────── */}
      <div className="bg-[#0B0F1A] border border-white/10 rounded-xl overflow-hidden shadow-sm">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <CheckSquare className="w-8 h-8 text-white/20 mx-auto" />
            <p className="text-sm font-medium text-[#F5F1E8]">Bu filtrede görev bulunamadı</p>
            <p className="text-xs text-[#F5F1E8]/40">Tüm açık görevler başarıyla tamamlanmış olabilir.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredTasks.map((task) => {
              const priorityVariant =
                task.priority === 'urgent'
                  ? 'error'
                  : task.priority === 'high'
                  ? 'warning'
                  : 'neutral';

              const priorityLabel =
                task.priority === 'urgent'
                  ? 'Acil'
                  : task.priority === 'high'
                  ? 'Yüksek'
                  : 'Normal';

              return (
                <div
                  key={task.id}
                  className={`p-4 flex items-start gap-3.5 hover:bg-[#111827]/40 transition-colors ${
                    task.completed ? 'opacity-60 bg-[#111827]/10' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 text-[#C9A66B] hover:scale-110 transition-transform shrink-0"
                    aria-label={task.completed ? 'Görevi aç' : 'Görevi tamamla'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#F5F1E8]/20 hover:text-[#C9A66B]" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p
                        className={`text-sm leading-snug ${
                          task.completed
                            ? 'line-through text-[#F5F1E8]/40'
                            : 'text-[#F5F1E8] font-medium'
                        }`}
                      >
                        {task.title}
                      </p>
                      <TravelBadge variant={priorityVariant} size="sm">
                        {priorityLabel}
                      </TravelBadge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#F5F1E8]/40">
                      <Link
                        href={task.relatedLink}
                        className="text-[#C9A66B] hover:underline truncate max-w-xs"
                      >
                        İlişkili: {task.relatedEntity}
                      </Link>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-[#F5F1E8]/30" /> {task.assignedTo}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-[#F5F1E8]/30" /> {task.dueDate}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-[#F5F1E8]/20 hover:text-red-400 p-1 transition-colors shrink-0"
                    title="Görevi Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Add Task Dialog ────────────────────────────────────────────── */}
      <TravelDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Yeni Görev Ekle"
        description="Oturum görev listesine yeni bir operasyonel takip kaydı ekleyin."
      >
        <form onSubmit={handleAddTask} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs text-[#F5F1E8]/70 mb-1">Görev Başlığı / Tanımı</label>
            <input
              type="text"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Örn: Transfer aracı için VIP karşılama panosu hazırla"
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Atanan Personel</label>
              <select
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              >
                <option value="Melis Demir">Melis Demir (Concierge)</option>
                <option value="Deniz Acar">Deniz Acar (Saha / Operasyon)</option>
                <option value="Tariq Al-Mansoor">Tariq Al-Mansoor (VIP Şoför / Lojistik)</option>
                <option value="Edip Mangtay">Edip Mangtay (Yönetici)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Öncelik Seviyesi</label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as 'urgent' | 'high' | 'medium')}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              >
                <option value="urgent">Acil</option>
                <option value="high">Yüksek</option>
                <option value="medium">Normal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Termin Tarihi & Saati</label>
              <input
                type="text"
                value={newTaskDue}
                onChange={(e) => setNewTaskDue(e.target.value)}
                placeholder="Örn: Bugün 17:00 veya 14 Eyl"
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              />
            </div>
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">İlişkili Kayıt</label>
              <input
                type="text"
                value={newTaskEntity}
                onChange={(e) => setNewTaskEntity(e.target.value)}
                placeholder="Örn: Edip Mangtay (Müşteri)"
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
            <TravelButton variant="ghost" size="sm" onClick={() => setIsAddOpen(false)}>
              İptal
            </TravelButton>
            <TravelButton variant="primary" size="sm" type="submit">
              Görevi Kaydet
            </TravelButton>
          </div>
        </form>
      </TravelDialog>
    </div>
  );
}
