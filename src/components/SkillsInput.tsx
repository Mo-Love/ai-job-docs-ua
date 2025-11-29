// файл: src/components/SkillsInput.tsx
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react'; // Додали імпорт Plus

interface SkillsInputProps {
  currentSkills: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsInput = ({ currentSkills, onChange }: SkillsInputProps) => {
  const [input, setInput] = useState('');

  // Логіка додавання навички (винесена в окрему функцію)
  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !currentSkills.includes(trimmed)) {
      onChange([...currentSkills, trimmed]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(currentSkills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-3">
      {/* Список доданих навичок (теги) */}
      <div className="flex flex-wrap gap-2">
        {currentSkills.map((skill, idx) => (
          <span key={idx} className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm flex items-center border border-blue-500/30">
            {skill}
            <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Поле вводу + Кнопка */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напиши навичку (напр. React)"
          className="flex-grow bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
        />
        
        <button 
          onClick={addSkill}
          disabled={!input.trim()} // Неактивна, якщо поле пусте
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 rounded-lg transition-colors flex items-center justify-center"
          title="Додати навичку"
        >
            <Plus size={20} />
            <span className="sr-only">Додати</span>
        </button>
      </div>
    </div>
  );
};