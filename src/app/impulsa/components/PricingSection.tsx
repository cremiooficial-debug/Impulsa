'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const fundingOptions = [
  {
    id: 'self-pay',
    title: 'Plan Básico',
    price: '$10',
    priceNote: 'Suscripción Mensual',
    badge: null,
    description: 'Acceso fundamental al programa para estudiantes y emprendedores en etapa inicial.',
    features: [
      'Acceso a 1 Foro temático',
      'Acceso a 4 talleres estudiantiles',
      'Invitación al Festival (Cuota extra)',
      'Certificado digital de participación',
    ],
    cta: 'Impulsa tu idea',
    highlight: false,
  },
  {
    id: 'installment',
    title: 'Plan Avanzado',
    price: '$50',
    priceNote: 'Suscripción Mensual',
    badge: 'Más Popular',
    description: 'La experiencia completa para impulsar tu proyecto con acompañamiento directo.',
    features: [
      'Todo lo incluido en el plan básico',
      'Entrada al Festival (Gratis)',
      '1h de mentoría con un especialista',
      'Certificado Evaluativo Oficial',
      'Asistencia para financiamiento',
    ],
    cta: 'Impulsa tu proyecto',
    highlight: true,
  },
  {
    id: 'box-sponsored',
    title: 'Plan Equipo',
    price: '$150',
    priceNote: 'Suscripción Mensual',
    badge: 'Empresas',
    description: 'Para equipos de emprendimiento o instituciones que buscan aceleración prioritaria.',
    features: [
      'Todo lo incluido en el plan avanzado',
      'Válido para 4 personas',
      'Hasta 3h con especialistas de tu elección',
      'Estudios y tendencias de mercado',
      'Boletín informativo semanal exclusivo',
    ],
    cta: 'Impulsa tu equipo',
    highlight: false,
  },
];

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-up');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="precios"
      ref={sectionRef}
      className="py-24 px-6 bg-[#030C16] border-t border-white/5 relative overflow-hidden"
    >
      {/* Luz ambiental de fondo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#144979]/20 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Encabezado */}
        <div className="mb-14 text-center md:text-left reveal-up">
          <div
            className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full border border-[#FF8F1C]/20 bg-[#FF8F1C]/10"
          >
            <Icon name="BanknotesIcon" size={14} className="text-[#FF8F1C]" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF8F1C]">
              Opciones de Inversión
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight mb-4 text-white tracking-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Tres planes para <span className="text-[#FF8F1C]">impulsar tu proyecto.</span>
          </h2>
          <p className="text-base max-w-xl text-slate-400 font-normal">
            Elige la modalidad que mejor se adapte a tus metas académicas y empresariales en Impulsa UCV.
          </p>
        </div>

        {/* Tarjetas de Precios */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {fundingOptions.map((option, i) => (
            <div
              key={option.id}
              className={`rounded-2xl p-8 reveal-up transition-all duration-300 flex flex-col justify-between ${
                option.highlight ? 'md:-translate-y-2' : ''
              }`}
              style={{
                background: option.highlight
                  ? 'linear-gradient(160deg, #144979 0%, #0B2540 100%)'
                  : 'rgba(255, 255, 255, 0.03)',
                border: option.highlight
                  ? '1px solid rgba(255, 143, 28, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: option.highlight
                  ? '0 20px 50px rgba(255, 143, 28, 0.15)'
                  : '0 4px 20px rgba(0, 0, 0, 0.2)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div>
                {/* Insignia / Badge */}
                <div className="min-h-[28px] mb-4">
                  {option.badge && (
                    <span
                      className="text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block"
                      style={{
                        background: option.highlight ? '#FF8F1C' : 'rgba(255, 143, 28, 0.15)',
                        color: option.highlight ? '#030C16' : '#FF8F1C',
                      }}
                    >
                      {option.badge}
                    </span>
                  )}
                </div>

                {/* Precio y Nombre */}
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tracking-tight">
                    {option.price}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    / mes
                  </span>
                </div>
                <div className="text-xs font-semibold mb-3 text-slate-400">
                  {option.priceNote}
                </div>
                
                <h3 className="text-xl font-extrabold text-white mb-3">
                  {option.title}
                </h3>

                <p className="text-sm leading-relaxed mb-6 text-slate-300">
                  {option.description}
                </p>

                {/* Lista de características */}
                <div
                  className="space-y-3 mb-8 pb-6 border-b"
                  style={{
                    borderColor: option.highlight
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {option.features.map((feat, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center mt-0.5 shrink-0"
                        style={{
                          background: option.highlight
                            ? '#FF8F1C' :'rgba(255, 143, 28, 0.15)',
                        }}
                      >
                        <Icon
                          name="CheckIcon"
                          size={11}
                          className={option.highlight ? 'text-[#030C16]' : 'text-[#FF8F1C]'}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-200">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón CTA */}
              <a
                href="#register"
                className="block w-full text-center py-3.5 rounded-xl font-extrabold text-sm transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: option.highlight
                    ? 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)'
                    : 'rgba(255, 255, 255, 0.08)',
                  color: option.highlight ? '#030C16' : '#FFFFFF',
                  boxShadow: option.highlight
                    ? '0 4px 20px rgba(255, 143, 28, 0.3)'
                    : 'none',
                  border: option.highlight ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {option.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Garantía */}
        <div
          className="mt-12 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 reveal-up"
          style={{
            background: 'rgba(20, 73, 121, 0.2)',
            border: '1px solid rgba(255, 143, 28, 0.2)',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #144979 0%, #0B2540 100%)',
              border: '1px solid rgba(255, 143, 28, 0.3)',
            }}
          >
            <Icon name="ShieldCheckIcon" size={24} className="text-[#FF8F1C]" />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-white mb-1">
              Garantía de Satisfacción de 7 Días
            </h4>
            <p className="text-sm text-slate-300">
              Si completas la primera semana y consideras que Impulsa UCV no cumple con tus expectativas, te reembolsamos el 100% de tu pago sin complicaciones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
