import React from 'react';
import { GiftCard } from './GiftCard';
import { Gift, SearchX, Sparkles } from 'lucide-react';

export const GiftGrid = ({ gifts, loading, onSelectGift, onResetFilters }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div
            key={n}
            className="bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-soft animate-pulse flex flex-col h-[400px]"
          >
            <div className="aspect-[4/3] bg-cream-200" />
            <div className="p-5 flex flex-col flex-1 gap-3">
              <div className="h-5 bg-cream-200 rounded w-3/4" />
              <div className="h-4 bg-cream-100 rounded w-full" />
              <div className="h-4 bg-cream-100 rounded w-2/3" />
              <div className="mt-auto pt-4 border-t border-cream-100 flex justify-between items-center">
                <div className="h-6 bg-cream-200 rounded w-1/3" />
                <div className="h-9 bg-cream-200 rounded-xl w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (gifts.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-cream-200 shadow-soft max-w-lg mx-auto animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-4 text-gold-600">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
          Nenhum presente encontrado
        </h3>
        <p className="text-sm text-charcoal-600 mb-6">
          Tente ajustar sua busca ou selecionar outra categoria para ver mais opções.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold shadow-gold-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ver Todos os Presentes</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {gifts.map((gift) => (
        <GiftCard
          key={gift.id}
          gift={gift}
          onSelectGift={onSelectGift}
        />
      ))}
    </div>
  );
};
