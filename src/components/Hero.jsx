import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Gift, Calendar, Sparkles, MapPin } from 'lucide-react';
import { weddingConfig } from '../config';
import { formatDate } from '../utils/formatters';

export const Hero = () => {
  const formattedDate = formatDate(weddingConfig.weddingDate);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Decorative subtle background shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold-100/50 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-olive-100/50 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Subtitle Pill / Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 border border-gold-200/70 text-gold-700 text-xs sm:text-sm font-medium mb-6 shadow-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>Estamos nos casando!</span>
          <span className="text-gold-300">•</span>
          <span className="font-semibold">Nosso grande dia</span>
        </div>

        {/* Groom & Bride Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal-900 tracking-tight leading-[1.1] mb-6">
          <span className="block">{weddingConfig.groomName}</span>
          <span className="font-script text-5xl sm:text-7xl md:text-8xl text-gold-500 my-1 block">
            &
          </span>
          <span className="block">{weddingConfig.brideName}</span>
        </h1>

        {/* Date & Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium text-charcoal-600 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white shadow-soft border border-cream-200">
            <Calendar className="w-4 h-4 text-olive-600" />
            <span>{formattedDate}</span>
          </div>

          {weddingConfig.weddingLocation && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white shadow-soft border border-cream-200">
              <MapPin className="w-4 h-4 text-gold-600" />
              <span>{weddingConfig.weddingLocation}</span>
            </div>
          )}
        </div>

        {/* Romantic Welcome Paragraph */}
        <p className="text-base sm:text-lg md:text-xl text-charcoal-600 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          {weddingConfig.welcomeText}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/presentes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-medium text-base shadow-gold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Gift className="w-5 h-5" />
            <span>Ver Lista de Presentes</span>
          </Link>

          <Link
            to="/como-presentear"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-cream-100 text-charcoal-700 border border-cream-300 font-medium text-base shadow-soft hover:shadow-md transition-all duration-200"
          >
            <span>Como Presentear</span>
          </Link>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mt-16 text-cream-300">
          <div className="h-[1px] w-16 bg-cream-300" />
          <Heart className="w-4 h-4 text-gold-400 fill-gold-400" />
          <div className="h-[1px] w-16 bg-cream-300" />
        </div>

      </div>
    </section>
  );
};
