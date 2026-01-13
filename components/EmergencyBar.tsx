
import React from 'react';

interface EmergencyBarProps {
  label: string;
}

const EmergencyBar: React.FC<EmergencyBarProps> = ({ label }) => {
  return (
    <div className="sticky top-0 z-50 bg-red-600 text-white py-3 px-4 shadow-lg flex justify-between items-center overflow-hidden" role="banner" aria-label="Emergency Bar">
      <div className="absolute inset-0 bg-white/5 animate-pulse pointer-events-none"></div>
      <div className="flex items-center gap-3 relative z-10">
        <span className="text-3xl animate-pulse hover:scale-125 hover:rotate-12 transition-transform cursor-help" role="img" aria-label="Ambulance">🚑</span>
        <h1 className="font-bold text-lg md:text-xl">{label}</h1>
      </div>
      <a 
        href="tel:101" 
        className="bg-white text-red-600 font-black px-6 py-2 rounded-full text-2xl hover:bg-red-50 transition-all shadow-inner active:scale-90 relative z-10 border-2 border-transparent hover:border-red-200"
        aria-label="Call MADA 101"
      >
        101
      </a>
    </div>
  );
};

export default EmergencyBar;
