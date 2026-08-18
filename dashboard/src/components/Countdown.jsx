import React, { useState, useEffect } from 'react';
import { Heart, Clock } from 'lucide-react';
import { weddingConfig } from '../config';

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date(weddingConfig.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (isNaN(targetDate) || difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds }
  ];

  return (
    <section className="py-12 bg-white/60 border-y border-cream-200/60 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="flex items-center justify-center gap-2 mb-3 text-olive-700">
          <Clock className="w-4 h-4" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Contagem Regressiva
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mb-8">
          Contando cada segundo para celebrar com vocês
        </h2>

        {timeLeft.isExpired ? (
          <div className="p-8 rounded-3xl bg-gold-50 border border-gold-200 inline-flex flex-col items-center justify-center animate-fade-in shadow-soft">
            <Heart className="w-10 h-10 text-gold-500 fill-gold-500 mb-3 animate-pulse" />
            <span className="font-serif text-2xl sm:text-4xl text-charcoal-900 font-semibold">
              Chegou o grande dia! ❤️
            </span>
            <p className="text-charcoal-600 text-sm mt-2">
              Hoje celebramos nosso amor e a nova caminhada que se inicia!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-cream-200 shadow-soft hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="font-serif text-3xl sm:text-5xl font-bold text-gold-600 tracking-tight leading-none mb-2">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm font-medium text-charcoal-500 uppercase tracking-wider">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
