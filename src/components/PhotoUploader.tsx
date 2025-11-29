import React from 'react';
import { Upload, User } from 'lucide-react';

interface PhotoUploaderProps {
  photoUrl: string | null;
  onUpload: (url: string | null) => void;
}

export const PhotoUploader = ({ photoUrl, onUpload }: PhotoUploaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
        {photoUrl ? (
          <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <User className="text-gray-400" />
        )}
      </div>
      <div>
        <label className="cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm text-white transition-colors flex items-center gap-2">
          <Upload size={16} /> Завантажити фото
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
        {photoUrl && (
          <button onClick={() => onUpload(null)} className="ml-2 text-xs text-red-400 hover:text-red-300">
            Видалити
          </button>
        )}
      </div>
    </div>
  );
};