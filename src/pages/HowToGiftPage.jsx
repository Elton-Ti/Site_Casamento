import React from 'react';
import { HowToGift } from '../components/HowToGift';
import { Link } from 'react-router-dom';
import { Gift, ArrowLeft } from 'lucide-react';

export const HowToGiftPage = () => {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-charcoal-600 hover:text-gold-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Página Inicial</span>
        </Link>
      </div>

      <HowToGift />

      <div className="text-center mt-12">
        <Link
          to="/presentes"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold shadow-gold transition-all"
        >
          <Gift className="w-4 h-4" />
          <span>Ir para a Lista de Presentes</span>
        </Link>
      </div>
    </div>
  );
};
