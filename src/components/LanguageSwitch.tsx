// src/components/LanguageSwitch.tsx

import React from 'react';

interface LanguageSwitchProps {
    currentLang: 'UA' | 'EN';
    onToggle: (lang: 'UA' | 'EN') => void;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ currentLang, onToggle }) => {
    const handleToggle = () => {
        onToggle(currentLang === 'UA' ? 'EN' : 'UA');
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded-full border border-white/20 bg-black/30 hover:bg-black/50 transition-colors flex items-center justify-center text-sm font-semibold"
            title="Переключити мову"
        >
            <span className={currentLang === 'UA' ? 'text-purple-400' : 'text-gray-500'}>UA</span>
            <span className="text-gray-500 mx-1">/</span>
            <span className={currentLang === 'EN' ? 'text-purple-400' : 'text-gray-500'}>EN</span>
        </button>
    );
};