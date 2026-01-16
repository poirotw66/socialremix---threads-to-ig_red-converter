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
        className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
          selected === Platform.INSTAGRAM
            ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm hover:shadow-md'
            : 'border-gray-200 bg-white text-gray-600 hover:border-pink-200 hover:bg-pink-50/50'
        }`}
        aria-label="Select Instagram platform"
        aria-pressed={selected === Platform.INSTAGRAM}
      >
        <svg 
          className={`w-8 h-8 mb-2 ${selected === Platform.INSTAGRAM ? 'text-pink-600' : 'text-gray-400'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="font-semibold text-sm">Instagram</span>
        {selected === Platform.INSTAGRAM && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full animate-pulse" aria-hidden="true" />
        )}
      </button>

      <button
        onClick={() => onChange(Platform.XIAOHONGSHU)}
        className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
          selected === Platform.XIAOHONGSHU
            ? 'border-red-500 bg-red-50 text-red-700 shadow-sm hover:shadow-md'
            : 'border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50/50'
        }`}
        aria-label="Select Xiaohongshu platform"
        aria-pressed={selected === Platform.XIAOHONGSHU}
      >
        <svg 
          className={`w-8 h-8 mb-2 ${selected === Platform.XIAOHONGSHU ? 'text-red-600' : 'text-gray-400'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span className="font-semibold text-sm">Xiaohongshu</span>
        {selected === Platform.XIAOHONGSHU && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
