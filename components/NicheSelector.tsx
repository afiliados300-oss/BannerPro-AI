
import React from 'react';
import { Niche } from '../types';
import { ShoppingBag, Gamepad2, CarFront } from 'lucide-react';

interface NicheSelectorProps {
  active: Niche;
  onChange: (niche: Niche) => void;
}

export const NicheSelector: React.FC<NicheSelectorProps> = ({ active, onChange }) => {
  return (
    <div className="flex bg-gray-200 p-1 rounded-xl shadow-inner mb-8 w-full max-w-2xl mx-auto overflow-hidden">
      <button
        onClick={() => onChange('store')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          active === 'store' 
          ? 'bg-white text-blue-900 shadow-md font-bold' 
          : 'text-gray-500 hover:text-blue-700'
        }`}
      >
        <ShoppingBag size={18} />
        <span className="hidden sm:inline">Lojas</span>
      </button>
      <button
        onClick={() => onChange('gamer')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          active === 'gamer' 
          ? 'bg-black text-fuchsia-500 shadow-md font-bold font-gamer' 
          : 'text-gray-500 hover:text-fuchsia-700'
        }`}
      >
        <Gamepad2 size={18} />
        <span className="hidden sm:inline">Gamer</span>
      </button>
      <button
        onClick={() => onChange('luxury_cars')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          active === 'luxury_cars' 
          ? 'bg-zinc-900 text-amber-500 shadow-md font-bold' 
          : 'text-gray-500 hover:text-amber-700'
        }`}
      >
        <CarFront size={18} />
        <span className="hidden sm:inline">Carros Luxo</span>
      </button>
    </div>
  );
};
