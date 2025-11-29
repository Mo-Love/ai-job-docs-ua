import React from 'react';

interface GlassCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ title, description, children, className = '' }: GlassCardProps) => {
  return (
    <div className={`p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
      <div>{children}</div>
    </div>
  );
};