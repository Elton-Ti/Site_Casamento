import React, { useState, useMemo } from 'react';
import { GiftFilters } from '../components/GiftFilters';
import { GiftGrid } from '../components/GiftGrid';
import { GiftModal } from '../components/GiftModal';
import { useGifts } from '../context/GiftContext';
import { Gift, Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config';

export const Gifts = () => {
  const { gifts, loading } = useGifts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('price-asc');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const [selectedGift, setSelectedGift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtragem e ordenação dos presentes
  const filteredAndSortedGifts = useMemo(() => {
    return gifts
      .filter((gift) => {
        // Filtro por busca (nome ou descrição)
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          query === '' ||
          gift.name.toLowerCase().includes(query) ||
          (gift.description && gift.description.toLowerCase().includes(query));

        // Filtro por categoria
        const matchesCategory =
          selectedCategory === 'Todos' || gift.category === selectedCategory;

        // Filtro por disponibilidade
        const matchesAvailability = showOnlyAvailable ? gift.available : true;

        return matchesQuery && matchesCategory && matchesAvailability;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return Number(a.price) - Number(b.price);
          case 'price-desc':
            return Number(b.price) - Number(a.price);
          case 'name-asc':
            return a.name.localeCompare(b.name, 'pt-BR');
          case 'name-desc':
            return b.name.localeCompare(a.name, 'pt-BR');
          default:
            return 0;
        }
      });
  }, [gifts, searchQuery, selectedCategory, sortBy, showOnlyAvailable]);

  const handleSelectGift = (gift) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSortBy('price-asc');
    setShowOnlyAvailable(false);
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>{weddingConfig.groomName} & {weddingConfig.brideName}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-charcoal-900 mb-4 tracking-tight">
            Lista de Presentes
          </h1>

          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Fique à vontade para escolher o presente que mais gostar. Cada item nos ajudará a montar nosso novo lar com muito carinho!
          </p>
        </div>

        {/* Filters and Controls */}
        <GiftFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showOnlyAvailable={showOnlyAvailable}
          setShowOnlyAvailable={setShowOnlyAvailable}
          totalItems={gifts.length}
          filteredCount={filteredAndSortedGifts.length}
        />

        {/* Gifts Grid */}
        <GiftGrid
          gifts={filteredAndSortedGifts}
          loading={loading}
          onSelectGift={handleSelectGift}
          onResetFilters={handleResetFilters}
        />

      </div>

      {/* Reservation Modal */}
      <GiftModal
        gift={selectedGift}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
