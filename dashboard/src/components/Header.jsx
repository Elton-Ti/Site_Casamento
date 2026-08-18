import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, Gift, Sparkles, Shield } from 'lucide-react';
import { weddingConfig } from '../config';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao trocar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Lista de Presentes', path: '/presentes' },
    { name: 'Como Presentear', path: '/como-presentear' },
    { name: 'Sobre o Casamento', path: '/#sobre' },
  ];

  const handleNavClick = (path) => {
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const id = path.replace('/#', '');
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const id = path.replace('/#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-cream-200/60 py-3.5'
          : 'bg-cream-50/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Nome dos Noivos */}
          <Link
            to="/"
            className="group flex items-center gap-2 text-left focus:outline-none"
            aria-label="Página inicial"
          >
            <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 transition-transform group-hover:scale-110">
              <Heart className="w-4 h-4 fill-gold-500 text-gold-500" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-charcoal-900 block leading-tight">
                {weddingConfig.groomName} <span className="text-gold-500 font-script text-2xl font-normal">&</span> {weddingConfig.brideName}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-olive-600 font-semibold block">
                Lista de Presentes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Menu principal">
            {navLinks.map((link) => {
              const isAnchor = link.path.startsWith('/#');
              const isActive = !isAnchor && location.pathname === link.path;

              if (isAnchor) {
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path)}
                    className="text-sm font-medium text-charcoal-600 hover:text-gold-600 transition-colors py-1 relative group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full" />
                  </button>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors py-1 relative group ${
                    isActive
                      ? 'text-gold-600 font-semibold'
                      : 'text-charcoal-600 hover:text-gold-600'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gold-500 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Presentear CTA & Admin Link */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/presentes"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-xs font-semibold uppercase tracking-wider shadow-gold-sm hover:shadow-gold transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Ver Lista</span>
            </Link>

            <Link
              to="/admin"
              className="p-2 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-cream-100 transition-colors"
              title="Painel Administrativo"
              aria-label="Acessar painel administrativo"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/presentes"
              className="p-2 rounded-full bg-gold-100 text-gold-700"
              aria-label="Ver presentes"
            >
              <Gift className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-white/80 text-charcoal-700 hover:text-charcoal-900 border border-cream-200 shadow-sm focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Abrir menu de navegação"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-cream-200 px-6 py-5 shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isAnchor = link.path.startsWith('/#');
              const isActive = !isAnchor && location.pathname === link.path;

              if (isAnchor) {
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path)}
                    className="text-left text-base font-medium text-charcoal-700 hover:text-gold-600 py-1 transition-colors"
                  >
                    {link.name}
                  </button>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-medium py-1 transition-colors ${
                    isActive ? 'text-gold-600 font-semibold' : 'text-charcoal-700 hover:text-gold-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-cream-100 flex flex-col gap-3">
              <Link
                to="/presentes"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gold-500 text-white font-medium text-sm shadow-gold-sm"
              >
                <Gift className="w-4 h-4" />
                <span>Explorar Lista de Presentes</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-cream-300 text-charcoal-600 text-xs font-medium hover:bg-cream-50"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Área dos Noivos (Admin)</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
