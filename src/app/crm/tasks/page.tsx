'use client';

import { useState } from 'react';
import { Plus, CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '@/components/crm';

const TASKS = [
  { id: '1', title: 'Edip Mangtay için Atlantis Sky Pool Villa özel karşılama çiçeği sipariş et', due: '11 Eyl 14:00', priority: 'high' as const, assigned: 'Melis Demir', completed: false },
  { id: '2', title: '13 Eylül süperyat turu için Veuve Clicquot şampanya tedarik teyidi al', due: '12 Eyl 10:00', priority: 'urgent' as const, assigned: 'Deniz Acar', completed: false },
  { id: '3', title: 'Kerem Aydın (Family) çöl safarisi çocuk menüsü listesini kampa ilet', due: '14 Eyl 18:00', priority: 'medium' as const, assigned: 'Tariq Al-Mansoor', completed: true },
  { id: '4', title: 'Alman misafir Tobias Hartmann teklif revizyonunu hazırla ve PDF gönder', due: 'Bugün 18:00', priority: 'high' as const, assigned: 'Deniz Acar', completed: false },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(TASKS);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Görevler (Staff Tasks)</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Operasyonel görevler, müşteri takip hatırlatıcıları ve checklistler</p>
        </div>
        <button className="px-3.5 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold flex items-center gap-1.5 hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Yeni Görev Ekle
        </button>
      </div>

      <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl overflow-hidden divide-y divide-[#C9A66B]/5">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-4 p-4 hover:bg-[#F5F1E8]/[0.01] transition-colors">
            <button onClick={() => toggleTask(task.id)} className="text-[#C9A66B] hover:opacity-80 transition-opacity">
              {task.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-[#F5F1E8]/20" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${task.completed ? 'line-through text-[#F5F1E8]/30' : 'text-[#F5F1E8]/90 font-medium'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-3 text-xs text-[#F5F1E8]/30 mt-1">
                <span>Atanan: <span className="text-[#C9A66B]">{task.assigned}</span></span>
                <span>·</span>
                <span>Termin: {task.due}</span>
              </div>
            </div>
            <Badge variant={task.priority === 'urgent' ? 'error' : task.priority === 'high' ? 'warning' : 'default'} size="sm">
              {task.priority === 'urgent' ? 'Acil' : task.priority === 'high' ? 'Yüksek' : 'Normal'}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
