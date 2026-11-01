'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

export interface CurriculumStep {
  id: string;
  number: string;
  title: string;
  duration: string;
  icon: string;
  sectionId: string;
}

export const curriculumSteps: CurriculumStep[] = [
  {
    id: 'application',
    number: '01',
    title: 'Plasmando la Idea',
    duration: 'Mente al Escrito',
    icon: 'ClipboardDocumentCheckIcon',
    sectionId: 'step-application',
  },
  {
    id: 'foundations',
    number: '02',
    title: 'Formulación Técnica',
    duration: 'Escrito al Plano',
    icon: 'AcademicCapIcon',
    sectionId: 'step-foundations',
  },
  {
    id: 'movement',
    number: '03',
    title: 'Formulación Comercial',
    duration: 'Plano al Mercado',
    icon: 'BoltIcon',
    sectionId: 'step-movement',
  },
  {
    id: 'programming',
    number: '04',
    title: 'Formulación Financiera',
    duration: 'Mercado a las Finanzas',
    icon: 'TableCellsIcon',
    sectionId: 'step-programming',
  },
  {
    id: 'practicum',
    number: '05',
    title: 'Festival y Pitch',
    duration: 'Finanzas a lo Real',
    icon: 'UserGroupIcon',
    sectionId: 'step-practicum',
  },
  {
    id: 'assessment',
    number: '06',
    title: 'Financiamiento',
    duration: 'Real a lo Ideal',
    icon: 'TrophyIcon',
    sectionId: 'step-assessment',
  },
];

interface CertificationSidebarProps {
  activeStep: string;
  completedSteps: string[];
  onStepClick: (sectionId: string) => void;
}

const CertificationSidebar: React.FC<CertificationSidebarProps> = ({
  activeStep,
  completedSteps,
  onStepClick,
}) => {
  const currentIndex = curriculumSteps.findIndex((s) => s.id === activeStep);
  const activeNumber = currentIndex !== -1 ? currentIndex + 1 : 1;
  const progressPercent = Math.round((activeNumber / curriculumSteps.length) * 100);

  return (
    /* Se removió h-fit para permitir el scroll sticky completo */
    <aside className="hidden lg:block w-72 shrink-0 sticky top-24 self-start z-20">
      <div
        className="rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300"
        style={{
          background: 'rgba(11, 37, 64, 0.75)',
          boxShadow: '0 20px 50px rgba(3, 12, 22, 0.7)',
        }}
      >
        {/* Encabezado Sidebar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: '#FF8F1C' }}
              />
              <span className="text-xs font-black uppercase tracking-widest text-[#FF8F1C]">
                Programa Impulsa
              </span>
            </div>
            <span className="text-xs font-bold text-[#FF8F1C] bg-[#FF8F1C]/10 px-2 py-0.5 rounded-full border border-[#FF8F1C]/20">
              {progressPercent}%
            </span>
          </div>

          <div className="text-slate-300 text-xs font-medium flex justify-between items-center mt-1">
            <span>Progreso del currículo</span>
            <span className="text-slate-400 font-mono">
              Paso {activeNumber} de {curriculumSteps.length}
            </span>
          </div>

          {/* Barra de progreso */}
          <div className="mt-3 w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full transition-all duration-500 ease-out rounded-full"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #144979 0%, #FF8F1C 100%)',
                boxShadow: '0 0 12px rgba(255, 143, 28, 0.5)',
              }}
            />
          </div>
        </div>

        {/* Lista de etapas */}
        <div className="space-y-1 relative">
          {curriculumSteps.map((step, index) => {
            const isActive = activeStep === step.id;
            const isCompleted = completedSteps.includes(step.id) || index < currentIndex;

            return (
              <React.Fragment key={step.id}>
                <button
                  className="sidebar-step w-full text-left px-3.5 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden"
                  style={{
                    background: isActive ? 'rgba(255, 143, 28, 0.15)' : 'transparent',
                    borderLeft: isActive ? '3px solid #FF8F1C' : '3px solid transparent',
                  }}
                  onClick={() => onStepClick(step.sectionId)}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <div
                      className="step-number w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-all duration-300"
                      style={{
                        background: isActive
                          ? '#FF8F1C'
                          : isCompleted
                          ? '#144979' :'rgba(255,255,255,0.08)',
                        color: isActive ? '#030C16' : isCompleted ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                        transform: isActive ? 'scale(1.08)' : 'scale(1)',
                        boxShadow: isActive ? '0 0 16px rgba(255, 143, 28, 0.5)' : 'none',
                      }}
                    >
                      {isCompleted && !isActive ? (
                        <Icon name="CheckIcon" size={14} className="text-white" />
                      ) : (
                        step.number
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-bold truncate transition-colors duration-200"
                        style={{
                          color: isActive ? '#FF8F1C' : isCompleted ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-slate-400 font-normal truncate">
                        {step.duration}
                      </div>
                    </div>

                    {isActive && (
                      <div
                        className="w-2 h-2 rounded-full shrink-0 animate-ping"
                        style={{ background: '#FF8F1C' }}
                      />
                    )}
                  </div>
                </button>

                {index < curriculumSteps.length - 1 && (
                  <div
                    className="step-connector h-3 mx-auto w-0.5 transition-all duration-500"
                    style={{
                      background: isCompleted ? '#FF8F1C' : 'rgba(255,255,255,0.1)',
                      marginLeft: '26px',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Botón ¡Impúlsate! */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <a
            href="#register"
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)',
              color: '#030C16',
              boxShadow: '0 8px 25px rgba(255, 143, 28, 0.4)',
            }}
          >
            ¡Impúlsate!
            <Icon name="ArrowRightIcon" size={16} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default CertificationSidebar;
