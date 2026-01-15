import React from 'react';
import { Platform } from '../types';

interface PlatformSelectorProps {
  selected: Platform;
  onChange: (p: Platform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <button
        onClick={() => onChange(Platform.INSTAGRAM)}
        className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
          selected === Platform.INSTAGRAM
            ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm'
            : 'border-gray-200 bg-white text-gray-500 hover:border-pink-200'
        }`}
      >
        <span className="text-2xl mb-1">📸</span>
        <span className="font-semibold text-sm">Instagram</span>
        {selected === Platform.INSTAGRAM && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
        )}
      </button>

      <button
        onClick={() => onChange(Platform.XIAOHONGSHU)}
        className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
          selected === Platform.XIAOHONGSHU
            ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
            : 'border-gray-200 bg-white text-gray-500 hover:border-red-200'
        }`}
      >
        <span className="text-2xl mb-1">📕</span>
        <span className="font-semibold text-sm">Xiaohongshu</span>
        {selected === Platform.XIAOHONGSHU && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>
    </div>
  );
};
