import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white/90 hover:bg-gold-500 text-charcoal-700 hover:text-white border border-cream-300 shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-110 active:scale-95 animate-fade-in"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};
