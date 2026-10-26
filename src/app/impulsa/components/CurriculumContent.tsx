'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface StepSection {
  id: string;
  stepId: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  videoThumb: string;
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
  };
}

const stepSections: StepSection[] = [
  {
    id: 'step-application',
    stepId: 'application',
    number: '01',
    title: 'Plasmando la idea',
    subtitle: 'Mente al Papel',
    description:
      'Esta primera etapa está diseñada para llevar tu proyecto del pensamiento a la acción estructurando cuatro pilares fundamentales. Dominar estos pasos es crucial porque no solo transforman una visión abstracta en un concepto claro y ejecutable, sino que minimizan el riesgo de emprender a ciegas.',
    highlights: [
      'Identificación del problema',
      'Posibles soluciones',
      'Cliente ideal',
      'Ventajas competitivas',
    ],
    videoThumb:
      '/assets/images/Curriculo01.png',
  },
  {
    id: 'step-foundations',
    stepId: 'foundations',
    number: '02',
    title: 'Formulación Técnica',
    subtitle: 'Papel al Plano',
    description:
      'Con la segunda etapa, nos enfocamos en llevar tu proyecto de una fase conceptual a crear los "planos" que permitirán una ejecución real, evaluando la viabilidad técnica, normativa y operativa de tu negocio.',
    highlights: [
      'Permisología legal',
      'Ubicación geográfica y Logística',
      'Infraestructura física',
      'Descripción del proceso productivo',
      'Capacidad instalada y utilizada',
      'Ética y sustentabilidad',
    ],
    videoThumb:
      '/assets/images/Curriculo02.png',
  },
  {
    id: 'step-movement',
    stepId: 'movement',
    number: '03',
    title: 'Formulación Comercial',
    subtitle: 'Plano al Mercado',
    description:
      'En esta tercera etapa estaremos enfocados en validar la viabilidad comercial y el alcance real de tu proyecto en un entorno competitivo. Definirás con precisión el valor fundamental de tu propuesta.',
    highlights: [
      'Identificación del producto o servicio',
      'Análisis de la demanda',
      'Análisis de la oferta',
      'Mercado potencial',
      'Canales de comercialización',
    ],
    videoThumb:
      '/assets/images/Curriculo03.png',
  },
  {
    id: 'step-programming',
    stepId: 'programming',
    number: '04',
    title: 'Formulación Financiera',
    subtitle: 'Mercado a Finanzas',
    description:
      'Esta etapa está enfocada en proyectar la salud financiera y garantizar la rentabilidad de tu proyecto. Comprenderás la importancia de mantener un control preciso del dinero e identificar salidas estratégicas.',
    highlights: [
      'Inversión Inicial',
      'Estructura de Costos',
      'Desperdicio, merma e inflación',
      'Punto de equilibrio',
      'Estrategias de precios',
      'Escenarios y riesgo',
    ],
    videoThumb:
      '/assets/images/Curriculo04.png',
  },
  {
    id: 'step-practicum',
    stepId: 'practicum',
    number: '05',
    title: 'Presentación y Festival',
    subtitle: 'Finanzas a lo Real',
    description:
      'Esta etapa se enfoca en perfeccionar la narrativa comercial de tu propuesta y asegurar su proyección pública en escenarios de máxima visibilidad. Desarrollarás las habilidades para transmitir el valor de tu negocio.',
    highlights: [
      'Imagen empresarial',
      'Técnicas de pitch',
      'Networking estratégico',
      'Media Training',
    ],
    videoThumb:
      '/assets/images/Curriculo05.png',
  },
  {
    id: 'step-assessment',
    stepId: 'assessment',
    number: '06',
    title: 'Financiamiento',
    subtitle: 'Real a lo Ideal',
    description:
      'Si deseas comprender cómo conseguir y aprovechar recursos del sistema financiero para brindarle a tu negocio la capacidad de escalar rápidamente, esta última etapa será de mucha utilidad.',
    highlights: [
      'Bootstrap y FFF',
      'Crowdfunding',
      'Capital de Riesgo',
      'Créditos Bancarios',
      'Programas Gubernamentales',
    ],
    videoThumb:
      '/assets/images/Curriculo06.png',
  },
];

interface CurriculumContentProps {
  onStepVisible: (stepId: string) => void;
}

const CurriculumContent: React.FC<CurriculumContentProps> = ({ onStepVisible }) => {
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = entry.target.getAttribute('data-step-id');
            if (stepId) {
              onStepVisible(stepId);
            }
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '-80px 0px -30% 0px',
      }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onStepVisible]);

  const registerRef = (sectionId: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(sectionId, el);
    }
  };

  return (
    <div className="flex-1 min-w-0 space-y-12">
      {stepSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          data-step-id={section.stepId}
          ref={registerRef(section.id)}
          className="step-section scroll-mt-28 pb-12 border-b border-white/10 last:border-b-0"
        >
          {/* Encabezado de la etapa */}
          <div className="flex items-start gap-4 mb-6 pt-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #144979 0%, #0B2540 100%)',
                color: '#FF8F1C',
                border: '1px solid rgba(255, 143, 28, 0.4)',
              }}
            >
              {section.number}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2
                  className="text-2xl font-extrabold text-white"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {section.title}
                </h2>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(255, 143, 28, 0.15)',
                    color: '#FF8F1C',
                    border: '1px solid rgba(255, 143, 28, 0.3)',
                  }}
                >
                  {section.subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Imagen / Thumbnail del módulo con Botón de Play Central */}
          <div className="relative aspect-video mb-6 overflow-hidden rounded-2xl border border-white/10 shadow-lg group cursor-pointer">
            <AppImage
              src={section.videoThumb}
              alt={section.title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            
            {/* Botón Play centralizado */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 shadow-2xl"
                style={{
                  background: 'rgba(11, 37, 64, 0.75)',
                  border: '2px solid #FF8F1C',
                  boxShadow: '0 0 20px rgba(255, 143, 28, 0.4)',
                }}
              >
                <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-[#FF8F1C] ml-1" />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-slate-300 leading-relaxed font-normal text-base mb-6">
            {section.description}
          </p>

          {/* Puntos destacados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-md shrink-0 flex items-center justify-center mt-0.5"
                  style={{
                    background: 'rgba(255, 143, 28, 0.15)',
                    border: '1px solid rgba(255, 143, 28, 0.3)',
                  }}
                >
                  <Icon name="CheckIcon" size={12} className="text-[#FF8F1C]" />
                </div>
                <span className="text-sm font-medium text-slate-200">{h}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CurriculumContent;
