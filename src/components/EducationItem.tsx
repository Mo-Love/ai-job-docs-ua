import React from 'react';
import { Trash2 } from 'lucide-react';

export const EducationItem = ({ data, onChange, onRemove, index }: any) => {
  return (
    <div className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-3 relative group">
        <button onClick={() => onRemove(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <Trash2 size={18} />
        </button>
        <div className="grid grid-cols-1 gap-2">
            <input placeholder="Заклад освіти" value={data.school || ''} onChange={e => onChange('school', e.target.value)} className="bg-transparent border-b border-white/10 p-2 text-white font-medium outline-none" />
            <input placeholder="Ступінь / Спеціальність" value={data.degree || ''} onChange={e => onChange('degree', e.target.value)} className="bg-transparent border-b border-white/10 p-2 text-gray-300 text-sm outline-none" />
            <input placeholder="Рік випуску" value={data.year || ''} onChange={e => onChange('year', e.target.value)} className="bg-transparent border-b border-white/10 p-2 text-gray-400 text-xs outline-none" />
        </div>
    </div>
  );
};