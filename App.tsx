import React, { useState, useMemo, useEffect, useRef } from 'react';
import EmergencyBar from './components/EmergencyBar.tsx';
import { PROCEDURES, EMERGENCY_NUMBERS, UI_TRANSLATIONS } from './constants.tsx';
import { Procedure, Language } from './types.ts';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('firstAid_darkMode');
    return saved === null ? true : saved === 'true';
  });

  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('firstAid_lang');
    return (saved as Language) || 'he';
  });

  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>(() => {
    return (localStorage.getItem('firstAid_fontSize') as any) || 'base';
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'procedures' | 'emergency'>('procedures');
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const ui = UI_TRANSLATIONS[lang];
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('firstAid_darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('firstAid_fontSize', fontSize);
    localStorage.setItem('firstAid_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [fontSize, lang, dir]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const filteredProcedures = useMemo(() => {
    const list = PROCEDURES[lang] || PROCEDURES['he'];
    return list.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, lang]);

  const filteredNumbers = useMemo(() => {
    const list = EMERGENCY_NUMBERS[lang] || EMERGENCY_NUMBERS['en'];
    return list.filter(n => 
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      n.number.includes(searchTerm)
    );
  }, [searchTerm, lang]);

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    if (data) setSearchTerm(data);
  };

  const exportData = () => {
    const data = activeTab === 'procedures' ? filteredProcedures : filteredNumbers;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `first_aid_export.json`;
    link.click();
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-sm sm:text-base';
    if (fontSize === 'lg') return 'text-xl sm:text-3xl';
    return 'text-base sm:text-xl';
  };

  return (
    <div className={`min-h-screen pb-20 selection:bg-blue-500/30 ${dir === 'rtl' ? 'text-right font-heebo' : 'text-left'} ${getFontSizeClass()} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
      
      <nav className="fixed top-0 w-full z-50">
        <EmergencyBar label={ui.emergencyCall} />
        <div className="bg-orange-600 dark:bg-orange-900 text-white py-2 px-6 flex justify-between items-center shadow-lg border-b border-orange-500/30">
          <div className="flex items-center gap-2">
            <span className="animate-pulse" aria-hidden="true">🆘</span>
            <span className="font-black text-xs md:text-sm uppercase tracking-tighter">{ui.rescueOrg}</span>
          </div>
          <a href="tel:1221" className="bg-white text-orange-700 px-4 py-1 rounded-full font-black text-sm hover:scale-105 transition-transform">1221</a>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full md:w-auto" role="tablist">
              <button 
                onClick={() => setActiveTab('procedures')}
                role="tab"
                aria-selected={activeTab === 'procedures'}
                className={`flex-1 px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'procedures' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md' : 'opacity-50'}`}
              >
                {ui.tabProcedures}
              </button>
              <button 
                onClick={() => setActiveTab('emergency')}
                role="tab"
                aria-selected={activeTab === 'emergency'}
                className={`flex-1 px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'emergency' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-md' : 'opacity-50'}`}
              >
                {ui.tabNumbers}
              </button>
            </div>

            <div className="relative flex-1 w-full">
              <input
                ref={inputRef}
                type="text"
                list="aid-suggestions"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                placeholder={ui.searchPlaceholder}
                className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 rounded-2xl py-3 px-12 outline-none font-bold transition-all"
              />
              <datalist id="aid-suggestions">
                {PROCEDURES[lang].map(p => <option key={p.id} value={p.title} />)}
              </datalist>
              <span className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-3.5 opacity-30`}>🔍</span>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-3.5 hover:text-blue-500`}>✕</button>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={exportData} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-blue-500 hover:text-white transition-all">📤</button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all">{isDarkMode ? '🌞' : '🌙'}</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-64">
        <div className="mb-10 flex flex-wrap gap-2 justify-center" role="navigation">
          {(['he', 'en', 'zh', 'hi', 'de', 'es', 'fr'] as Language[]).map(l => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-lg font-black text-[10px] uppercase border-2 transition-all ${lang === l ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-800'}`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-live="polite">
          {(activeTab === 'procedures' ? filteredProcedures : filteredNumbers).map((item: any) => {
            const isProc = activeTab === 'procedures';
            const id = isProc ? item.id : item.number;
            const isExpanded = expandedId === id;

            return (
              <article 
                key={id}
                onClick={() => setExpandedId(isExpanded ? null : id)}
                className={`group relative card-glow bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 cursor-pointer overflow-hidden transition-all duration-500 shadow-xl ${isExpanded ? 'col-span-full border-blue-500' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800'}`}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-6xl group-hover:scale-110 transition-transform">{isProc ? item.icon : '📞'}</span>
                    <button onClick={(e) => speak(isProc ? item.title : item.name, e)} className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white">🔊</button>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-2 tracking-tight">{isProc ? item.title : item.name}</h3>
                  <p className="opacity-60 font-bold leading-relaxed">{isProc ? item.shortDesc : item.description}</p>
                  
                  {!isProc && <a href={`tel:${item.number}`} className="text-4xl font-black text-red-600 block mt-6">{item.number}</a>}

                  {isExpanded && isProc && (
                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-10" onClick={e => e.stopPropagation()}>
                      {item.warning && (
                        <div className="bg-red-500/10 text-red-500 p-6 rounded-3xl font-black border-l-8 border-red-500 flex items-center gap-4">
                          <span className="text-3xl">⚠️</span>
                          <span>{item.warning}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <section>
                          <h4 className="text-2xl font-black mb-8 underline decoration-blue-500/30">📋 {ui.stepsTitle}</h4>
                          <ol className="space-y-6">
                            {item.steps.map((step: string, i: number) => (
                              <li key={i} className="flex gap-5 items-start">
                                <span className="bg-blue-600 text-white w-8 h-8 rounded-xl flex items-center justify-center font-black shrink-0 shadow-lg">{i + 1}</span>
                                <p className="font-bold leading-relaxed opacity-90">{step}</p>
                              </li>
                            ))}
                          </ol>
                        </section>

                        <section className="bg-blue-600/5 p-8 rounded-[2.5rem] border border-blue-600/10">
                          <h4 className="text-xl font-black mb-6">✨ {ui.tipsTitle}</h4>
                          <ul className="space-y-4">
                            {item.tips.map((tip: string, i: number) => (
                              <li key={i} className="flex gap-3 items-start">
                                <span className="text-blue-500">✔</span>
                                <p className="font-bold opacity-70 italic">{tip}</p>
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>

                      <button onClick={() => setExpandedId(null)} className="w-full py-5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black">{ui.closeGuide}</button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <div className={`fixed bottom-8 flex flex-col gap-4 ${dir === 'rtl' ? 'left-8' : 'right-8'} z-50`}>
        <div className="flex bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800" role="radiogroup">
          <button onClick={() => setFontSize('sm')} className={`w-12 h-12 rounded-xl font-black transition-all ${fontSize === 'sm' ? 'bg-blue-600 text-white' : ''}`}>S</button>
          <button onClick={() => setFontSize('base')} className={`w-12 h-12 rounded-xl font-black transition-all ${fontSize === 'base' ? 'bg-blue-600 text-white' : ''}`}>M</button>
          <button onClick={() => setFontSize('lg')} className={`w-12 h-12 rounded-xl font-black transition-all ${fontSize === 'lg' ? 'bg-blue-600 text-white' : ''}`}>L</button>
        </div>
        <button onClick={scrollToTop} className={`w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all ${showScrollTop ? 'scale-100' : 'scale-0'}`}>▲</button>
      </div>

      <footer className="mt-20 py-32 px-8 border-t border-slate-200 dark:border-slate-800 text-center bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto space-y-12">
          <p className="text-3xl font-black opacity-30 italic">"{ui.footerQuote}"</p>
          <div className="flex flex-col items-center gap-10">
            <div>
              <h4 className="font-black text-2xl text-blue-600 dark:text-blue-400">{ui.footerRights}</h4>
              <p className="text-[10px] opacity-40 font-black tracking-[0.4em] uppercase">Built for emergencies • Offline ready</p>
            </div>
            <a href="mailto:goldnoamai@gmail.com" className="bg-emerald-600 text-white px-10 py-4 rounded-3xl font-black hover:scale-105 transition-all shadow-xl">
              📧 {ui.feedback}: goldnoamai@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;