
import React, { useState, useMemo, useEffect, useRef } from 'react';
import EmergencyBar from './components/EmergencyBar';
import { PROCEDURES, EMERGENCY_NUMBERS, UI_TRANSLATIONS } from './constants';
import { Procedure, Language } from './types';

const App: React.FC = () => {
  // Theme state - default to dark
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('firstAid_darkMode');
    return saved === null ? true : saved === 'true';
  });

  // Language state
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('firstAid_lang');
    return (saved as Language) || 'he';
  });

  // Font size state
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>(() => {
    return (localStorage.getItem('firstAid_fontSize') as any) || 'base';
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'procedures' | 'emergency'>('procedures');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'urgent' | 'injury' | 'general'>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const ui = UI_TRANSLATIONS[lang];
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const inputRef = useRef<HTMLInputElement>(null);

  // Apply theme to document
  useEffect(() => {
    localStorage.setItem('firstAid_darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('firstAid_fontSize', fontSize);
    localStorage.setItem('firstAid_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [fontSize, lang, dir]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fix: Added missing scrollToTop function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProcedures = useMemo(() => {
    const list = PROCEDURES[lang] || PROCEDURES['he'];
    return list.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, lang, selectedCategory]);

  const filteredNumbers = useMemo(() => {
    const list = EMERGENCY_NUMBERS[lang] || EMERGENCY_NUMBERS['en'];
    return list.filter(n => 
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      n.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.number.includes(searchTerm)
    );
  }, [searchTerm, lang]);

  // Native TTS functionality - No Gemini required
  const speak = (text: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = { 
      he: 'he-IL', en: 'en-US', zh: 'zh-CN', hi: 'hi-IN', de: 'de-DE', es: 'es-ES', fr: 'fr-FR' 
    };
    utterance.lang = langMap[lang] || 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-sm';
    if (fontSize === 'lg') return 'text-2xl'; // Increased for better readability
    return 'text-base';
  };

  // Drag and drop handler for text
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    if (data) setSearchTerm(data);
  };

  // Export search results
  const exportData = () => {
    const data = activeTab === 'procedures' ? filteredProcedures : filteredNumbers;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `first_aid_${activeTab}_${lang}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'} ${dir === 'rtl' ? 'text-right' : 'text-left'} ${getFontSizeClass()}`}>
      
      {/* Navigation & Emergency Bar */}
      <nav className="fixed top-0 w-full z-50 shadow-xl">
        <EmergencyBar label={ui.emergencyCall} />
        
        <div className="bg-orange-600 dark:bg-orange-800 text-white py-2 px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl animate-pulse" role="img" aria-hidden="true">🆘</span>
            <span className="font-black text-sm uppercase tracking-wider">{ui.rescueOrg}</span>
          </div>
          <button 
            onClick={() => speak("1221")}
            className="flex items-center gap-2"
            aria-label={`Call ${ui.rescueOrg} 1221`}
          >
            <a href="tel:1221" className="bg-white text-orange-600 px-5 py-1 rounded-full font-black hover:scale-105 transition-transform">
              1221
            </a>
          </button>
        </div>

        {/* Search and Filters Dashboard */}
        <div className="bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 p-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            
            {/* Tab Switcher */}
            <div className="flex bg-gray-200 dark:bg-slate-800 p-1 rounded-2xl w-full md:w-auto" role="tablist">
              <button 
                role="tab"
                aria-selected={activeTab === 'procedures'}
                onClick={() => { setActiveTab('procedures'); speak(ui.tabProcedures); }}
                className={`flex-1 px-6 py-2 rounded-xl font-bold transition-all focus:ring-2 focus:ring-blue-500 outline-none ${activeTab === 'procedures' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md' : 'opacity-60 hover:opacity-100'}`}
              >
                {ui.tabProcedures}
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'emergency'}
                onClick={() => { setActiveTab('emergency'); speak(ui.tabNumbers); }}
                className={`flex-1 px-6 py-2 rounded-xl font-bold transition-all focus:ring-2 focus:ring-red-500 outline-none ${activeTab === 'emergency' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-md' : 'opacity-60 hover:opacity-100'}`}
              >
                {ui.tabNumbers}
              </button>
            </div>

            {/* Search Input with Auto-complete and Clear */}
            <div className="relative flex-1 w-full group">
              <input
                ref={inputRef}
                type="text"
                autoComplete="on"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                placeholder={ui.searchPlaceholder}
                className="w-full bg-gray-100 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 rounded-2xl py-3 px-12 outline-none font-bold transition-all placeholder:opacity-50"
                aria-label={ui.searchPlaceholder}
              />
              <span className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-3.5 opacity-40`} aria-hidden="true">🔍</span>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-3.5 opacity-40 hover:opacity-100 p-1`}
                  aria-label={ui.clearSearch}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Utility Controls */}
            <div className="flex gap-2">
              <button 
                onClick={exportData}
                className="p-3 bg-gray-100 dark:bg-slate-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-blue-500"
                title="Export Search Results"
                aria-label="Export Search Results"
              >
                📤
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 bg-gray-100 dark:bg-slate-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-blue-500"
                aria-label={ui.themeToggle}
                title={ui.themeToggle}
              >
                {isDarkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </div>

          {/* Category Quick Filters */}
          {activeTab === 'procedures' && (
            <div className="max-w-6xl mx-auto flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
              {(['all', 'urgent', 'injury', 'general'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full font-bold text-xs border transition-all focus:ring-2 focus:ring-blue-400 outline-none ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-slate-800 border-transparent opacity-60 hover:opacity-100'}`}
                >
                  {ui[cat as keyof typeof ui] || cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 pt-72 pb-24">
        
        {/* Language Selection */}
        <div className="mb-12 flex flex-wrap gap-2 justify-center" role="group" aria-label="Language Switcher">
          {(['he', 'en', 'zh', 'hi', 'de', 'es', 'fr'] as Language[]).map(l => (
            <button 
              key={l}
              onClick={() => { setLang(l); speak(l); }}
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all focus:ring-2 focus:ring-blue-500 outline-none ${lang === l ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 dark:bg-slate-800 opacity-60 hover:opacity-100'}`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'procedures' ? filteredProcedures : filteredNumbers).map((item: any) => {
            const isProc = activeTab === 'procedures';
            const id = isProc ? item.id : item.number;
            const isExpanded = expandedId === id;

            return (
              <article 
                key={id}
                onClick={() => setExpandedId(isExpanded ? null : id)}
                className={`card-transition group relative bg-white dark:bg-slate-800 rounded-[2.5rem] border-2 cursor-pointer shadow-xl overflow-hidden animate-slide-up focus-within:ring-4 focus-within:ring-blue-500 ${isExpanded ? 'col-span-full md:col-span-2 lg:col-span-3 border-blue-500 scale-100' : 'hover:scale-[1.02] border-transparent hover:border-gray-200 dark:hover:border-slate-700'}`}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-6xl group-hover:rotate-6 transition-transform" role="img" aria-hidden="true">{isProc ? item.icon : '📞'}</span>
                    <button 
                      onClick={(e) => speak(isProc ? `${item.title}. ${item.shortDesc}` : `${item.name}. ${item.number}`, e)}
                      className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                      aria-label={`${ui.speak} ${isProc ? item.title : item.name}`}
                    >
                      🔊
                    </button>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-2 tracking-tight">{isProc ? item.title : item.name}</h3>
                  <p className="opacity-70 font-bold leading-relaxed mb-4">{isProc ? item.shortDesc : item.description}</p>
                  
                  {!isProc && (
                    <a href={`tel:${item.number}`} className="text-4xl font-black text-red-600 block mt-4 hover:underline">
                      {item.number}
                    </a>
                  )}

                  {isExpanded && isProc && (
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-700 space-y-10 animate-fade-in">
                      {item.warning && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-6 rounded-3xl font-black border-2 border-red-100 dark:border-red-900/40 flex items-start gap-4">
                          <span className="text-2xl" role="img" aria-label="Warning">⚠️</span>
                          <span>{item.warning}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <section>
                          <h4 className="text-2xl font-black mb-8 flex items-center gap-4">📋 {ui.stepsTitle}</h4>
                          <ol className="space-y-6">
                            {item.steps.map((step: string, i: number) => (
                              <li key={i} className="flex gap-5 items-start">
                                <span className="bg-blue-600 text-white w-8 h-8 rounded-xl flex items-center justify-center font-black shrink-0 shadow-lg">{i + 1}</span>
                                <p className="font-bold leading-relaxed opacity-90">{step}</p>
                              </li>
                            ))}
                          </ol>
                        </section>

                        <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2rem] border-2 border-blue-100 dark:border-blue-900/20">
                          <h4 className="text-xl font-black mb-6 flex items-center gap-3">✨ {ui.tipsTitle}</h4>
                          <ul className="space-y-4">
                            {item.tips.map((tip: string, i: number) => (
                              <li key={i} className="flex gap-3 items-start">
                                <span className="text-blue-500" aria-hidden="true">✔</span>
                                <p className="font-bold opacity-75 italic">{tip}</p>
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>

                      {item.visuals && (
                        <div className="bg-gray-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800">
                          <h4 className="font-black text-xl mb-6">{item.visuals.title}</h4>
                          <div className="flex flex-wrap gap-4">
                            {item.visuals.items.map((v: any, i: number) => (
                              <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:scale-105 transition-transform">
                                <span className="text-2xl" role="img" aria-hidden="true">{v.icon || '📍'}</span>
                                <span className="font-bold text-sm">{v.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={() => setExpandedId(null)}
                        className="w-full py-4 bg-gray-100 dark:bg-slate-700 rounded-2xl font-black hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {ui.closeGuide}
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Persistent Accessibility & Utility FABs */}
      <div className={`fixed bottom-8 flex flex-col gap-4 ${dir === 'rtl' ? 'left-8' : 'right-8'} z-50`}>
        {/* Font Size Selector */}
        <div className="flex bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700" role="group" aria-label={ui.fontSize}>
          <button 
            onClick={() => setFontSize('sm')} 
            className={`w-12 h-12 rounded-xl font-black transition-all ${fontSize === 'sm' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
            aria-label="Small Font"
          >
            S
          </button>
          <button 
            onClick={() => setFontSize('base')} 
            className={`w-12 h-12 rounded-xl font-black transition-all ${fontSize === 'base' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
            aria-label="Medium Font"
          >
            M
          </button>
          <button 
            onClick={() => setFontSize('lg')} 
            className={`w-12 h-12 rounded-xl font-black transition-all ${fontSize === 'lg' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
            aria-label="Large Font"
          >
            L
          </button>
        </div>
        
        {/* Scroll to Top */}
        <button 
          onClick={scrollToTop}
          className={`w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all focus:ring-4 focus:ring-blue-300 outline-none ${showScrollTop ? 'scale-100' : 'scale-0 pointer-events-none'}`}
          aria-label={ui.scrollToTop}
        >
          ▲
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-24 px-8 border-t border-gray-200 dark:border-slate-800 text-center bg-gray-50/50 dark:bg-slate-900/20">
        <div className="max-w-4xl mx-auto space-y-12">
          <p className="text-3xl font-black opacity-30 italic leading-tight">"{ui.footerQuote}"</p>
          
          <div className="flex flex-col items-center gap-8">
            <h4 className="font-black text-2xl text-blue-600 dark:text-blue-400">{ui.footerRights}</h4>
            
            <div className="flex flex-col items-center gap-3">
              <span className="opacity-50 font-bold uppercase tracking-widest text-xs">{ui.feedback}</span>
              <a href="mailto:goldnoamai@gmail.com" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-3xl font-black hover:scale-105 transition-all flex items-center gap-3 shadow-xl focus:ring-4 focus:ring-emerald-300 outline-none">
                <span className="text-xl" role="img" aria-hidden="true">📧</span>
                <span>goldnoamai@gmail.com</span>
              </a>
            </div>

            <div className="pt-8 border-t border-gray-100 dark:border-slate-800 w-full max-w-xs">
              <p className="text-[10px] opacity-30 font-black tracking-[0.5em] uppercase">
                Offline-Ready • Professional Guide • No AI Required
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
