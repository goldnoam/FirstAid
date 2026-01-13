import React, { useState, useMemo, useEffect } from 'react';
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>(() => {
    return (localStorage.getItem('firstAid_fontSize') as any) || 'base';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('firstAid_darkMode');
    // Dark theme by default
    return saved === null ? true : saved === 'true';
  });

  const ui = UI_TRANSLATIONS[lang];
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('firstAid_darkMode', isDarkMode.toString());
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
      setScrollPosition(window.scrollY);
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

  const handleShare = async (text?: string, title?: string) => {
    const shareData = {
      title: title || ui.mainTitle,
      text: text || ui.mainSubtitle,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'he' ? 'he-IL' : lang;
    window.speechSynthesis.speak(utterance);
  };

  const toggleExpand = (id: string) => {
    const isNowExpanded = expandedId !== id;
    setExpandedId(isNowExpanded ? id : null);
    
    if (isNowExpanded) {
      setTimeout(() => {
        const element = document.getElementById(`procedure-${id}`);
        if (element) {
          const headerOffset = 140;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
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

  return (
    <div 
      className={`min-h-screen pb-20 transition-colors duration-500 ${dir === 'rtl' ? 'text-right' : 'text-left'} ${isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'} ${getFontSizeClass()}`} 
      dir={dir}
    >
      <div className="sticky top-0 z-50 shadow-md">
        <EmergencyBar label={ui.emergencyCall} />
        <div className="bg-orange-500 text-white py-2 px-4 flex justify-between items-center border-t border-orange-400">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-bounce" role="img" aria-label="emergency">🆘</span>
            <span className="font-bold text-sm md:text-base">{ui.rescueOrg}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:1221" className="bg-white text-orange-600 px-4 py-1 rounded-full font-black text-lg hover:bg-orange-50 active:scale-95 transition-all">
              1221
            </a>
          </div>
        </div>
      </div>

      {/* Toolbar: Theme & Font Size */}
      <div className={`fixed bottom-44 z-50 flex flex-col gap-3 ${dir === 'rtl' ? 'left-6' : 'right-6'}`}>
        <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl border border-slate-700/20 flex flex-col gap-2">
          <button onClick={() => setFontSize('sm')} className={`w-10 h-10 rounded-xl font-bold transition-all ${fontSize === 'sm' ? 'bg-blue-600 text-white' : 'dark:text-white hover:bg-slate-700'}`} aria-label="Small font">S</button>
          <button onClick={() => setFontSize('base')} className={`w-10 h-10 rounded-xl font-bold transition-all ${fontSize === 'base' ? 'bg-blue-600 text-white' : 'dark:text-white hover:bg-slate-700'}`} aria-label="Medium font">M</button>
          <button onClick={() => setFontSize('lg')} className={`w-10 h-10 rounded-xl font-bold transition-all ${fontSize === 'lg' ? 'bg-blue-600 text-white' : 'dark:text-white hover:bg-slate-700'}`} aria-label="Large font">L</button>
        </div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-14 h-14 rounded-2xl shadow-2xl border flex items-center justify-center transition-all hover:rotate-12 active:scale-90 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-white border-gray-100 text-slate-700'}`}
          aria-label={ui.themeToggle}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      {/* Language Selector */}
      <div className={`fixed bottom-28 z-50 p-2 flex gap-2 overflow-x-auto max-w-[280px] no-scrollbar bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-2xl border border-slate-700/20 ${dir === 'rtl' ? 'left-20' : 'right-20'}`}>
        {(['he', 'en', 'zh', 'hi', 'de', 'es', 'fr'] as Language[]).map((l) => (
          <button 
            key={l}
            onClick={() => setLang(l)}
            className={`flex-shrink-0 px-4 py-2 rounded-full shadow-lg border active:scale-90 transition-all font-black ${lang === l ? 'bg-blue-600 text-white border-transparent' : 'bg-white dark:bg-slate-700 dark:text-white border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-600'}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <header className={`pt-12 pb-16 px-6 text-center border-b transition-all duration-500 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight">{ui.mainTitle}</h1>
          <p className="text-xl md:text-3xl leading-relaxed max-w-2xl mx-auto opacity-70 font-medium">
            {ui.mainSubtitle}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b pb-8 border-slate-700/20">
          <div className={`flex gap-3 p-1.5 rounded-3xl ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} shadow-inner`}>
            <button 
              onClick={() => setActiveTab('procedures')}
              className={`py-3 px-8 rounded-[1.25rem] font-black whitespace-nowrap transition-all ${activeTab === 'procedures' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
              role="tab"
            >
              {ui.tabProcedures}
            </button>
            <button 
              onClick={() => setActiveTab('emergency')}
              className={`py-3 px-8 rounded-[1.25rem] font-black whitespace-nowrap transition-all ${activeTab === 'emergency' ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
              role="tab"
            >
              {ui.tabNumbers}
            </button>
          </div>

          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              placeholder={activeTab === 'procedures' ? ui.searchPlaceholder : ui.searchNumbersPlaceholder}
              className={`w-full border-2 rounded-[1.5rem] py-5 transition-all shadow-sm font-bold animate-focus-glow outline-none ${dir === 'rtl' ? 'pr-14 pl-12' : 'pl-14 pr-12'} ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-gray-100 text-gray-900 placeholder-gray-400'}`}
              aria-label="Search Input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className={`absolute inset-y-0 flex items-center p-3 opacity-50 hover:opacity-100 active:scale-90 transition-all ${dir === 'rtl' ? 'left-3' : 'right-3'}`}>✕</button>
            )}
            <div className={`absolute inset-y-0 flex items-center pointer-events-none text-blue-600 dark:text-blue-400 ${dir === 'rtl' ? 'right-5' : 'left-5'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        {activeTab === 'procedures' && (
          <div className="flex flex-wrap gap-3 mb-12">
            {(['all', 'urgent', 'injury', 'general'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full font-black text-lg transition-all border-2 active:scale-95 ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 opacity-70 hover:opacity-100 shadow-md hover:border-blue-400'}`}
              >
                {cat === 'all' ? ui.all : cat === 'urgent' ? `🆘 ${ui.urgent}` : cat === 'injury' ? `🩹 ${ui.injury}` : `ℹ️ ${ui.general}`}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {activeTab === 'procedures' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {filteredProcedures.length > 0 ? filteredProcedures.map((p) => {
              const isExpanded = expandedId === p.id;
              const isUrgent = p.category === 'urgent';
              // Subtle parallax factor based on scroll
              const parallaxOffset = isExpanded ? (scrollPosition * 0.04) % 25 : 0;
              
              return (
                <article
                  id={`procedure-${p.id}`}
                  key={p.id}
                  className={`group relative rounded-[3rem] overflow-hidden transition-all duration-500 border-2 ${isExpanded ? 'col-span-full shadow-3xl ring-8 ring-blue-500/5' : 'hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.015]'} ${isUrgent ? 'border-red-500/30' : 'border-blue-500/15'} ${isDarkMode ? 'bg-slate-800/90 backdrop-blur-md' : 'bg-white shadow-xl shadow-slate-200'}`}
                >
                  <div className={`flex flex-col gap-3 p-4 absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} z-10 pointer-events-none transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button onClick={(e) => { e.stopPropagation(); speak(`${p.title}. ${p.shortDesc}`); }} className="p-4 rounded-2xl bg-blue-500 text-white hover:bg-blue-400 transition-all pointer-events-auto active:scale-90 shadow-lg" aria-label={ui.speak}>🔊</button>
                    <button onClick={(e) => { e.stopPropagation(); handleShare(p.shortDesc, p.title); }} className="p-4 rounded-2xl bg-emerald-500 text-white hover:bg-emerald-400 transition-all pointer-events-auto active:scale-90 shadow-lg" aria-label={ui.shareGuide}>🔗</button>
                  </div>

                  <button
                    onClick={() => toggleExpand(p.id)}
                    className={`w-full p-10 flex items-start gap-8 outline-none ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`text-7xl transition-transform shrink-0 ${isExpanded ? 'scale-110' : 'group-hover:scale-125 group-hover:animate-wiggle'}`} role="img">{p.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className={`font-black text-3xl md:text-4xl ${isUrgent ? 'text-red-500' : 'text-blue-500'} tracking-tight group-hover:underline decoration-2 underline-offset-8 transition-all`}>{p.title}</h3>
                        {isUrgent && <span className="animate-pulse bg-red-600 text-white text-[12px] px-3 py-1 rounded-full uppercase font-black tracking-widest">URGENT</span>}
                      </div>
                      <p className={`leading-relaxed text-xl opacity-80 font-medium ${isExpanded ? 'hidden' : ''}`}>{p.shortDesc}</p>
                    </div>
                  </button>

                  <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[10000px] opacity-100 border-t border-slate-700/30' : 'max-h-0 opacity-0'}`}>
                    <div className="p-10 space-y-12">
                      {p.warning && <div className="bg-red-500/15 text-red-500 p-8 rounded-3xl font-black text-xl border-r-8 border-red-500 shadow-inner flex items-center gap-4 animate-wiggle-slow"><span>🆘</span> {p.warning}</div>}
                      
                      {p.visuals && (
                        <div 
                          className="bg-slate-500/5 p-10 rounded-[3rem] border border-slate-500/10 shadow-inner parallax-visual"
                          style={{ transform: `translateY(${parallaxOffset}px)` }}
                        >
                          <h4 className="font-black text-3xl mb-8 flex items-center gap-3">🎨 {p.visuals.title}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {p.visuals.items.map((item, i) => (
                              <div key={i} className="bg-white dark:bg-slate-700/70 p-6 rounded-3xl shadow-lg border border-slate-500/10 flex flex-col items-center justify-center gap-4 group/item hover:scale-105 transition-all text-center">
                                <span className="text-6xl group-hover/item:animate-wiggle">{item.icon || '📍'}</span>
                                <span className="font-black text-xl leading-tight">{item.label}</span>
                                {item.color && <div className="w-full h-3 rounded-full shadow-inner border border-white/10" style={{backgroundColor: item.color}} />}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <section>
                        <h4 className="font-black text-3xl mb-8 flex items-center gap-4"><span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">📋</span> {ui.stepsTitle}</h4>
                        <ol className="space-y-8">
                          {p.steps.map((s, i) => (
                            <li key={i} className="flex gap-8 items-start group/step">
                              <span className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-2xl shadow-xl shadow-blue-500/40 group-hover/step:scale-110 transition-transform">{i + 1}</span>
                              <p className="text-2xl leading-relaxed font-semibold">{s}</p>
                            </li>
                          ))}
                        </ol>
                      </section>

                      <section className="bg-blue-500/5 p-10 rounded-[3rem] border border-blue-500/10 shadow-md">
                        <h4 className="font-black text-2xl mb-8 flex items-center gap-4">✨ {ui.tipsTitle}</h4>
                        <ul className="space-y-6">
                          {p.tips.map((tip, i) => (
                            <li key={i} className="flex gap-5 items-start">
                              <span className="text-blue-500 text-3xl">✔</span>
                              <p className="text-xl font-bold opacity-80 leading-relaxed">{tip}</p>
                            </li>
                          ))}
                        </ul>
                      </section>
                      <button onClick={() => toggleExpand(p.id)} className="w-full py-6 bg-slate-500/20 hover:bg-slate-500/30 rounded-3xl font-black text-2xl transition-all active:scale-95 border-b-4 border-slate-500/40">{ui.closeGuide}</button>
                    </div>
                  </div>
                </article>
              )
            }) : (
              <div className="col-span-full py-32 text-center opacity-40">
                <div className="text-[120px] mb-8">🔎</div>
                <h3 className="text-4xl font-black tracking-tight">{ui.noResults}</h3>
                <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} className="mt-8 text-blue-600 font-black text-2xl hover:underline">{ui.clearSearch}</button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredNumbers.map((n) => (
              <div key={n.number} className={`p-10 rounded-[3rem] border-2 flex justify-between items-center group transition-all hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 active:scale-[0.985] ${isDarkMode ? 'bg-slate-800 border-slate-700 shadow-2xl shadow-black/40' : 'bg-white border-gray-100 shadow-xl'}`}>
                <div>
                  <h3 className="font-black text-3xl mb-2 group-hover:text-red-500 transition-colors tracking-tight">{n.name}</h3>
                  <p className="text-xl opacity-70 font-semibold">{n.description}</p>
                </div>
                <a 
                  href={`tel:${n.number}`} 
                  onClick={() => speak(`${n.name}: ${n.number}`)}
                  className="bg-red-600 text-white px-10 py-6 rounded-3xl font-black text-4xl shadow-xl shadow-red-600/40 active:scale-90 transition-transform flex items-center gap-3 hover:bg-red-500"
                >
                  {n.number}
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 z-50 bg-blue-900 text-white p-6 rounded-full shadow-3xl transition-all duration-300 transform ${dir === 'rtl' ? 'right-10' : 'left-10'} ${
          showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-28 opacity-0 scale-50 pointer-events-none'
        } hover:bg-blue-800 active:scale-90 hover:shadow-blue-500/30`}
        aria-label={ui.scrollToTop}
      >
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 15l7-7 7 7" /></svg>
      </button>

      {showToast && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white px-10 py-5 rounded-full shadow-3xl flex items-center gap-5 animate-toast border-2 border-white/20 backdrop-blur-xl">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
          <span className="font-black text-2xl">{ui.copiedToast}</span>
        </div>
      )}

      <footer className={`py-24 px-8 mt-12 text-center border-t transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-gray-200'}`}>
        <div className="max-w-5xl mx-auto space-y-12">
          <p className="opacity-60 italic text-2xl md:text-3xl leading-relaxed font-medium">{ui.footerQuote}</p>
          <div className="font-black text-3xl tracking-tight text-blue-600 dark:text-blue-400">{ui.footerRights}</div>
          <div className="flex flex-col items-center gap-6 pt-10 border-t border-slate-700/20">
            <a href="mailto:goldnoamai@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-black text-2xl hover:underline transition-all hover:scale-105 active:scale-95 flex items-center gap-3">📧 {ui.feedback}: goldnoamai@gmail.com</a>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-40 font-black text-lg">
              <span>Hebrew</span> <span>English</span> <span>Chinese</span> <span>Hindi</span> <span>German</span> <span>Spanish</span> <span>French</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;