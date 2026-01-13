
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiAdvice } from '../services/gemini';

interface GeminiAssistantProps {
  isDarkMode: boolean;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when messages update
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await getGeminiAdvice(userMessage);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse || 'מצטער, לא הצלחתי למצוא תשובה מדויקת. אנא פנה למוקד 101.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'אירעה שגיאה בתקשורת. במקרה חירום התקשר מייד ל-101.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-32 left-8 z-[100]" dir="rtl">
      {isOpen && (
        <div className={`flex flex-col w-80 md:w-96 h-[500px] mb-4 rounded-3xl shadow-2xl overflow-hidden border-2 transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-blue-100'}`}>
          <div className={`p-4 font-black flex justify-between items-center ${isDarkMode ? 'bg-slate-700 text-blue-300' : 'bg-blue-600 text-white'}`}>
            <div className="flex items-center gap-2">
              <span className="text-xl animate-pulse">🤖</span>
              <span>עוזר עזרה ראשונה AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl hover:scale-125 transition-transform" aria-label="סגור צ'אט">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-right">
            {messages.length === 0 && (
              <div className={`text-center mt-10 p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 text-slate-400' : 'bg-blue-50 text-blue-800'}`}>
                <p className="font-bold text-lg">שלום! איך אוכל לעזור?</p>
                <p className="text-sm mt-3 leading-relaxed">שאל אותי שאלות כמו: "איך עושים החייאה?", "מה עושים עם כוויה?" או "איך עוצרים דימום?"</p>
                <div className="mt-4 text-xs font-bold text-red-500 underline animate-pulse">במקרה חירום - התקשר 101!</div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-base font-medium leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? (isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-600 text-white rounded-br-none') 
                    : (isDarkMode ? 'bg-slate-700 text-slate-200 rounded-bl-none' : 'bg-gray-100 text-gray-800 rounded-bl-none')
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className={`p-4 border-t ${isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-100 bg-gray-50'}`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="שאל שאלה..."
                className={`flex-1 px-4 py-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-gray-300 text-gray-900'}`}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className={`px-5 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}`}
              >
                שלח
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-20 h-20 rounded-full shadow-2xl flex items-center justify-center text-4xl transition-all transform hover:scale-110 active:scale-90 relative ${
          isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        aria-label={isOpen ? "סגור עוזר AI" : "פתח עוזר AI"}
      >
        <span className={isOpen ? 'animate-none' : 'animate-bounce'}>{isOpen ? '✕' : '🤖'}</span>
        {!isOpen && <span className="absolute -top-1 -right-1 flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-500 border-2 border-white"></span>
        </span>}
      </button>
    </div>
  );
};

export default GeminiAssistant;
