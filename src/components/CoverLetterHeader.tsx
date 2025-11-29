// src/components/CoverLetterHeader.tsx

import React from 'react';
import { LanguageSwitch } from './LanguageSwitch';

interface CoverLetterHeaderProps {
    currentLang: 'UA' | 'EN';
    onLanguageChange: (lang: 'UA' | 'EN') => void;
}

export const CoverLetterHeader: React.FC<CoverLetterHeaderProps> = ({ currentLang, onLanguageChange }) => {
    return (
        <header className="text-center pt-8 pb-12 relative max-w-4xl mx-auto">
            {/* Language Switch in the corner */}
            <div className="absolute top-0 right-0">
                <LanguageSwitch currentLang={currentLang} onToggle={onLanguageChange} />
            </div>

            {/* Main Title and Description */}
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                AI Супровідний лист
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                PDF + посилання → ідеальний лист за 10 секунд
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
                Більше не потрібно витрачати години на написання текстів вручну. Наш штучний інтелект аналізує ваше резюме та вимоги вакансії, щоб створити персоналізований лист, який точно зацікавить рекрутера.
            </p>
        </header>
    );
};