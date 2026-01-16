import React, { useState } from 'react';
import { Header } from './components/Header';
import { PlatformSelector } from './components/PlatformSelector';
import { ResultCard } from './components/ResultCard';
import { SettingsModal } from './components/SettingsModal';
import { generateTrendingTopic, transformContent, generateImage } from './services/geminiService';
import { Platform, TopicCategory, GeneratedPost } from './types';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [platform, setPlatform] = useState<Platform>(Platform.XIAOHONGSHU);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFetchingTopic, setIsFetchingTopic] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [result, setResult] = useState<GeneratedPost | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleGenerateTopic = async (category: TopicCategory) => {
    // Check if API key is set
    const apiKey = localStorage.getItem('gemini_api_key') || import.meta.env.VITE_API_KEY || '';
    if (!apiKey) {
      alert("Please configure your Gemini API key in Settings first.");
      setIsSettingsOpen(true);
      return;
    }
    
    setIsFetchingTopic(true);
    setSourceText(''); // Clear previous
    setResult(null);
    
    try {
      const topic = await generateTrendingTopic(category);
      setSourceText(topic);
    } catch (e: any) {
      const errorMessage = e?.message || "Failed to generate topic.";
      if (errorMessage.includes('API key')) {
        alert("API key is invalid or not set. Please check your settings.");
        setIsSettingsOpen(true);
      } else {
        alert(errorMessage);
      }
    } finally {
      setIsFetchingTopic(false);
    }
  };

  const handleTransform = async () => {
    if (!sourceText.trim()) return;
    
    // Check if API key is set
    const apiKey = localStorage.getItem('gemini_api_key') || import.meta.env.VITE_API_KEY || '';
    if (!apiKey) {
      alert("Please configure your Gemini API key in Settings first.");
      setIsSettingsOpen(true);
      return;
    }
    
    setIsGenerating(true);
    setResult(null);
    
    try {
      const generated = await transformContent(sourceText, platform);
      setResult(generated);
      
      // Automatically generate image if imagePrompt is available
      if (generated.imagePrompt) {
        setIsGeneratingImage(true);
        try {
          const imageUrl = await generateImage(generated.imagePrompt);
          if (imageUrl) {
            setResult({ ...generated, imageUrl });
          }
        } catch (imageError: any) {
          console.error("Image generation failed:", imageError);
          // Don't show error alert for image generation failure, just log it
          // The post is still usable without the image
        } finally {
          setIsGeneratingImage(false);
        }
      }
    } catch (e: any) {
      const errorMessage = e?.message || "Something went wrong with the AI service.";
      if (errorMessage.includes('API key')) {
        alert("API key is invalid or not set. Please check your settings.");
        setIsSettingsOpen(true);
      } else {
        alert(errorMessage + " Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <main className="flex-1 max-w-3xl mx-auto w-full p-4 pb-24">
        
        {/* Intro / Hook */}
        <div className="mb-8 text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Repurpose Content in Seconds
          </h2>
          <p className="text-gray-500">
            Turn Threads topics into viral posts for Instagram & Red Book.
          </p>
        </div>

        {/* Step 1: Input Source */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 mb-6">
           <div className="p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
              <label className="text-sm font-semibold text-gray-700 flex justify-between items-center">
                <span>1. Source Content</span>
                <span className="text-xs font-normal text-gray-400">What's happening?</span>
              </label>
           </div>
           
           <div className="p-4">
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Or fetch a trending topic simulation:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.values(TopicCategory).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleGenerateTopic(cat)}
                      disabled={isFetchingTopic}
                      className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors border border-gray-200 disabled:opacity-50"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Paste a Thread, a tweet, or any random thought here..."
                  className="w-full h-32 p-3 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-shadow"
                  disabled={isFetchingTopic}
                />
                {isFetchingTopic && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-indigo-600 font-medium animate-pulse">
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Hunting for topics...
                    </div>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* Step 2: Choose Platform */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3 px-1">
            2. Choose Target Style
          </label>
          <PlatformSelector selected={platform} onChange={setPlatform} />
        </div>

        {/* Action Button */}
        <button
          onClick={handleTransform}
          disabled={!sourceText || isGenerating}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3
            ${!sourceText || isGenerating 
              ? 'bg-gray-300 cursor-not-allowed shadow-none' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:-translate-y-0.5'
            }`}
        >
          {isGenerating ? (
            <>
              <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Rewriting Magic...</span>
            </>
          ) : (
            <>
              <span>Generate Post</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </>
          )}
        </button>

        {/* Step 3: Result */}
        {result && <ResultCard result={result} platform={platform} isGeneratingImage={isGeneratingImage} />}
        
      </main>
    </div>
  );
}

export default App;
