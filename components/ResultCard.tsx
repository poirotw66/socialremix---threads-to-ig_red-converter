import React, { useState } from 'react';
import { GeneratedPost, Platform } from '../types';

interface ResultCardProps {
  result: GeneratedPost;
  platform: Platform;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, platform }) => {
  const [copied, setCopied] = useState(false);

  const fullText = `
${result.title ? result.title + '\n\n' : ''}${result.content}

${result.hashtags.map(t => `#${t}`).join(' ')}
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRed = platform === Platform.XIAOHONGSHU;
  const borderColor = isRed ? 'border-red-100' : 'border-pink-100';
  const bgColor = isRed ? 'bg-red-50/30' : 'bg-pink-50/30';
  const accentColor = isRed ? 'text-red-600' : 'text-pink-600';

  return (
    <div className={`mt-8 bg-white rounded-2xl border ${borderColor} shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className={`px-4 py-3 border-b ${borderColor} ${bgColor} flex justify-between items-center`}>
        <h3 className={`font-semibold ${accentColor} flex items-center gap-2`}>
          {isRed ? '📕 Little Red Book Preview' : '📸 Instagram Preview'}
        </h3>
        <button
          onClick={handleCopy}
          className="text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-1 active:scale-95"
        >
          {copied ? (
            <span className="text-green-600">Copied!</span>
          ) : (
            <>
              <span>Copy Text</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            </>
          )}
        </button>
      </div>

      <div className="p-5">
        {result.title && (
          <div className="mb-4 font-bold text-lg text-gray-900 pb-2 border-b border-gray-100">
            {result.title}
          </div>
        )}
        
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-normal text-sm md:text-base">
          {result.content}
        </div>

        <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
          <p className={`text-sm font-medium ${accentColor} mb-2`}>Hashtags:</p>
          <div className="flex flex-wrap gap-2">
            {result.hashtags.map((tag, i) => (
              <span key={i} className="text-blue-500 text-sm hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {result.imagePrompt && (
           <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
             <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               AI Image Prompt Suggestion
             </div>
             <p className="text-gray-600 text-xs italic">
               "{result.imagePrompt}"
             </p>
           </div>
        )}
      </div>
    </div>
  );
};
