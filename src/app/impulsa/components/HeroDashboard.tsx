'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col justify-center pt-24 md:pt-28 pb-12 md:pb-16 px-6 overflow-hidden"
      style={{ background: '#030C16' }}
    >
      {/* CSS para la animación de revelado con degradado inverso */}
      <style jsx>{`
        @keyframes revealGradient {
          0% {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }
          100% {
            -webkit-mask-position: 0% 0;
            mask-position: 0% 0;
          }
        }

        .gradient-reveal-text {
          -webkit-mask-image: linear-gradient(
            90deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 40%,
            rgba(0, 0, 0, 0) 60%,
            rgba(0, 0, 0, 0) 100%
          );
          mask-image: linear-gradient(
            90deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 40%,
            rgba(0, 0, 0, 0) 60%,
            rgba(0, 0, 0, 0) 100%
          );
          -webkit-mask-size: 250% 100%;
          mask-size: 250% 100%;
          animation: revealGradient 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      {/* 1. PATRÓN DE PUNTOS BLANCOS (Dot Matrix Grid) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 2. GRADIENTES DE FONDO EN TONALIDADES AZULES Y NARANJA */}
      <div 
        className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-[140px] z-0"
        style={{ background: 'radial-gradient(circle, #144979 0%, #0B2540 70%, transparent 100%)' }}
      />
      
      <div 
        className="absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[130px] z-0"
        style={{ background: '#00A3E0' }}
      />

      <div 
        className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full pointer-events-none opacity-25 blur-[150px] z-0"
        style={{ background: 'radial-gradient(circle, #FF8F1C 0%, #FF7300 60%, transparent 100%)' }}
      />

      {/* 3. IMAGEN VIBRANTE FUSIONADA A LA DERECHA */}
      <div 
        className="absolute right-0 top-10 w-full lg:w-3/5 h-[650px] pointer-events-none z-0"
        style={{
          maskImage: 'radial-gradient(circle at 60% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 60% 50%, black 30%, transparent 80%)',
          filter: 'saturate(1.3) contrast(1.15) brightness(1.05)',
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80" 
          alt="Estudiantes universitarios" 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(90deg, #030C16 0%, rgba(3, 12, 22, 0.6) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* CONTENIDO PRINCIPAL DEL HERO */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Badge Cohorte */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(20, 73, 121, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 143, 28, 0.4)',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8F1C] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-[#FF8F1C]">
              Primera Cohorte · Enero 18
            </span>
            <span className="text-white/30 text-xs">|</span>
            <span className="text-white/90 text-xs font-semibold">17 cupos disponibles</span>
          </div>
        </div>

        {/* Texto Principal: 3 líneas en blanco + 1 línea en naranja */}
        <div className="max-w-4xl space-y-6">
          <h1
            className="gradient-reveal-text text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight text-white"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Ideas que se mueven, <br />
            sueños que nacen y <br />
            crecen.
            <br />
            <span 
              className="inline-block mt-1" 
              style={{ 
                color: '#FF8F1C',
                filter: 'drop-shadow(0 0 25px rgba(255, 143, 28, 0.3))'
              }}
            >
              ¡Ven e Impulsa tu idea!
            </span>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed text-slate-200 max-w-3xl"
            style={{ fontWeight: 400 }}
          >
            Este programa de formación está diseñado para transformar tus ideas en negocios sólidos, sostenibles y listos para enfrentar al mercado real con la metodología de evaluación de proyectos UCV.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#register"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-extrabold text-base transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)',
                color: '#030C16',
                boxShadow: '0 8px 30px rgba(255, 143, 28, 0.45)',
              }}
            >
              ¡Impulsate!
              <Icon name="ArrowRightIcon" size={18} />
            </a>

            <a
              href="#syllabus"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:bg-white/10 text-white"
              style={{
                background: 'rgba(11, 37, 64, 0.65)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <Icon name="DocumentArrowDownIcon" size={18} className="text-[#FF8F1C]" />
              Descarga Nuestra Guía
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
