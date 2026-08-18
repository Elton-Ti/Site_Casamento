import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Countdown } from '../components/Countdown';
import { GiftCard } from '../components/GiftCard';
import { GiftModal } from '../components/GiftModal';
import { HowToGift } from '../components/HowToGift';
import { About } from '../components/About';
import { useGifts } from '../context/GiftContext';
import { Gift, ArrowRight, Sparkles } from 'lucide-react';

export const Home = () => {
  const { gifts, loading } = useGifts();
  const [selectedGift, setSelectedGift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectGift = (gift) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  // Exibe uma prévia com até 6 presentes em destaque na página inicial
  const featuredGifts = gifts.slice(0, 6);

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Countdown Timer */}
      <Countdown />

      {/* 3. Featured Gifts Section Preview */}
      <section className="py-16 sm:py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Lista de Casamento</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900">
                Presentes em Destaque
              </h2>
              <p className="text-sm sm:text-base text-charcoal-600 mt-2 max-w-xl">
                Selecionamos com muito amor alguns itens para você nos ajudar a construir nosso lar.
              </p>
            </div>

            <Link
              to="/presentes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-700 group transition-colors"
            >
              <span>Ver todos os {gifts.length} presentes</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid of featured gifts */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl h-80 border border-cream-200 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onSelectGift={handleSelectGift}
                />
              ))}
            </div>
          )}

          {/* Bottom CTA to see full list */}
          <div className="mt-12 text-center">
            <Link
              to="/presentes"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-medium text-base shadow-gold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Gift className="w-5 h-5" />
              <span>Explorar Lista Completa de Presentes</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 4. How to Gift Section */}
      <HowToGift />

      {/* 5. About Couple Section */}
      <About />

      {/* Gift Reservation Modal */}
      <GiftModal
        gift={selectedGift}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
