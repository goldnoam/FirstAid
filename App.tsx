import React, { useState, useMemo, useEffect, useRef } from 'react';
import EmergencyBar from './components/EmergencyBar';
import { PROCEDURES, EMERGENCY_NUMBERS, UI_TRANSLATIONS } from './constants';
import { Procedure, Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('firstAid_lang');
    return (saved as Language) || 'he';
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'procedures' | 'emergency'>('procedures');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'urgent' | 'injury' | 'general'>('all');
  const [showToast, setShowToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>(() => {
    return (localStorage.getItem('firstAid_fontSize') as any) || 'base';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('firstAid_darkMode');
    // Default to Dark Theme
    return saved === null ? true : saved === 'true';
  });

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
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('firstAid_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const speak = (text: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'he' ? 'he-IL' : lang;
    window.speechSynthesis.speak(utterance);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-sm';
    if (fontSize === 'lg') return 'text-xl md:text-2xl';
    return 'text-base md:text-lg';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    if (data) setSearchTerm(data);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const exportSearch = () => {
    const results = activeTab === 'procedures' ? filteredProcedures : filteredNumbers;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `first_aid_export_${activeTab}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div 
      className={`min-h-screen pb-24 transition-colors duration-500 ${dir === 'rtl' ? 'text-right' : 'text-left'} ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'} ${getFontSizeClass()}`} 
      dir={dir}
    >
      <div className="sticky top-0 z-50 shadow-md">
        <EmergencyBar label={ui.emergencyCall} />
        <div className="bg-orange-500 text-white py-2 px-6 flex justify-between items-center border-t border-orange-400">
          <div className="flex items-center gap-3">
            <span className="text-xl animate-bounce" role="img" aria-label="emergency">🆘</span>
            <span className="font-bold text-sm md:text-base">{ui.rescueOrg}</span>
          </div>
          <a href="tel:1221" className="bg-white text-orange-600 px-6 py-1 rounded-full font-black text-lg hover:scale-105 transition-all shadow-md">
            1221
          </a>
        </div>
      </div>

      {/* Floating Controls: Theme, Font, Lang */}
      <div className={`fixed bottom-8 z-50 flex flex-col gap-4 ${dir === 'rtl' ? 'left-6' : 'right-6'}`}>
        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-14 h-14 rounded-2xl shadow-2xl border flex items-center justify-center transition-all hover:rotate-12 active:scale-90 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-white border-gray-100 text-slate-700'}`}
          aria-label={ui.themeToggle}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>

        {/* Font Size Switcher */}
        <div className="flex flex-col gap-2 p-2 rounded-2xl bg-white/10 dark:bg-slate-800/80 backdrop-blur-md shadow-xl border border-white/10">
          <button onClick={() => setFontSize('sm')} className={`w-10 h-10 rounded-xl font-black text-xs ${fontSize === 'sm' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'}`}>S</button>
          <button onClick={() => setFontSize('base')} className={`w-10 h-10 rounded-xl font-black text-sm ${fontSize === 'base' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'}`}>M</button>
          <button onClick={() => setFontSize('lg')} className={`w-10 h-10 rounded-xl font-black text-lg ${fontSize === 'lg' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'}`}>L</button>
        </div>
      </div>

      {/* Language Switcher Bar */}
      <div className="bg-white/5 border-b border-white/10 backdrop-blur-md overflow-x-auto no-scrollbar py-2 px-6">
        <div className="max-w-6xl mx-auto flex gap-3">
          {(['he', 'en', 'zh', 'hi', 'de', 'es', 'fr'] as Language[]).map((l) => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-black transition-all ${lang === l ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <header className="pt-16 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none">{ui.mainTitle}</h1>
          <p className="text-xl md:text-3xl opacity-70 font-medium max-w-2xl mx-auto">{ui.mainSubtitle}</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* Search & Tabs Dashboard */}
        <div className="glass p-6 md:p-8 rounded-[3rem] shadow-2xl mb-12 flex flex-col gap-8 border border-white/5">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-2xl w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('procedures')}
                className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-black transition-all ${activeTab === 'procedures' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md scale-105' : 'opacity-50'}`}
              >
                {ui.tabProcedures}
              </button>
              <button 
                onClick={() => setActiveTab('emergency')}
                className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-black transition-all ${activeTab === 'emergency' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-md scale-105' : 'opacity-50'}`}
              >
                {ui.tabNumbers}
              </button>
            </div>

            <div className="relative w-full md:max-w-md">
              <input
                ref={inputRef}
                type="text"
                list="search-autocomplete"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                placeholder={ui.searchPlaceholder}
                className={`w-full h-14 border-2 rounded-2xl px-12 font-bold outline-none transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}
                aria-label="Search"
              />
              <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-4' : 'left-4'} flex items-center text-blue-500 opacity-50`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className={`absolute inset-y-0 ${dir === 'rtl' ? 'left-4' : 'right-4'} flex items-center opacity-40 hover:opacity-100`}>✕</button>
              )}
              <datalist id="search-autocomplete">
                {PROCEDURES[lang].map(p => <option key={p.id} value={p.title} />)}
              </datalist>
            </div>

            <button 
              onClick={exportSearch}
              className="px-6 py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white border-2 border-blue-600/30 rounded-xl font-black transition-all"
              title="Export Search Results"
            >
              📤 Export
            </button>
          </div>

          {activeTab === 'procedures' && (
            <div className="flex flex-wrap gap-3">
              {(['all', 'urgent', 'injury', 'general'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100'}`}
                >
                  {cat === 'all' ? ui.all : cat === 'urgent' ? `🆘 ${ui.urgent}` : cat === 'injury' ? `🩹 ${ui.injury}` : `ℹ️ ${ui.general}`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* List Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'procedures' ? filteredProcedures : filteredNumbers).length > 0 ? (activeTab === 'procedures' ? filteredProcedures : filteredNumbers).map((item) => {
            const isProcedure = activeTab === 'procedures';
            const p = item as Procedure;
            const n = item as any;
            const isExpanded = expandedId === (isProcedure ? p.id : n.number);

            return (
              <div
                key={isProcedure ? p.id : n.number}
                onClick={() => toggleExpand(isProcedure ? p.id : n.number)}
                className={`relative rounded-[2.5rem] overflow-hidden transition-all duration-500 border-2 cursor-pointer shadow-xl ${isExpanded ? 'col-span-full ring-4 ring-blue-500/20' : 'hover:scale-[1.02]'} ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}
              >
                <div className="p-8 flex flex-col items-center text-center gap-6">
                  <div className={`text-7xl transition-transform ${isExpanded ? 'scale-75' : 'group-hover:rotate-6'}`} role="img">
                    {isProcedure ? p.icon : '📞'}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black tracking-tight">{isProcedure ? p.title : n.name}</h3>
                    {!isExpanded && <p className="opacity-60 font-medium line-clamp-2">{isProcedure ? p.shortDesc : n.description}</p>}
                    {!isProcedure && <a href={`tel:${n.number}`} className="text-3xl font-black text-red-500 block">{n.number}</a>}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={(e) => speak(isProcedure ? p.title : n.name, e)}
                      className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                      aria-label={ui.speak}
                    >
                      🔊
                    </button>
                  </div>
                </div>

                {isExpanded && isProcedure && (
                  <div className="p-8 pt-0 space-y-8 animate-slide-up border-t border-slate-700/30 mt-4">
                    {p.warning && <div className="bg-red-500/10 text-red-500 p-6 rounded-2xl font-black text-lg flex items-center gap-4"><span>🆘</span> {p.warning}</div>}
                    
                    <section>
                      <h4 className="text-2xl font-black mb-6 flex items-center gap-3">📋 {ui.stepsTitle}</h4>
                      <ol className="space-y-4">
                        {p.steps.map((s, i) => (
                          <li key={i} className="flex gap-4 items-start">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                            <p className="font-bold leading-relaxed">{s}</p>
                          </li>
                        ))}
                      </ol>
                    </section>

                    <section className="bg-blue-600/5 p-6 rounded-[2rem] border border-blue-600/10">
                      <h4 className="text-xl font-black mb-4 flex items-center gap-3">✨ {ui.tipsTitle}</h4>
                      <ul className="space-y-3">
                        {p.tips.map((tip, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className="text-blue-500">✔</span>
                            <p className="font-medium opacity-80">{tip}</p>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <button className="w-full py-4 glass rounded-2xl font-black text-xl hover:bg-white/5 transition-all">
                      {ui.closeGuide}
                    </button>
                  </div>
                )}
              </div>
            );
          }) : (
            <div className="col-span-full py-32 text-center opacity-40">
              <div className="text-[120px] mb-8">🔎</div>
              <h3 className="text-4xl font-black">{ui.noResults}</h3>
            </div>
          )}
        </div>
      </main>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 z-50 bg-blue-600 text-white p-5 rounded-full shadow-3xl transition-all ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        } ${dir === 'rtl' ? 'left-24' : 'right-24'}`}
        aria-label={ui.scrollToTop}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 15l7-7 7 7" /></svg>
      </button>

      <footer className={`py-32 px-12 mt-20 text-center border-t border-white/10 ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto space-y-12">
          <p className="text-3xl font-black tracking-tight opacity-40 italic">"{ui.footerQuote}"</p>
          <div className="space-y-4">
            <h4 className="text-3xl font-black text-blue-600">{ui.footerRights}</h4>
            <a href="mailto:goldnoamai@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-bold text-xl block hover:underline">
              📧 {ui.feedback}: goldnoamai@gmail.com
            </a>
          </div>
          <div className="pt-10 flex flex-wrap justify-center gap-6 opacity-20 font-black uppercase tracking-widest text-sm">
            <span>Hebrew</span> • <span>English</span> • <span>Chinese</span> • <span>Hindi</span> • <span>German</span> • <span>Spanish</span> • <span>French</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;