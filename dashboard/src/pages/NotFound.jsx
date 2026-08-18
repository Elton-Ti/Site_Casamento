import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, ArrowLeft } from 'lucide-react';
import { weddingConfig } from '../config';

export const NotFound = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center text-center">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 sm:p-12 border border-cream-200 shadow-xl animate-fade-in">
        
        <div className="w-20 h-20 rounded-full bg-gold-50 border border-gold-200 text-gold-600 flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 fill-gold-500 text-gold-500" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-olive-700 block mb-2">
          Erro 404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mb-3">
          Página não encontrada
        </h1>

        <p className="text-sm text-charcoal-600 mb-8 max-w-sm mx-auto leading-relaxed">
          O endereço que você tentou acessar não existe ou foi alterado. Retorne à nossa lista para celebrar conosco!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold shadow-gold transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Página Inicial</span>
          </Link>

          <Link
            to="/presentes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-700 text-sm font-semibold transition-colors"
          >
            <span>Ver Presentes</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
