import React from 'react';

interface ExecutiveTemplateProps {
    formData: any;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ formData }) => {
    const lang = formData.currentLang === 'EN' ? 'EN' : 'UA';

    return (
        <div 
            className="w-[210mm] h-[297mm] bg-white text-gray-800 shadow-2xl flex flex-col"
            style={{ fontFamily: 'Arial, sans-serif' }}
        >
            {/* HEADER WITH DARK BACKGROUND */}
            <div className="bg-slate-800 text-white p-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-wider mb-1">{formData.name || 'Your Name'}</h1>
                    <p className="text-xl text-blue-300 font-medium">{formData.role || 'Position'}</p>
                </div>
                {formData.photoUrl && (
                    <img src={formData.photoUrl} alt="Profile" className="w-24 h-24 rounded-full border-4 border-slate-600 object-cover"/>
                )}
            </div>

            {/* CONTACTS BAR */}
            <div className="bg-slate-100 p-3 px-10 flex gap-6 text-sm text-slate-700 border-b border-slate-200">
                <span>📧 {formData.email || 'email@example.com'}</span>
                <span>🔗 {formData.facebook || 'facebook.com'}</span>
            </div>

            <div className="p-10 flex-grow">
                {/* EXPERIENCE */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-800 uppercase border-b-2 border-blue-500 inline-block mb-4 pb-1">
                        {lang === 'UA' ? 'Досвід роботи' : 'Experience'}
                    </h3>
                    <div className="space-y-6 border-l-2 border-slate-200 pl-6 ml-2">
                        {formData.experiences?.map((exp: any, i: number) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
                                <div className="flex justify-between mb-1">
                                    <h4 className="font-bold text-lg text-slate-800">{exp.title}</h4>
                                    <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{exp.dates}</span>
                                </div>
                                <p className="text-md font-semibold text-blue-600 mb-2">{exp.company}</p>
                                {exp.metrics && <p className="text-sm font-bold mb-2 text-slate-700 bg-blue-50 p-2 rounded border-l-4 border-blue-400">{exp.metrics}</p>}
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    {/* SKILLS */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 uppercase border-b-2 border-blue-500 inline-block mb-4 pb-1">
                            {lang === 'UA' ? 'Навички' : 'Skills'}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {formData.skills?.map((skill: string, i: number) => (
                                <span key={i} className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* EDUCATION */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 uppercase border-b-2 border-blue-500 inline-block mb-4 pb-1">
                            {lang === 'UA' ? 'Освіта' : 'Education'}
                        </h3>
                        <div className="space-y-4">
                            {formData.education?.map((edu: any, i: number) => (
                                <div key={i}>
                                    <p className="font-bold text-sm">{edu.institution}</p>
                                    <p className="text-sm text-blue-600">{edu.degree}</p>
                                    <p className="text-xs text-slate-500">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};