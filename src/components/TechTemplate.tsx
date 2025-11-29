import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function TechTemplate({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="w-full h-full bg-white p-8 text-gray-800 font-sans min-h-[297mm]">
      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">{data.fullName}</h1>
        <p className="text-xl text-gray-600 mt-1">{data.position}</p>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {data.email && (
            <div className="flex items-center gap-1">
              <Mail size={14} /> <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1">
              <Phone size={14} /> <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} /> <span>{data.location}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Про мене</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Навички</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}