import React, { useState } from 'react';
import { Gift, CheckCircle2, Tag, Sparkles, Heart } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const GiftCard = ({ gift, onSelectGift }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Gift Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-cream-200 animate-pulse" />
        )}
        
        <img
          src={imageError ? fallbackImage : gift.image}
          alt={gift.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-charcoal-700 shadow-sm border border-white/50">
            <Tag className="w-3 h-3 text-gold-500" />
            {gift.category}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {gift.available ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-olive-500/95 text-white shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Disponível
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-charcoal-800/90 text-gold-300 shadow-sm backdrop-blur-sm">
              <Heart className="w-3 h-3 fill-gold-400 text-gold-400" />
              Reservado
            </span>
          )}
        </div>

        {/* Dark overlay if already reserved */}
        {!gift.available && (
          <div className="absolute inset-0 bg-charcoal-900/30 backdrop-blur-[1px] flex items-center justify-center">
            <div className="bg-white/95 px-4 py-2 rounded-xl shadow-lg border border-cream-200 text-center">
              <p className="text-xs font-bold text-charcoal-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-olive-600" />
                Presente reservado ❤️
              </p>
              {gift.reservedBy && (
                <p className="text-[11px] text-charcoal-500 mt-0.5">
                  por {gift.reservedBy}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        
        {/* Name */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 line-clamp-1 mb-2 group-hover:text-gold-600 transition-colors">
          {gift.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-charcoal-600 line-clamp-2 leading-relaxed mb-4 flex-1">
          {gift.description}
        </p>

        {/* Price & Action */}
        <div className="pt-4 border-t border-cream-100 flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-charcoal-400 block font-medium">
              Valor
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
              {formatCurrency(gift.price)}
            </span>
          </div>

          {gift.available ? (
            <button
              onClick={() => onSelectGift(gift)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-white text-xs sm:text-sm font-semibold shadow-gold-sm hover:shadow-gold transition-all duration-200 transform active:scale-95"
              aria-label={`Presentear ${gift.name}`}
            >
              <Gift className="w-4 h-4" />
              <span>Presentear</span>
            </button>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cream-100 text-charcoal-400 text-xs sm:text-sm font-medium cursor-not-allowed border border-cream-200"
            >
              <span>Esgotado</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
