import React from 'react';

export const LandingPage: React.FC = () => {
  const scrollToApp = () => {
    // Use pushState to add to browser history
    window.history.pushState(null, '', '#app');
    // Trigger hash change event
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600">
                SocialRemix
              </span>
            </div>
            <button
              onClick={scrollToApp}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Powered by Gemini AI
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Repurpose Content in
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"> Seconds</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
              Turn Threads topics into viral posts for Instagram & Xiaohongshu.
              <br />
              <span className="text-gray-500">AI-powered content transformation at your fingertips.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={scrollToApp}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Start Creating Now
              </button>
              <button
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 cursor-pointer"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">10x</div>
                <div className="text-sm text-gray-600">Faster Creation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                <div className="text-sm text-gray-600">Platforms Supported</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">AI</div>
                <div className="text-sm text-gray-600">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SocialRemix?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to transform your content across platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Transformation</h3>
              <p className="text-gray-600">
                Advanced Gemini AI rewrites your content with platform-specific style, tone, and formatting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Platform Support</h3>
              <p className="text-gray-600">
                Optimize for Instagram's clean aesthetic or Xiaohongshu's engaging style with one click.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Auto Image Generation</h3>
              <p className="text-gray-600">
                Get AI-generated images that match your post's vibe, ready to download and use.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Transform your content in seconds, not hours. No more manual rewriting or formatting.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Hashtags</h3>
              <p className="text-gray-600">
                Automatically generate 10-15 relevant hashtags optimized for each platform's algorithm.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600">
                Your API keys and content stay in your browser. We never store or share your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50/50 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your content in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Paste Your Content</h3>
              <p className="text-gray-600">
                Copy any Threads post, tweet, or text. Or use our trending topic generator to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Platform</h3>
              <p className="text-gray-600">
                Select Instagram for clean, aesthetic posts or Xiaohongshu for engaging, emotional content.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600">
                Receive optimized content with hashtags, formatting, and AI-generated images ready to post.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join content creators who are saving hours every week with SocialRemix
          </p>
          <button
            onClick={scrollToApp}
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Start Creating Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="text-xl font-bold text-white">SocialRemix</span>
            </div>
            <div className="text-sm">
              <p>Powered by Gemini AI • Built with ❤️ for content creators</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
