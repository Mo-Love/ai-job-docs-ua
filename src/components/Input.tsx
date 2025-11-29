import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  id: string;
}

export const Input = ({ label, id, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">
        {label}
      </label>
      <input
        id={id}
        className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ${className}`}
        {...props}
      />
    </div>
  );
};