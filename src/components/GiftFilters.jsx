import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { GIFT_CATEGORIES } from '../data/gifts';

export const GiftFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  showOnlyAvailable,
  setShowOnlyAvailable,
  totalItems,
  filteredCount
}) => {
  const sortOptions = [
    { value: 'price-asc', label: 'Mais baratos' },
    { value: 'price-desc', label: 'Mais caros' },
    { value: 'name-asc', label: 'Nome A-Z' },
    { value: 'name-desc', label: 'Nome Z-A' },
  ];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSortBy('price-asc');
    setShowOnlyAvailable(false);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'Todos' || showOnlyAvailable;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-cream-200 shadow-soft mb-8">
      
      {/* Search & Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-6">
        
        {/* Search input */}
        <div className="relative flex-1">
          <label htmlFor="search-gift" className="sr-only">
            Buscar presente
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="search-gift"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar presente por nome ou descrição..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-cream-200 bg-cream-50/50 text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all placeholder:text-charcoal-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-charcoal-400 hover:text-charcoal-700"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort dropdown & Availability Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Availability checkbox pill */}
          <button
            type="button"
            onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
              showOnlyAvailable
                ? 'bg-olive-50 border-olive-400 text-olive-800 shadow-sm'
                : 'bg-white border-cream-200 text-charcoal-600 hover:bg-cream-50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${showOnlyAvailable ? 'bg-olive-600' : 'bg-charcoal-300'}`} />
            <span>Apenas Disponíveis</span>
          </button>

          {/* Sort selector */}
          <div className="relative min-w-[170px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-9 pr-8 py-3 rounded-xl border border-cream-200 bg-white text-charcoal-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer appearance-none shadow-sm"
              aria-label="Ordenar por"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-charcoal-400 text-xs">
              ▼
            </div>
          </div>

        </div>
      </div>

      {/* Category Pills (Scrollable horizontally on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2">
        {GIFT_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-charcoal-800 text-white shadow-md'
                  : 'bg-cream-100/70 hover:bg-cream-200 text-charcoal-600'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Results Count & Clear filter button */}
      <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between text-xs text-charcoal-500">
        <span>
          Mostrando <strong className="text-charcoal-800">{filteredCount}</strong> de {totalItems} presentes
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-1 hover:underline"
          >
            <X className="w-3.5 h-3.5" />
            Limpar filtros
          </button>
        )}
      </div>

    </div>
  );
};
