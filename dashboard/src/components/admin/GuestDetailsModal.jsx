import React from 'react';
import { X, User, Mail, Phone, Calendar, MessageSquare, Heart, Gift } from 'lucide-react';
import { formatDate, formatPhoneNumber, formatCurrency } from '../../utils/formatters';

export const GuestDetailsModal = ({ isOpen, onClose, gift }) => {
  if (!isOpen || !gift) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-cream-200 animate-fade-in-up">
        
        {/* Header */}
        <div className="p-6 bg-gold-gradient-bg border-b border-gold-200/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold-600 shadow-sm">
              <Heart className="w-5 h-5 fill-gold-500 text-gold-500" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900">
                Detalhes da Reserva
              </h3>
              <p className="text-[11px] text-charcoal-600">Informações enviadas pelo convidado</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white text-charcoal-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-charcoal-700">
          
          {/* Gift Info */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-cream-50 border border-cream-200">
            <img
              src={gift.image}
              alt={gift.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <h4 className="font-bold text-charcoal-900 truncate">{gift.name}</h4>
              <p className="text-gold-600 font-bold font-serif">{formatCurrency(gift.price)}</p>
            </div>
          </div>

          {/* Guest Name */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-cream-200">
            <User className="w-4 h-4 text-gold-600 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
                Nome do Convidado
              </span>
              <span className="font-semibold text-charcoal-900 text-sm">
                {gift.reservedBy || 'Não informado'}
              </span>
            </div>
          </div>

          {/* Contact (Email / WhatsApp) */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-cream-200">
            {gift.guestEmail ? (
              <Mail className="w-4 h-4 text-gold-600 mt-0.5" />
            ) : (
              <Phone className="w-4 h-4 text-olive-600 mt-0.5" />
            )}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
                Contato Informado
              </span>
              <span className="font-semibold text-charcoal-900">
                {gift.guestEmail || formatPhoneNumber(gift.guestPhone) || 'Não informado'}
              </span>
            </div>
          </div>

          {/* Reservation Date */}
          {gift.reservedAt && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-cream-200">
              <Calendar className="w-4 h-4 text-charcoal-500 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
                  Data da Reserva
                </span>
                <span className="text-charcoal-800">
                  {formatDate(gift.reservedAt, true)}
                </span>
              </div>
            </div>
          )}

          {/* Guest Message */}
          {gift.guestMessage && (
            <div className="p-3.5 rounded-xl bg-gold-50/60 border border-gold-200/80">
              <div className="flex items-center gap-1.5 text-gold-800 font-bold text-xs mb-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Mensagem de Carinho:</span>
              </div>
              <p className="text-xs text-charcoal-700 italic leading-relaxed">
                "{gift.guestMessage}"
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-cream-50 border-t border-cream-200 text-right">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-charcoal-900 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
