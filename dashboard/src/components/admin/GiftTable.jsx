import React, { useState } from 'react';
import { Edit2, Trash2, RotateCcw, Eye, Search, CheckCircle2, Heart, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const GiftTable = ({
  gifts,
  onEditGift,
  onDeleteGift,
  onReleaseGift,
  onViewGuest
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredGifts = gifts.filter((gift) => {
    const matchesSearch =
      gift.name.toLowerCase().includes(search.toLowerCase()) ||
      gift.category.toLowerCase().includes(search.toLowerCase()) ||
      (gift.reservedBy && gift.reservedBy.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'available'
        ? gift.available
        : !gift.available;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
      
      {/* Table Filters Header */}
      <div className="p-4 sm:p-6 border-b border-cream-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar por nome, categoria ou convidado..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-cream-200 bg-cream-50/50 text-xs sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-cream-100 p-1 rounded-xl">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'all'
                ? 'bg-white text-charcoal-900 shadow-sm'
                : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            Todos ({gifts.length})
          </button>
          <button
            onClick={() => setStatusFilter('available')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'available'
                ? 'bg-white text-olive-800 shadow-sm'
                : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            Disponíveis ({gifts.filter((g) => g.available).length})
          </button>
          <button
            onClick={() => setStatusFilter('reserved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'reserved'
                ? 'bg-white text-gold-800 shadow-sm'
                : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            Reservados ({gifts.filter((g) => !g.available).length})
          </button>
        </div>
      </div>

      {/* Responsive Table with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-charcoal-700">
          <thead className="bg-cream-50 text-charcoal-600 uppercase text-[11px] font-semibold border-b border-cream-200">
            <tr>
              <th className="px-6 py-4">Presente</th>
              <th className="px-6 py-4">Categoria</th>
              <th className="px-6 py-4">Valor</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Convidado</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {filteredGifts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-charcoal-500">
                  Nenhum presente correspondente aos filtros encontrados.
                </td>
              </tr>
            ) : (
              filteredGifts.map((gift) => (
                <tr key={gift.id} className="hover:bg-cream-50/70 transition-colors">
                  
                  {/* Presente */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className="w-12 h-12 rounded-xl object-cover border border-cream-200 flex-shrink-0"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="min-w-0 max-w-xs">
                        <span className="font-semibold text-charcoal-900 block truncate">
                          {gift.name}
                        </span>
                        <span className="text-[11px] text-charcoal-500 block truncate">
                          {gift.description}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Categoria */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-cream-100 text-charcoal-700 text-xs font-medium border border-cream-200">
                      {gift.category}
                    </span>
                  </td>

                  {/* Valor */}
                  <td className="px-6 py-4 whitespace-nowrap font-serif font-bold text-charcoal-900">
                    {formatCurrency(gift.price)}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {gift.available ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-olive-100 text-olive-800 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-olive-600" />
                        Disponível
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-semibold">
                        <Heart className="w-3.5 h-3.5 fill-gold-600 text-gold-600" />
                        Reservado
                      </span>
                    )}
                  </td>

                  {/* Convidado */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {gift.available ? (
                      <span className="text-charcoal-400 text-xs">—</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="font-semibold text-charcoal-900 block text-xs">
                            {gift.reservedBy}
                          </span>
                          <span className="text-[11px] text-charcoal-500 block">
                            {gift.guestEmail || gift.guestPhone || 'Sem contato'}
                          </span>
                        </div>
                        <button
                          onClick={() => onViewGuest(gift)}
                          className="p-1 rounded-lg text-gold-600 hover:bg-gold-50"
                          title="Ver detalhes do convidado"
                          aria-label="Ver detalhes do convidado"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {/* Se estiver reservado, permite liberar */}
                      {!gift.available && (
                        <button
                          onClick={() => onReleaseGift(gift)}
                          className="p-2 rounded-xl text-olive-700 hover:bg-olive-50 transition-colors"
                          title="Tornar disponível novamente"
                          aria-label={`Tornar ${gift.name} disponível novamente`}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}

                      {/* Editar presente */}
                      <button
                        onClick={() => onEditGift(gift)}
                        className="p-2 rounded-xl text-charcoal-600 hover:bg-cream-100 transition-colors"
                        title="Editar presente"
                        aria-label={`Editar ${gift.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Excluir presente */}
                      <button
                        onClick={() => onDeleteGift(gift)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                        title="Excluir presente"
                        aria-label={`Excluir ${gift.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
