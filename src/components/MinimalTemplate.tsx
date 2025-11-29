import React from 'react';

export default function MinimalTemplate({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="w-full h-full bg-white p-8 font-serif text-gray-800 min-h-[297mm]">
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-3xl font-medium mb-1">{data.fullName}</h1>
        <p className="text-gray-500 mb-2 uppercase tracking-widest text-sm">{data.position}</p>
        <div className="text-xs text-gray-400 space-x-2 flex justify-center">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data.summary && (
          <div>
            <h3 className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">Profile</h3>
            <p className="text-sm leading-6 text-gray-600">{data.summary}</p>
          </div>
        )}

        {data.skills && (
          <div>
            <h3 className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">Skills</h3>
            <p className="text-sm text-gray-600">{data.skills.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}