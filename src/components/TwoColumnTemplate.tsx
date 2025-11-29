import React from 'react';

export const TwoColumnTemplate = ({ formData }: { formData: any }) => {
  if (!formData) return null;
  const { name, role, email, phone, location, summary, skills, experiences, education, photoUrl } = formData;

  return (
    <div className="w-full h-full bg-white text-gray-800 flex min-h-[297mm]">
      {/* Ліва колонка */}
      <div className="w-1/3 bg-gray-100 p-6 border-r border-gray-200">
        {photoUrl && <img src={photoUrl} alt={name} className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-md" />}
        
        <div className="mb-6 space-y-2 text-sm text-gray-600">
             {email && <div className="break-all">📧 {email}</div>}
             {phone && <div>📱 {phone}</div>}
             {location && <div>📍 {location}</div>}
        </div>

        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h3 className="uppercase font-bold text-gray-700 border-b border-gray-300 mb-2 pb-1">Навички</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s: string, i: number) => <span key={i} className="bg-white px-2 py-1 rounded shadow-sm text-xs font-semibold">{s}</span>)}
            </div>
          </div>
        )}

        {education && education.length > 0 && (
          <div>
             <h3 className="uppercase font-bold text-gray-700 border-b border-gray-300 mb-2 pb-1">Освіта</h3>
             {education.map((edu: any, i: number) => (
               <div key={i} className="mb-3">
                 <div className="font-bold text-sm">{edu.school}</div>
                 <div className="text-xs text-gray-500">{edu.degree}</div>
                 <div className="text-xs text-gray-400">{edu.year}</div>
               </div>
             ))}
          </div>
        )}
      </div>

      {/* Права колонка */}
      <div className="w-2/3 p-8">
        <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 uppercase tracking-wide">{name}</h1>
            <h2 className="text-xl text-blue-600 font-medium mt-1">{role}</h2>
        </header>

        {summary && (
            <section className="mb-6">
                <h3 className="uppercase font-bold text-gray-700 border-b border-gray-300 mb-3 pb-1">Про мене</h3>
                <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
            </section>
        )}

        {experiences && experiences.length > 0 && (
            <section>
                <h3 className="uppercase font-bold text-gray-700 border-b border-gray-300 mb-4 pb-1">Досвід роботи</h3>
                {experiences.map((exp: any, i: number) => (
                    <div key={i} className="mb-5">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-lg text-gray-800">{exp.role}</h4>
                            <span className="text-sm text-gray-500 font-medium">{exp.duration}</span>
                        </div>
                        <div className="text-blue-600 font-medium text-sm mb-2">{exp.company}</div>
                        <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                ))}
            </section>
        )}
      </div>
    </div>
  );
};