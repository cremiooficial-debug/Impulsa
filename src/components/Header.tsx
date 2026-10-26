'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import LoginModal from '@/app/impulsa/components/LoginModal';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full max-w-full z-50 transition-all duration-300 bg-[#030C16]/90 backdrop-blur-xl border-b border-white/10 ${
          scrolled ? 'py-3 shadow-lg' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Corporativo Impulsa (Tamaño ampliado y destacado) */}
          <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #0f294a 0%, #071628 100%)',
                border: '1px solid rgba(255, 143, 28, 0.3)',
              }}
            >
              <AppLogo size={38} className="text-[#FF8F1C]" />
            </div>
            <span
              className="text-white font-black text-lg sm:text-xl tracking-tight"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Impulsa <span style={{ color: '#FF8F1C' }}>UCV</span>
            </span>
          </div>

          {/* Links de navegación — Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: 'Programa', href: '#programa' },
              { label: 'Resultados', href: '#resultados' },
              { label: 'Precios', href: '#precios' },
              { label: 'Preguntas', href: '#preguntas' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-300 hover:text-[#FF8F1C] text-sm font-semibold transition-colors duration-200"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botones de acción (CTA) */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-10 shrink-0">
            {/* Botón Ingresa */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FF8F1C] transition-colors cursor-pointer"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              <Icon name="UserIcon" size={16} className="text-[#FF8F1C] sm:w-[18px] sm:h-[18px]" />
              <span>Ingresa</span>
            </button>

            {/* Botón Inscríbete */}
            <a
              href="#register"
              className="cta-pulse inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)',
                color: '#030C16',
                boxShadow: '0 4px 20px rgba(255, 143, 28, 0.35)',
                letterSpacing: '0.03em',
              }}
            >
              Postulate
              <Icon name="ArrowRightIcon" size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Renderizamos el Modal controlado por el estado del Header */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;