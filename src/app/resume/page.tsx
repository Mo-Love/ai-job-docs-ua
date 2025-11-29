// файл: src/app/resume/page.tsx
'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Plus, X, Eye, Lock, ShoppingCart } from "lucide-react"; // Прибрали зайві іконки Palette, Loader2
import Link from 'next/link';

// Компоненти
import { GlassCard } from "@/components/GlassCard"; 
import { Input } from "@/components/Input";
import { ExperienceItem } from "@/components/ExperienceItem";
import { SkillsInput } from "@/components/SkillsInput";
import { PhotoUploader } from "@/components/PhotoUploader";
import { EducationItem } from "@/components/EducationItem";

// Шаблони
import { TwoColumnTemplate } from "@/components/TwoColumnTemplate";
import { MinimalTemplate } from "@/components/MinimalTemplate";
import { ExecutiveTemplate } from "@/components/ExecutiveTemplate";
import { CreativeTemplate } from "@/components/CreativeTemplate";
import { TechTemplate } from "@/components/TechTemplate";

const L10N = {
  UA: {
    HEADER_TITLE: "AI Генератор Резюме",
    HEADER_SUBTITLE: "Створення професійного резюме за хвилини",
    HEADER_DESCRIPTION: "Обери ідеальний шаблон, заповни дані, а наш AI допоможе сформулювати думки професійною мовою.",
    SECTION_1_TITLE: "1. Основна інформація",
    SECTION_1_DESC: "Введи базові дані та бажану посаду, щоб AI знав, під що оптимізувати резюме.",
    LABEL_NAME: "Ім'я та Прізвище",
    LABEL_ROLE: "Бажана Посада (КРИТИЧНО)",
    LABEL_EMAIL: "Email",
    LABEL_FACEBOOK: "Посилання на Facebook",
    SECTION_2_TITLE: "2. Досвід роботи",
    SECTION_2_DESC: "Опиши свої досягнення. Поле 'Метрики' критично важливе для AI-оптимізації.",
    BUTTON_ADD_EXP: "Додати ще одну позицію",
    SECTION_3_TITLE: "3. Навички (Skills)",
    SECTION_3_DESC: "Введи ключові технології. Натисни Enter або кому, щоб додати тег.",
    SECTION_4_TITLE: "4. Освіта та Сертифікати",
    SECTION_4_DESC: "Освіта та сертифікати часто перевіряються ATS.",
    BUTTON_ADD_EDU: "Додати запис про освіту",
    PREVIEW_TITLE: "Прегляд та Експорт",
    PREVIEW_DESC: "Тут ти бачитимеш фінальний вигляд свого резюме.",
    PREVIEW_SELECT_LABEL: "Вибір шаблону для друку:",
    PREVIEW_BUTTON: "Переглянути резюме 👀",
    DOWNLOAD_BUTTON: "Завантажити PDF 📄",
    PREVIEW_EMPTY_HINT: "Введіть дані зліва та натисніть \"Переглянути\".",
    PREVIEW_HINT: "AI оптимізував твій опис досвіду, замінивши пасивні фрази на активні.",
    PREVIEW_SKILLS: "Навички:",
    PREVIEW_EDUCATION: "Освіта:",
    PREVIEW_NOT_SPECIFIED: "Не вказано",
    ALERT_PDF_ERROR: "Помилка: Шаблон для друку не знайдено.",
    ALERT_PDF_SUCCESS: "PDF-файл успішно згенеровано та завантажено!",
    PREVIEW_DEFAULT_NAME: "Ім’я Прізвище",
    PREVIEW_DEFAULT_ROLE: "Бажана Посада",
    MODAL_CLOSE: "Закрити попередній перегляд",
    BUY_BUTTON: "Отримати повний доступ ($1)",
    LOCKED_HINT: "Щоб завантажити PDF без водяних знаків, придбайте повну версію.",
    SUCCESS_PAYMENT: "Дякуємо за покупку! Завантаження розблоковано."
  },
  EN: {
    HEADER_TITLE: "AI Resume Generator",
    HEADER_SUBTITLE: "Creating an ATS-Optimized Resume",
    HEADER_DESCRIPTION: "Our artificial intelligence analyzes your data to create a personalized resume.",
    SECTION_1_TITLE: "1. Basic Information",
    SECTION_1_DESC: "Enter your basic data and desired role.",
    LABEL_NAME: "First and Last Name",
    LABEL_ROLE: "Desired Position (CRITICAL)",
    LABEL_EMAIL: "Email",
    LABEL_FACEBOOK: "Facebook Link",
    SECTION_2_TITLE: "2. Work Experience",
    SECTION_2_DESC: "Describe your achievements.",
    BUTTON_ADD_EXP: "Add another position",
    SECTION_3_TITLE: "3. Skills",
    SECTION_3_DESC: "Enter key technologies.",
    SECTION_4_TITLE: "4. Education and Certificates",
    SECTION_4_DESC: "Education and certificates are often checked by ATS.",
    BUTTON_ADD_EDU: "Add an education entry",
    PREVIEW_TITLE: "Preview and Export",
    PREVIEW_DESC: "Here you will see the final look of your resume.",
    PREVIEW_SELECT_LABEL: "Select Print Template:",
    PREVIEW_BUTTON: "View Resume 👀",
    DOWNLOAD_BUTTON: "Download PDF 📄",
    PREVIEW_EMPTY_HINT: "Enter data on the left and click \"View\".",
    PREVIEW_HINT: "AI optimized your experience description.",
    PREVIEW_SKILLS: "Skills:",
    PREVIEW_EDUCATION: "Education:",
    PREVIEW_NOT_SPECIFIED: "Not specified",
    ALERT_PDF_ERROR: "Error: Print template not found.",
    ALERT_PDF_SUCCESS: "PDF file successfully generated!",
    PREVIEW_DEFAULT_NAME: "First Last Name",
    PREVIEW_DEFAULT_ROLE: "Desired Position",
    MODAL_CLOSE: "Close Preview",
    BUY_BUTTON: "Get Full Access ($1)",
    LOCKED_HINT: "Purchase full access to download watermark-free PDF.",
    SUCCESS_PAYMENT: "Thanks for purchasing! Download unlocked."
  },
};

const LanguageSwitch = ({ currentLang, onToggle }: any) => {
    const nextLang = currentLang === 'UA' ? 'EN' : 'UA';
    return (
        <button onClick={() => onToggle(nextLang)} className="p-2 rounded-full border border-white/20 bg-black/30 hover:bg-black/50 transition-colors flex items-center justify-center text-sm font-semibold">
            <span className={currentLang === 'UA' ? 'text-purple-400' : 'text-gray-500'}>UA</span>
            <span className="text-gray-500 mx-1">/</span>
            <span className={currentLang === 'EN' ? 'text-purple-400' : 'text-gray-500'}>EN</span>
        </button>
    );
};

const getPreviewTitle = (name: string, role: string, langTexts: any) => {
    const nameDisplay = name.trim() || langTexts.PREVIEW_DEFAULT_NAME;
    const roleDisplay = role.trim() || langTexts.PREVIEW_DEFAULT_ROLE;
    if (!name.trim() && !role.trim()) return langTexts.PREVIEW_DEFAULT_NAME;
    return `${nameDisplay} - ${roleDisplay}`;
};

// Список шаблонів
const TEMPLATES = [
    { id: 'two-column', name: 'Modern (Vitaello)', component: TwoColumnTemplate },
    { id: 'minimal', name: 'Classic (ATS-Friendly)', component: MinimalTemplate },
    { id: 'executive', name: 'Executive (Dark Header)', component: ExecutiveTemplate },
    { id: 'creative', name: 'Creative (Indigo)', component: CreativeTemplate },
    { id: 'tech', name: 'Tech (Monospace)', component: TechTemplate },
];

const GUMROAD_PRODUCT_URL = "https://mo-love.gumroad.com/l/ТВІЙ_ТОВАР"; 

function ResumeBuilderContent() {
  const previewRef = useRef<HTMLDivElement>(null); 
  const printRef = useRef<HTMLDivElement>(null); 
  
  const searchParams = useSearchParams(); 

  const [currentLang, setCurrentLang] = useState<'UA' | 'EN'>('UA');
  const langTexts = L10N[currentLang];

  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
      if (searchParams.get('paid') === 'true') {
          setIsPaid(true);
      }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: '', role: '', email: '', facebook: '', skills: [] as string[],
    photoUrl: null as string | null, education: [] as any[], experiences: [] as any[], 
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Видалено стани для AI Design (isGeneratingStyle, stylePrompt, currentTheme)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePhotoUpload = (url: string | null) => {
    setFormData(prev => ({ ...prev, photoUrl: url }));
  };

  const handleSectionChange = (section: 'education' | 'experiences', index: number, field: string, value: string) => {
      setFormData(prev => {
          const updatedArray = [...prev[section]];
          updatedArray[index] = { ...updatedArray[index], [field]: value };
          return { ...prev, [section]: updatedArray };
      });
  };
  
  const handleAddEducation = () => setFormData(prev => ({ ...prev, education: [...prev.education, {}] }));
  const handleRemoveEducation = (index: number) => setFormData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  
  const handleAddExperience = () => setFormData(prev => ({ ...prev, experiences: [...prev.experiences, {}] }));
  const handleRemoveExperience = (index: number) => setFormData(prev => ({ ...prev, experiences: prev.experiences.filter((_, i) => i !== index) }));
  
  const canView = formData.name.trim() && formData.role.trim();
  const ActiveTemplate = TEMPLATES.find(t => t.id === selectedTemplate)?.component || TwoColumnTemplate;

  const handleDownloadPDF = async () => {
    if (!printRef.current) { alert(langTexts.ALERT_PDF_ERROR); return; };
    
    const canvas = await html2canvas(printRef.current, { 
        scale: 3, 
        logging: false, 
        useCORS: true, 
        backgroundColor: '#FFFFFF' 
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95); 
    const pdf = new jsPDF('p', 'mm', 'a4'); 
    const pdfWidth = 210; 
    const pdfHeight = 297; 
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`resume-${formData.name || 'AI'}-${selectedTemplate}.pdf`);
    
    alert(langTexts.ALERT_PDF_SUCCESS);
  };

  return (
    <div className="min-h-screen p-8 pt-16 relative bg-[#0f172a] text-white">
        
        {/* Кнопка Назад */}
        <div className="absolute top-4 left-4">
             <Link href="/" className="flex items-center text-gray-400 hover:text-white transition">
                 ← На головну
             </Link>
        </div>

        <header className="text-center pt-8 pb-12 relative max-w-4xl mx-auto">
            <div className="absolute top-0 right-0">
                <LanguageSwitch currentLang={currentLang} onToggle={setCurrentLang} />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                {langTexts.HEADER_TITLE}
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                {langTexts.HEADER_SUBTITLE}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">{langTexts.HEADER_DESCRIPTION}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* ЛІВА КОЛОНКА */}
            <div className="space-y-6">
                <GlassCard title={langTexts.SECTION_1_TITLE} description={langTexts.SECTION_1_DESC}>
                    <div className="space-y-4">
                        <PhotoUploader photoUrl={formData.photoUrl} onUpload={handlePhotoUpload} /> 
                        <Input id="name" label={langTexts.LABEL_NAME} placeholder={langTexts.PREVIEW_DEFAULT_NAME} value={formData.name} onChange={handleChange} required />
                        <Input id="role" label={langTexts.LABEL_ROLE} placeholder={langTexts.PREVIEW_DEFAULT_ROLE} value={formData.role} onChange={handleChange} required />
                        <Input id="email" label={langTexts.LABEL_EMAIL} placeholder="example@gmail.com" type="email" value={formData.email} onChange={handleChange} />
                        <Input id="facebook" label={langTexts.LABEL_FACEBOOK} placeholder="facebook.com/..." value={formData.facebook} onChange={handleChange} /> 
                    </div>
                </GlassCard>

                <GlassCard title={langTexts.SECTION_2_TITLE} description={langTexts.SECTION_2_DESC}>
                    <div className="space-y-6">
                        {formData.experiences.map((item, index) => (
                            <ExperienceItem key={index} index={index} data={item} onChange={(field, value) => handleSectionChange('experiences', index, field, value)} onRemove={handleRemoveExperience} targetRole={formData.role} currentLang={currentLang} />
                        ))}
                        <button onClick={handleAddExperience} className="w-full py-3 px-4 bg-transparent border border-white/20 text-gray-300 rounded-lg font-medium transition-colors hover:bg-white/10 flex items-center justify-center"><Plus size={20} className="mr-2" /> {langTexts.BUTTON_ADD_EXP}</button>
                    </div>
                </GlassCard>
                
                <GlassCard title={langTexts.SECTION_3_TITLE} description={langTexts.SECTION_3_DESC}>
                    <SkillsInput currentSkills={formData.skills} onChange={(skills) => setFormData(prev => ({ ...prev, skills: skills }))} />
                </GlassCard>
                
                <GlassCard title={langTexts.SECTION_4_TITLE} description={langTexts.SECTION_4_DESC}>
                    <div className="space-y-6">
                        {formData.education.map((item, index) => (
                            <EducationItem key={index} index={index} data={item} onChange={(field, value) => handleSectionChange('education', index, field, value)} onRemove={handleRemoveEducation} />
                        ))}
                        <button onClick={handleAddEducation} className="w-full py-3 px-4 bg-transparent border border-white/20 text-gray-300 rounded-lg font-medium transition-colors hover:bg-white/10 flex items-center justify-center"><Plus size={20} className="mr-2" /> {langTexts.BUTTON_ADD_EDU}</button>
                    </div>
                </GlassCard>
            </div>

            {/* ПРАВА КОЛОНКА */}
            <div className="lg:sticky lg:top-8 h-fit space-y-6">
                
                {/* ТУТ РАНІШЕ БУВ БЛОК "DESIGN (AI)".
                   МИ ЙОГО ВИДАЛИЛИ.
                */}

                {/* ПРЕВ'Ю */}
                <GlassCard title={langTexts.PREVIEW_TITLE} description={langTexts.PREVIEW_DESC}>
                    {isPaid && (
                        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm flex items-center">
                            <span className="mr-2">🎉</span> {langTexts.SUCCESS_PAYMENT}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-2">{langTexts.PREVIEW_SELECT_LABEL}</label>
                        <select id="template-select" value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-purple-400 transition cursor-pointer">
                            {TEMPLATES.map(template => ( <option key={template.id} value={template.id}>{template.name}</option> ))}
                        </select>
                    </div>

                    <div ref={previewRef} className="flex flex-col items-center justify-center h-[300px] border border-dashed border-purple-400/50 rounded-lg p-6 bg-black/10 mb-4">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">{getPreviewTitle(formData.name, formData.role, langTexts)}</h3>
                            {formData.photoUrl && <img src={formData.photoUrl} alt="Avatar" className="w-16 h-16 rounded-full mx-auto border-2 border-purple-500 object-cover" />}
                            <p className="text-gray-400 text-sm mt-2">{langTexts.PREVIEW_HINT}</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            disabled={!canView} 
                            className={`w-full py-3 px-4 text-white rounded-lg font-medium transition-all flex items-center justify-center ${canView ? 'bg-blue-600 hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                            <Eye className="mr-2" size={20}/> {langTexts.PREVIEW_BUTTON}
                        </button>
                        
                        {isPaid ? (
                            <button onClick={handleDownloadPDF} className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center" disabled={!canView}>
                                {langTexts.DOWNLOAD_BUTTON}
                            </button>
                        ) : (
                            <a 
                                href={GUMROAD_PRODUCT_URL} 
                                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] flex items-center justify-center text-white"
                            >
                                <ShoppingCart className="mr-2" size={20}/> {langTexts.BUY_BUTTON}
                            </a>
                        )}
                        
                        {!isPaid && <p className="text-xs text-center text-gray-500 mt-2"><Lock size={12} className="inline mr-1"/> {langTexts.LOCKED_HINT}</p>}
                    </div>
                </GlassCard>
            </div>
        </div>
      
        <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none">
            <div ref={printRef} className="A4_SIZE_WRAPPER"> 
                {/* Прибрав theme={currentTheme}, бо ми видалили стани теми */}
                <ActiveTemplate formData={{ ...formData, currentLang: currentLang }} />
            </div>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden">
                <div className="relative w-full max-w-4xl h-[90vh] bg-gray-900 rounded-2xl border border-white/10 flex flex-col shadow-2xl">
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gray-800/50 rounded-t-2xl">
                        <h3 className="text-lg font-semibold text-white">{langTexts.PREVIEW_BUTTON}</h3>
                        <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="text-gray-400 hover:text-white" /></button>
                    </div>
                    <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-500/20 flex justify-center">
                        <div className="transform scale-[0.6] md:scale-[0.8] origin-top shadow-2xl">
                             <ActiveTemplate formData={{ ...formData, currentLang: currentLang }} />
                        </div>
                    </div>
                    <div className="p-4 border-t border-white/10 bg-gray-800/50 rounded-b-2xl flex justify-end space-x-4">
                        <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-300 hover:text-white transition-colors">{langTexts.MODAL_CLOSE}</button>
                        {isPaid ? (
                            <button onClick={() => { handleDownloadPDF(); setIsModalOpen(false); }} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-lg transition-all">
                                {langTexts.DOWNLOAD_BUTTON}
                            </button>
                        ) : (
                            <a href={GUMROAD_PRODUCT_URL} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-lg transition-all flex items-center">
                                <ShoppingCart className="mr-2" size={16}/> {langTexts.BUY_BUTTON}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

// === EXPORT DEFAULT ===
export default function ResumeBuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white bg-[#0f172a]">Завантаження...</div>}>
      <ResumeBuilderContent />
    </Suspense>
  );
}