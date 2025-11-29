// файл: src/app/page.tsx

'use client';

import { useState } from "react";
import Link from "next/link"; 
import { FileText, Mail, ArrowRight, Sparkles, ExternalLink } from "lucide-react";

const L10N = {
  UA: {
    BADGE: "AI-Інструменти для кар'єри",
    TITLE_1: "Твоя кар'єра.",
    TITLE_2: "Новий рівень.",
    DESC: "Єдиний простір для створення ідеальних документів. Резюме, що вражають, та листи, які читають.",
    CARD_RESUME_TITLE: "Конструктор Резюме",
    CARD_RESUME_DESC: "Створи професійне резюме з AI-оптимізацією тексту та сучасними шаблонами (Vitaello, Minimal, Tech).",
    CARD_RESUME_BTN: "Створити Резюме",
    CARD_COVER_TITLE: "Супровідний Лист",
    CARD_COVER_DESC: "Згенеруй персоналізований супровідний лист під конкретну вакансію за 10 секунд.",
    CARD_COVER_BTN: "Відкрити Генератор",
  },
  EN: {
    BADGE: "AI-Powered Career Tools",
    TITLE_1: "Your Career.",
    TITLE_2: "Next Level.",
    DESC: "Unified space for creating perfect documents. Impressive resumes and cover letters that get read.",
    CARD_RESUME_TITLE: "Resume Builder",
    CARD_RESUME_DESC: "Create a professional resume with AI text optimization and modern templates.",
    CARD_RESUME_BTN: "Create Resume",
    CARD_COVER_TITLE: "Cover Letter",
    CARD_COVER_DESC: "Generate a personalized cover letter for a specific job opening in 10 seconds.",
    CARD_COVER_BTN: "Open Generator",
  },
};

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'UA' | 'EN'>('UA');
  const t = L10N[currentLang];

  const toggleLang = () => setCurrentLang(prev => (prev === 'UA' ? 'EN' : 'UA'));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#080A1F]">
      
      {/* Мовний перемикач */}
      <div className="absolute top-6 right-6 z-50">
        <button 
            onClick={toggleLang} 
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all backdrop-blur-md"
        >
            <span className={currentLang === 'UA' ? 'text-purple-400' : 'text-gray-500'}>UA</span>
            <span className="mx-2 text-gray-600">/</span>
            <span className={currentLang === 'EN' ? 'text-purple-400' : 'text-gray-500'}>EN</span>
        </button>
      </div>

      {/* Ефекти фону */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="text-center max-w-3xl mb-16 relative z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
            <Sparkles size={14} className="mr-2" /> {t.BADGE}
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6">
          {t.TITLE_1}<br/> {t.TITLE_2}
        </h1>
        <p className="text-xl text-gray-400">
          {t.DESC}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl relative z-10">
        
        {/* КАРТКА 1: РЕЗЮМЕ (Внутрішнє посилання на /resume) */}
        <Link href="/resume" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative h-full bg-gray-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-blue-500/50 transition duration-300 flex flex-col">
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <FileText size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">{t.CARD_RESUME_TITLE}</h2>
                <p className="text-gray-400 mb-8 flex-grow">
                    {t.CARD_RESUME_DESC}
                </p>
                <div className="flex items-center text-blue-400 font-semibold mt-auto">
                    {t.CARD_RESUME_BTN} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </div>
            </div>
        </Link>

        {/* КАРТКА 2: COVER LETTER (Зовнішнє посилання на готовий проект) */}
        <a 
            href="https://cover-letter9.web.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative h-full bg-gray-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-purple-500/50 transition duration-300 flex flex-col">
                <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    <Mail size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">{t.CARD_COVER_TITLE}</h2>
                <p className="text-gray-400 mb-8 flex-grow">
                    {t.CARD_COVER_DESC}
                </p>
                <div className="flex items-center text-purple-400 font-semibold mt-auto">
                    {t.CARD_COVER_BTN} <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </div>
            </div>
        </a>

      </div>
    </main>
  );
}