// файл: src/components/GlobalHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Mail, Sparkles, ExternalLink } from 'lucide-react';

const GlobalHeader = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              JobFlow UA
            </span>
          </Link>

          {/* Меню */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            
            {/* Кнопка: Конструктор */}
            <Link 
              href="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                pathname === '/' || pathname.startsWith('/resume')
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Конструктор Резюме</span>
            </Link>

            {/* Кнопка: Cover Letter */}
            <a 
              href="https://cover-letter9.web.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-green-400 hover:bg-white/5 transition-all group"
            >
              <Mail size={16} className="group-hover:text-green-400 transition-colors" />
              <span className="hidden sm:inline">Cover Letter AI</span>
              <ExternalLink size={12} className="opacity-50" />
            </a>

          </div>

          <div className="hidden md:block w-[100px]"></div> 
        </div>
      </div>
    </nav>
  );
};

export default GlobalHeader;