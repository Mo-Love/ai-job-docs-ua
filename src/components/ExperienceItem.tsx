import React from 'react';
import { Trash2 } from 'lucide-react';

export const ExperienceItem = ({ data, onChange, onRemove, index }: any) => {
  return (
    <div className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-3 relative group">
      <button onClick={() => onRemove(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <Trash2 size={18} />
      </button>
      <div className="grid grid-cols-2 gap-4">
        <input 
            placeholder="Посада" 
            value={data.role || ''} 
            onChange={e => onChange('role', e.target.value)} 
            className="bg-transparent border-b border-white/10 p-2 text-white focus:border-blue-500 outline-none" 
        />
        <input 
            placeholder="Компанія" 
            value={data.company || ''} 
            onChange={e => onChange('company', e.target.value)} 
            className="bg-transparent border-b border-white/10 p-2 text-white focus:border-blue-500 outline-none" 
        />
      </div>
      <input 
          placeholder="Період (напр. 2020 - 2023)" 
          value={data.duration || ''} 
          onChange={e => onChange('duration', e.target.value)} 
          className="w-full bg-transparent border-b border-white/10 p-2 text-gray-300 focus:border-blue-500 outline-none text-sm" 
      />
      <textarea 
          placeholder="Опишіть ваші обов'язки та досягнення..." 
          value={data.description || ''} 
          onChange={e => onChange('description', e.target.value)} 
          className="w-full bg-black/10 rounded p-3 text-sm text-gray-300 min-h-[80px] outline-none focus:ring-1 focus:ring-blue-500/50"
      />
    </div>
  );
};