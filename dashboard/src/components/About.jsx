import React from 'react';
import { Heart, Sparkles, Calendar, MapPin } from 'lucide-react';
import { weddingConfig } from '../config';
import { formatDate } from '../utils/formatters';

export const About = () => {
  return (
    <section id="sobre" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Couple Image & Romantic Collage */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main photo */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-cream-100 aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80"
                  alt="Foto dos noivos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent" />
              </div>

              {/* Floating romantic badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl p-4 shadow-xl border border-cream-200 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                  <Heart className="w-5 h-5 fill-gold-500 text-gold-500" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-charcoal-400 font-semibold">
                    Nosso Amor
                  </span>
                  <span className="font-serif text-sm font-bold text-charcoal-900">
                    Rumo ao Altar ✨
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-olive-50 border border-olive-200 text-olive-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-olive-600" />
              <span>Sobre o Casamento</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 tracking-tight mb-6">
              {weddingConfig.storyTitle || "Nossa História"}
            </h2>

            <div className="prose prose-stone text-charcoal-600 space-y-4 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                {weddingConfig.storyText}
              </p>
              <p>
                A nossa história é construída com cada abraço, cada risada e os momentos inesquecíveis que compartilhamos com nossos amigos e familiares. Ter vocês ao nosso lado neste momento torna tudo ainda mais especial.
              </p>
            </div>

            {/* Wedding highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-cream-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-charcoal-800 block">Data Especial</span>
                  <span className="text-xs text-charcoal-500">{formatDate(weddingConfig.weddingDate)}</span>
                </div>
              </div>

              {weddingConfig.weddingLocation && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-olive-50 text-olive-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-charcoal-800 block">Localização</span>
                    <span className="text-xs text-charcoal-500">{weddingConfig.weddingLocation}</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
