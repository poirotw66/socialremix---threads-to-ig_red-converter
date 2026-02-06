import React, { useState, useCallback } from 'react';
import { GeneratedPost, Platform } from '../types';
import { generateImage } from '../services/geminiService';

interface ResultCardProps {
    result: GeneratedPost;
    platform: Platform;
    isGeneratingImage?: boolean;
    onImageGenerated?: (imageUrl: string) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
    result,
    platform,
    isGeneratingImage = false,
    onImageGenerated,
}) => {
    const [copied, setCopied] = useState(false);
    const [isRetryingImage, setIsRetryingImage] = useState(false);
    const [imageError, setImageError] = useState<string | null>(null);

    const fullText = `
${result.title ? result.title + '\n\n' : ''}${result.content}

${result.hashtags.map((t) => `#${t}`).join(' ')}
  `.trim();

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(fullText).catch((err) => {
            console.error('Failed to copy text:', err);
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [fullText]);

    const handleRetryImage = useCallback(async () => {
        if (!result.imagePrompt || !onImageGenerated) return;

        setIsRetryingImage(true);
        setImageError(null);

        try {
            const imageUrl = await generateImage(result.imagePrompt);
            if (imageUrl) {
                onImageGenerated(imageUrl);
            }
        } catch (error: any) {
            setImageError(error?.message || 'Failed to generate image');
        } finally {
            setIsRetryingImage(false);
        }
    }, [result.imagePrompt, onImageGenerated]);

    const isRed = platform === Platform.XIAOHONGSHU;
    const borderColor = isRed ? 'border-red-100' : 'border-pink-100';
    const bgColor = isRed ? 'bg-red-50/30' : 'bg-pink-50/30';
    const accentColor = isRed ? 'text-red-600' : 'text-pink-600';

    return (
        <div
            className={`mt-8 bg-white rounded-2xl border ${borderColor} shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500`}
        >
            <div
                className={`px-4 py-3 border-b ${borderColor} ${bgColor} flex justify-between items-center`}
            >
                <h3 className={`font-semibold ${accentColor} flex items-center gap-2`}>
                    {isRed ? (
                        <>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            Little Red Book Preview
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            Instagram Preview
                        </>
                    )}
                </h3>
                <button
                    onClick={handleCopy}
                    className="text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1 active:scale-95 cursor-pointer"
                    aria-label={copied ? 'Text copied' : 'Copy text to clipboard'}
                >
                    {copied ? (
                        <span className="text-green-600">Copied!</span>
                    ) : (
                        <>
                            <span>Copy Text</span>
                            <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                />
                            </svg>
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

                <div className="whitespace-pre-wrap text-gray-900 leading-relaxed font-normal text-sm md:text-base">
                    {result.content}
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
                    <p className={`text-sm font-medium ${accentColor} mb-2`}>Hashtags:</p>
                    <div className="flex flex-wrap gap-2">
                        {result.hashtags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium px-2 py-1 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                                role="button"
                                tabIndex={0}
                                onClick={() => {
                                    navigator.clipboard.writeText(`#${tag}`).catch((err) => {
                                        console.error('Failed to copy hashtag:', err);
                                    });
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        navigator.clipboard.writeText(`#${tag}`).catch((err) => {
                                            console.error('Failed to copy hashtag:', err);
                                        });
                                    }
                                }}
                                aria-label={`Copy hashtag ${tag}`}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Generated Image */}
                {(result.imageUrl || isGeneratingImage) && (
                    <div className="mt-6">
                        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            Generated Image
                        </div>
                        {isGeneratingImage ? (
                            <div className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
                                <div className="flex flex-col items-center gap-3 text-gray-500">
                                    <svg
                                        className="w-8 h-8 animate-spin text-indigo-600"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <p className="text-sm font-medium text-gray-600">
                                        Generating image...
                                    </p>
                                </div>
                            </div>
                        ) : result.imageUrl ? (
                            <div className="relative w-full rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                                <img
                                    src={result.imageUrl}
                                    alt="Generated content image"
                                    className="w-full h-auto object-contain"
                                    onError={(e) => {
                                        console.error('Failed to load image');
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = result.imageUrl!;
                                            link.download = 'generated-image.png';
                                            link.click();
                                        }}
                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors duration-200 cursor-pointer"
                                        title="Download image"
                                        aria-label="Download generated image"
                                    >
                                        <svg
                                            className="w-4 h-4 text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}

            {/* Image Prompt Suggestion (shown if image generation failed or not available) */}
            {result.imagePrompt && !result.imageUrl && !isGeneratingImage && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wider">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            AI Image Prompt Suggestion
                        </div>
                        {onImageGenerated && (
                            <button
                                onClick={handleRetryImage}
                                disabled={isRetryingImage}
                                className="text-xs font-medium px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                                aria-label="Retry image generation"
                            >
                                {isRetryingImage ? (
                                    <>
                                        <svg
                                            className="w-3 h-3 animate-spin"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                        Retry
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    <p className="text-gray-700 text-xs italic mb-2">"{result.imagePrompt}"</p>
                    {imageError && (
                        <p className="text-red-600 text-xs mt-2">{imageError}</p>
                    )}
                </div>
            )}
      </div>
    </div>
  );
};
