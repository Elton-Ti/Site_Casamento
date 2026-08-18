import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config';

export const Footer = () => {
  return (
    <footer className="bg-charcoal-900 text-cream-100 pt-16 pb-12 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Couple Branding */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-charcoal-800 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Heart className="w-4 h-4 fill-gold-400 text-gold-400" />
          </div>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-white mb-2">
          {weddingConfig.groomName} <span className="font-script text-3xl sm:text-4xl text-gold-400 font-normal">&</span> {weddingConfig.brideName}
        </h3>

        <p className="text-xs sm:text-sm text-cream-300/80 max-w-md mx-auto mb-8 font-light">
          Feito com ❤️ para o nosso grande dia. Agradecemos imensamente por todo amor e carinho recebido.
        </p>

        {/* Quick Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-cream-300/70 mb-10" aria-label="Rodapé">
          <Link to="/" className="hover:text-gold-400 transition-colors">
            Início
          </Link>
          <Link to="/presentes" className="hover:text-gold-400 transition-colors">
            Lista de Presentes
          </Link>
          <Link to="/como-presentear" className="hover:text-gold-400 transition-colors">
            Como Presentear
          </Link>
          <Link to="/admin" className="hover:text-gold-400 transition-colors flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Painel dos Noivos</span>
          </Link>
        </nav>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 border-t border-charcoal-800 text-[11px] text-cream-300/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {weddingConfig.groomName} & {weddingConfig.brideName}. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Celebrando o Amor</span>
            <Sparkles className="w-3 h-3 text-gold-400" />
          </p>
        </div>

      </div>
    </footer>
  );
};
