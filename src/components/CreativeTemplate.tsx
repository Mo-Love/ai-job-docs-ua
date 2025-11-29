// файл: src/components/CreativeTemplate.tsx

import React from 'react';

interface CreativeTemplateProps {
    formData: any;
}

const L10N = {
    UA: { CONTACTS: "Контакти", SKILLS: "Навички", EDUCATION: "Освіта", EXPERIENCE: "Досвід", NO_DATA: "Не вказано" },
    EN: { CONTACTS: "Contact", SKILLS: "Skills", EDUCATION: "Education", EXPERIENCE: "Experience", NO_DATA: "Not specified" }
};

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ formData }) => {
    const lang = formData.currentLang === 'EN' ? 'EN' : 'UA';
    const t = L10N[lang];

    return (
        <div 
            className="w-[210mm] h-[297mm] bg-white text-gray-800 flex shadow-2xl"
            style={{ fontFamily: 'Verdana, sans-serif' }}
        >
            {/* --- ЛІВА ЧАСТИНА (ОСНОВНА) 65% --- */}
            <div className="w-[65%] p-10 flex flex-col border-r border-dashed border-indigo-200">
                
                {/* Header Name */}
                <div className="mb-10">
                    <h1 className="text-5xl font-black text-indigo-900 leading-tight mb-2 tracking-tighter">
                        {formData.name || 'Your Name'}
                    </h1>
                    <p className="text-2xl text-indigo-500 font-medium">
                        {formData.role || 'Creative Position'}
                    </p>
                </div>

                {/* Experience */}
                <div className="flex-grow">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                        {t.EXPERIENCE}
                    </h3>
                    <div className="space-y-8">
                        {formData.experiences && formData.experiences.length > 0 ? (
                            formData.experiences.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-xl font-bold text-gray-800">{exp.title}</h4>
                                        <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">{exp.dates}</span>
                                    </div>
                                    <p className="text-md font-medium text-gray-500 mb-3">{exp.company}</p>
                                    
                                    {exp.metrics && (
                                        <p className="text-sm font-bold text-indigo-700 mb-2">
                                            ★ {exp.metrics}
                                        </p>
                                    )}
                                    
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))
                        ) : <p className="text-gray-400 italic">{t.NO_DATA}</p>}
                    </div>
                </div>
            </div>

            {/* --- ПРАВА КОЛОНКА (САЙДБАР) 35% --- */}
            <div className="w-[35%] bg-indigo-900 text-white p-8 flex flex-col">
                
                {/* Photo */}
                <div className="mb-8 flex justify-center">
                    {formData.photoUrl ? (
                        <img src={formData.photoUrl} alt="Profile" className="w-32 h-32 rounded-xl object-cover border-4 border-white/20 shadow-lg"/>
                    ) : (
                        <div className="w-32 h-32 rounded-xl bg-white/10 flex items-center justify-center text-white/20 text-4xl font-bold">
                            {formData.name ? formData.name[0] : 'A'}
                        </div>
                    )}
                </div>

                {/* Contacts */}
                <div className="mb-10">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4 border-b border-indigo-700 pb-2">
                        {t.CONTACTS}
                    </h3>
                    <div className="text-sm space-y-3 font-light text-indigo-100">
                        {formData.email && <div className="break-all">✉️ {formData.email}</div>}
                        {formData.facebook && <div className="break-all">🔗 {formData.facebook}</div>}
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-10">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4 border-b border-indigo-700 pb-2">
                        {t.SKILLS}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills && formData.skills.length > 0 ? (
                            formData.skills.map((skill: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-indigo-800 rounded text-xs font-medium text-indigo-100 border border-indigo-700">
                                    {skill}
                                </span>
                            ))
                        ) : <p className="text-indigo-400 italic">{t.NO_DATA}</p>}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4 border-b border-indigo-700 pb-2">
                        {t.EDUCATION}
                    </h3>
                    <div className="space-y-4">
                        {formData.education?.map((edu: any, i: number) => (
                            <div key={i}>
                                <p className="font-bold text-sm text-white">{edu.degree}</p>
                                <p className="text-xs text-indigo-300 mt-1">{edu.institution}</p>
                                <p className="text-xs text-indigo-400 mt-0.5">{edu.period}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};