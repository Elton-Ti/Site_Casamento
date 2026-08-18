import React, { useState } from 'react';
import { Gift, CheckCircle, Copy, Check, QrCode, CreditCard, ShieldCheck, HeartHandshake } from 'lucide-react';
import { weddingConfig } from '../config';
import { useToast } from '../context/ToastContext';

export const HowToGift = () => {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  const handleCopyPix = () => {
    if (navigator.clipboard && weddingConfig.pixKey) {
      navigator.clipboard.writeText(weddingConfig.pixKey);
      setCopied(true);
      addToast('Chave PIX copiada!', 'success');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const steps = [
    {
      number: '1',
      title: 'Escolha o Presente',
      description: 'Navegue pela nossa lista de presentes e encontre aquele item ou experiência que você gostaria de nos dar.',
      icon: Gift
    },
    {
      number: '2',
      title: 'Confirme a Escolha',
      description: 'Clique em "Presentear", preencha seu nome e contato para que possamos agradecer com todo carinho.',
      icon: HeartHandshake
    },
    {
      number: '3',
      title: 'Realize o Pagamento',
      description: 'Faça a transferência via PIX diretamente para a chave do casal com o valor correspondente ao presente.',
      icon: CheckCircle
    }
  ];

  return (
    <section id="como-presentear" className="py-16 sm:py-24 bg-cream-100/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-olive-700 block mb-2">
            Guia Rápido
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 mb-4">
            Como Presentear
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            Escolha um presente da nossa lista, informe seu nome e confirme a escolha. É simples, rápido e muito especial para nós!
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft hover:shadow-lg transition-all duration-300 relative group flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-200 text-gold-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="absolute top-6 right-6 font-serif text-3xl font-bold text-cream-300">
                  0{step.number}
                </div>

                <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                  {step.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Payment Methods Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-soft max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2">
              Opções de Pagamento
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Você pode realizar o pagamento via PIX de forma instantânea e segura.
            </p>
          </div>

          {/* PIX Payment Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-50/70 to-cream-50 border border-gold-200/80 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500 text-white flex items-center justify-center shadow-gold-sm">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 text-sm sm:text-base">
                    Pagamento Instantâneo via PIX
                  </h4>
                  <span className="text-xs text-charcoal-500">
                    Tipo: {weddingConfig.pixKeyType}
                  </span>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-olive-700 font-semibold bg-olive-100 px-2.5 py-1 rounded-full">
                  Sem taxas
                </span>
              </div>
            </div>

            {/* PIX Key copy input bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-xl bg-white border border-gold-200">
              <div className="flex-1 px-3 py-2 font-mono text-xs sm:text-sm text-charcoal-800 break-all select-all">
                {weddingConfig.pixKey}
              </div>
              <button
                onClick={handleCopyPix}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                  copied
                    ? 'bg-olive-600 text-white'
                    : 'bg-gold-500 hover:bg-gold-600 text-white shadow-gold-sm'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Chave PIX copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar chave PIX</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-charcoal-500">
              <ShieldCheck className="w-4 h-4 text-olive-600" />
              <span>Favorecido: <strong>{weddingConfig.pixBeneficiaryName}</strong></span>
            </div>
          </div>

          {/* Credit Card / Future Method Placeholder */}
          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between opacity-80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cream-200 text-charcoal-500 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-semibold text-xs sm:text-sm text-charcoal-700">
                  Cartão de Crédito (Parcelado)
                </h5>
                <p className="text-[11px] text-charcoal-500">
                  Em breve disponível com integração de gateway de pagamento
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-400 bg-cream-200 px-2 py-0.5 rounded-full">
              Em breve
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
