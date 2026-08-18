import React, { useState, useEffect } from 'react';
import { X, Heart, Gift, Copy, Check, Sparkles, Send, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config';
import { formatCurrency } from '../utils/formatters';
import { useGifts } from '../context/GiftContext';
import { useToast } from '../context/ToastContext';

export const GiftModal = ({ gift, isOpen, onClose }) => {
  const { reserveGift } = useGifts();
  const { addToast } = useToast();

  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [confirmedGuestName, setConfirmedGuestName] = useState('');

  // Reset modal state on open/change
  useEffect(() => {
    if (isOpen) {
      setIsConfirmed(false);
      setGuestName('');
      setGuestContact('');
      setGuestMessage('');
      setCopiedPix(false);
    }
  }, [isOpen, gift]);

  if (!isOpen || !gift) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guestName.trim()) {
      addToast('Por favor, informe seu nome.', 'error');
      return;
    }

    if (!guestContact.trim()) {
      addToast('Por favor, informe seu E-mail ou WhatsApp.', 'error');
      return;
    }

    setIsSubmitting(true);

    const isEmail = guestContact.includes('@');
    const guestData = {
      guestName: guestName.trim(),
      guestEmail: isEmail ? guestContact.trim() : null,
      guestPhone: !isEmail ? guestContact.trim() : null,
      guestMessage: guestMessage.trim() || null
    };

    const res = await reserveGift(gift.id, guestData);
    setIsSubmitting(false);

    if (res.success) {
      setConfirmedGuestName(guestName.trim());
      setIsConfirmed(true);
      
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A038', '#5E6D55', '#FAF7EE', '#E9D8A5']
        });
      } catch (err) {
        // Safe fallback if confetti isn't supported
      }
    }
  };

  const handleCopyPix = () => {
    if (navigator.clipboard && weddingConfig.pixKey) {
      navigator.clipboard.writeText(weddingConfig.pixKey);
      setCopiedPix(true);
      addToast('Chave PIX copiada com sucesso!', 'success');
      setTimeout(() => setCopiedPix(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-cream-200 transform transition-all duration-300 animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-modal-title"
      >
        
        {/* Modal Header */}
        <div className="relative bg-gold-gradient-bg p-6 sm:p-8 border-b border-gold-200/60 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal-500 hover:text-charcoal-800 transition-colors shadow-sm"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center mx-auto mb-3 text-gold-600">
            {isConfirmed ? (
              <Sparkles className="w-6 h-6 text-gold-500 animate-pulse" />
            ) : (
              <Heart className="w-6 h-6 fill-gold-500 text-gold-500" />
            )}
          </div>

          <h2 id="gift-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
            {isConfirmed ? "Presente Confirmado! ❤️" : "Que presente especial! ❤️"}
          </h2>
          
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-sm mx-auto">
            {isConfirmed
              ? "Sua escolha foi registrada com muito carinho!"
              : `Você escolheu presentear ${weddingConfig.groomName} & ${weddingConfig.brideName} com:`}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* Gift Summary Box */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200 mb-6">
            <img
              src={gift.image}
              alt={gift.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white shadow-sm flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold text-olive-700 uppercase tracking-wider block">
                {gift.category}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal-900 truncate">
                {gift.name}
              </h4>
              <p className="font-serif text-lg sm:text-xl font-bold text-gold-600 mt-0.5">
                {formatCurrency(gift.price)}
              </p>
            </div>
          </div>

          {/* SUCCESS CONFIRMATION VIEW */}
          {isConfirmed ? (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="p-5 rounded-2xl bg-olive-50 border border-olive-200 text-charcoal-800">
                <p className="font-serif text-lg font-semibold text-olive-900 mb-2">
                  Obrigado, <span className="text-olive-700">{confirmedGuestName}</span>!
                </p>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  Seu presente foi reservado com sucesso. Ficamos muito felizes com seu carinho e presença em nossa vida!
                </p>
              </div>

              {/* PIX Payment Direct Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream-50 border border-cream-200 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                    Pagamento via PIX
                  </span>
                  <span className="text-[11px] text-charcoal-500">
                    {weddingConfig.pixKeyType}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-cream-300 font-mono text-xs text-charcoal-700 break-all">
                  <span className="flex-1 select-all">{weddingConfig.pixKey}</span>
                  <button
                    onClick={handleCopyPix}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0 ${
                      copiedPix
                        ? 'bg-olive-600 text-white'
                        : 'bg-gold-500 hover:bg-gold-600 text-white'
                    }`}
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-charcoal-500 mt-2 text-center">
                  Após realizar o PIX com o valor de <strong>{formatCurrency(gift.price)}</strong>, não é necessário enviar comprovante se tiver preenchido seus dados acima.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-white text-sm font-semibold transition-colors shadow-md"
              >
                Concluir e Fechar
              </button>
            </div>
          ) : (
            /* RESERVATION FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="guest-name" className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Seu Nome Completo *
                </label>
                <input
                  id="guest-name"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ex: Maria da Silva"
                  className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-white text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-charcoal-400"
                />
              </div>

              <div>
                <label htmlFor="guest-contact" className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  E-mail ou WhatsApp *
                </label>
                <input
                  id="guest-contact"
                  type="text"
                  required
                  value={guestContact}
                  onChange={(e) => setGuestContact(e.target.value)}
                  placeholder="Ex: (11) 99999-9999 ou maria@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-white text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-charcoal-400"
                />
              </div>

              <div>
                <label htmlFor="guest-message" className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Mensagem aos Noivos (Opcional)
                </label>
                <textarea
                  id="guest-message"
                  rows="2"
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder="Deixe um recado carinhoso para Elton & Noiva..."
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-charcoal-400 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-cream-300 text-charcoal-600 hover:bg-cream-100 text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-2/3 py-3 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-white text-sm font-semibold shadow-gold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirmando...</span>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Confirmar presente</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
