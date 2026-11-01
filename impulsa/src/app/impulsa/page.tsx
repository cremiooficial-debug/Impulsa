'use client';

import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroDashboard from './components/HeroDashboard';
import MetricsSection from './components/MetricsSection';
import CertificationSidebar, { curriculumSteps } from './components/CertificationSidebar';
import CurriculumContent from './components/CurriculumContent';
import PricingSection from './components/PricingSection';
import RegistrationForm from './components/RegistrationForm';

export default function ImpulsaPage() {
  const [activeStep, setActiveStep] = useState('application');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Callback para detectar el paso visible al hacer scroll
  const handleStepVisible = useCallback((stepId: string) => {
    setActiveStep(stepId);
    setCompletedSteps((prev) => {
      const stepIndex = curriculumSteps.findIndex((s) => s.id === stepId);
      const newCompleted = curriculumSteps
        .slice(0, stepIndex)
        .map((s) => s.id);
      return newCompleted;
    });
  }, []);

  // Función con Scroll Fluido ajustada para la cabecera fija
  const handleSidebarStepClick = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -100; // Compensación para la barra de navegación superior
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen text-white w-full" style={{ background: '#030C16' }}>
      {/* Overlay de textura o grano */}
      <div className="grain-overlay" />

      {/* Header */}
      <Header />

      {/* Hero Principal */}
      <HeroDashboard />

      {/* Sección de Métricas */}
      <MetricsSection />

      {/* Sección de Currículo */}
      <section id="programa" className="py-20 w-full" style={{ background: '#030C16' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Encabezado Principal de la Sección */}
          <div className="mb-12">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255, 143, 28, 0.15)',
                border: '1px solid rgba(255, 143, 28, 0.3)',
              }}
            >
              <span className="text-xs font-black uppercase tracking-widest text-[#FF8F1C]">
                Currículo de 6 pasos
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold leading-tight text-white"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Seis etapas. Un solo objetivo.
            </h2>
            <p className="text-base mt-3 max-w-xl text-slate-300 font-normal">
              Cada fase construye sobre la anterior. Para el gran festival, ya no te sentirás perdido como cualquier emprendedor — Estarás seguro de lo que tienes como todo un empresario.
            </p>
          </div>

          {/* Flexbox del Sidebar y Contenido (Sin 'relative' invasivos) */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <CertificationSidebar
              activeStep={activeStep}
              completedSteps={completedSteps}
              onStepClick={handleSidebarStepClick}
            />
            <CurriculumContent onStepVisible={handleStepVisible} />
          </div>
        </div>
      </section>

      {/* Planes y Precios */}
      <PricingSection />

      {/* Formulario de Registro */}
      <RegistrationForm />

      {/* Pie de Página */}
      <Footer />
    </div>
  );
}
