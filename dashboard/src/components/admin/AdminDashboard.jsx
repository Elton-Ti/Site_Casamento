import React from 'react';
import { Gift, CheckCircle2, Heart, DollarSign, PiggyBank, Plus, RotateCcw } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const AdminDashboard = ({ gifts, onOpenAddModal, onResetDefaults }) => {
  const totalCount = gifts.length;
  const availableCount = gifts.filter((g) => g.available).length;
  const reservedCount = gifts.filter((g) => !g.available).length;

  const totalValue = gifts.reduce((acc, g) => acc + (Number(g.price) || 0), 0);
  const reservedValue = gifts
    .filter((g) => !g.available)
    .reduce((acc, g) => acc + (Number(g.price) || 0), 0);

  const stats = [
    {
      title: 'Total de Presentes',
      value: totalCount,
      icon: Gift,
      color: 'bg-gold-50 text-gold-700 border-gold-200'
    },
    {
      title: 'Disponíveis',
      value: availableCount,
      icon: CheckCircle2,
      color: 'bg-olive-50 text-olive-700 border-olive-200'
    },
    {
      title: 'Reservados',
      value: reservedCount,
      icon: Heart,
      color: 'bg-cream-100 text-charcoal-800 border-cream-300'
    },
    {
      title: 'Valor Total da Lista',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      color: 'bg-gold-50 text-gold-700 border-gold-200'
    },
    {
      title: 'Total Reservado',
      value: formatCurrency(reservedValue),
      icon: PiggyBank,
      color: 'bg-olive-50 text-olive-800 border-olive-200'
    }
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
            Painel Geral
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500">
            Acompanhe em tempo real o status dos presentes e reservas do casamento.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onResetDefaults}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-cream-300 bg-white hover:bg-cream-50 text-charcoal-600 text-xs font-semibold transition-colors shadow-sm"
            title="Restaurar presentes fictícios de exemplo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-white text-xs sm:text-sm font-semibold shadow-gold transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Presente</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-cream-200 shadow-soft flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-400 block truncate">
                  {stat.title}
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 truncate block">
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
