'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import LoginModal from './LoginModal';

const cities = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar',
  'Carabobo', 'Cojedes', 'Delta Amacuro', 'Distrito Capital', 'Falcón',
  'Guárico', 'Lara', 'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta',
  'Portuguesa', 'Sucre', 'Táchira', 'Trujillo', 'Yaracuy', 'La Guaira', 'Zulia',
];

const educationLevels = [
  'Primaria',
  'Secundaria',
  'Universitaria',
  'Post grado',
];

const fundingMethods = [
  'Plan Básico ($10/mes)',
  'Plan Avanzado ($50/mes)',
  'Plan Full ($150/mes)',
  'Beca / En búsqueda de financiamiento',
];

const certifications = [
  'Estudiante UCV (Pregrado)',
  'Egresado UCV',
  'Estudiante de otra institución',
  'Emprendedor independiente',
  'Docente / Investigador',
];

type FormStep = 'initial' | 'expanded' | 'submitted';

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState<FormStep>('initial');
  
  // Campos
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [age, setAge] = useState('');
  const [currentCert, setCurrentCert] = useState('');
  const [yearsTraining, setYearsTraining] = useState('');
  const [funding, setFunding] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('expanded');
  };

  const handleFullSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('submitted');
    }, 1800);
  };

  useEffect(() => {
    if (step === 'expanded' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [step]);

  return (
    <section
      id="register"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #071A2E 0%, #030C16 100%)',
      }}
    >
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#FF8F1C]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8F1C]/10 border border-[#FF8F1C]/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FF8F1C] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-[#FF8F1C]">
                  Primera Cohorte · Enero 18, 2027
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4 text-white">
                No lo dejes para después.{' '}
                <span className="bg-gradient-to-r from-[#FF8F1C] to-[#FFD099] bg-clip-text text-transparent">
                  ¡Inscríbete Ya!
                </span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-normal">
                17 cupos disponibles en la primera cohorte, esta comenzará en 18 semanas.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: 'SparklesIcon', text: 'Evaluación de perfil y selección en un plazo máximo de 48 hrs' },
                { icon: 'MapPinIcon', text: 'Disponible modalidad digital, híbrida y presencial en la sede principal de la UCV' },
                { icon: 'ClockIcon', text: 'Horarios disponibles desde las 8am hasta las 9pm de lunes a sábado' },
                { icon: 'UserGroupIcon', text: 'Postulaciones limitadas mensualmente para asegurar cupos en las clases y talleres' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-[#FF8F1C]/20"
                    style={{ background: 'rgba(255, 143, 28, 0.1)' }}
                  >
                    <Icon name={item.icon as any} size={18} style={{ color: '#FF8F1C' }} />
                  </div>
                  <span className="text-slate-200 text-sm font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div
              id="syllabus"
              className="rounded-2xl p-6 backdrop-blur-xl border border-white/10"
              style={{ background: 'rgba(11, 37, 64, 0.65)' }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="text-white text-base mb-1 font-bold">
                    Obtén nuestra guía aquí.
                  </div>
                  <p className="text-slate-300 text-xs mb-4 leading-relaxed font-medium">
                    Contenido de todas las etapas, manual del software financiero, ejemplos, tips, sugerencias y ejercicios para mejorar tus oportunidades de éxito.
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      background: 'rgba(255, 143, 28, 0.15)',
                      color: '#FF8F1C',
                      border: '1px solid rgba(255, 143, 28, 0.3)',
                    }}
                  >
                    <Icon name="ArrowDownTrayIcon" size={15} />
                    Descarga
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div ref={formRef}>
            {step !== 'submitted' ? (
              <div
                className="rounded-3xl p-8 backdrop-blur-xl border border-white/12 shadow-2xl"
                style={{ background: 'rgba(11, 37, 64, 0.75)' }}
              >
                <div className="mb-6">
                  <h3 className="text-white text-xl mb-1 font-extrabold">
                    {step === 'initial' ? 'Reserva tu cupo en IMPULSA UCV' : 'Completa tu postulación'}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium">
                    {step === 'initial' ? 'Toma 60 segundos. Revisamos las postulaciones en 48 horas.' : 'Unos datos más — esto nos ayuda a ubicarte en el perfil adecuado.'}
                  </p>
                </div>

                <div className="flex gap-2 mb-6">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className="h-1.5 flex-1 rounded-full transition-all duration-500"
                      style={{
                        background:
                          s === 1 || step === 'expanded' ? '#FF8F1C' : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  ))}
                </div>

                <form onSubmit={step === 'initial' ? handleInitialSubmit : handleFullSubmit}>
                  <div className="space-y-5">
                    
                    {/* Nombre Completo */}
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#FF8F1C] transition-colors"
                        placeholder="Ej. María Pérez"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Correo electrónico */}
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#FF8F1C] transition-colors"
                        placeholder="tu.correo@ucv.ve"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    {/* Número de teléfono */}
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300">
                        Número de teléfono *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#FF8F1C] transition-colors"
                        placeholder="Ej. 04141234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    {/* Ubicación / Estado */}
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300">
                        Ubicación / Estado *
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl bg-[#071A2E] border border-white/15 text-white focus:outline-none focus:border-[#FF8F1C] transition-colors cursor-pointer"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      >
                        <option value="">Selecciona tu ubicación</option>
                        {cities.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Grado de Instrucción */}
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300">
                        Grado de instrucción *
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl bg-[#071A2E] border border-white/15 text-white focus:outline-none focus:border-[#FF8F1C] transition-colors cursor-pointer"
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        required
                      >
                        <option value="">Selecciona tu grado de instrucción</option>
                        {educationLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Campos adicionales paso 2 */}
                    {step === 'expanded' && (
                      <>
                        {/* Edad */}
                        <div>
                          <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300">
                            Edad *
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#FF8F1C] transition-colors"
                            placeholder="Ej. 24"
                            min="12"
                            max="99"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                          />
                        </div>

                        {/* Perfil actual */}
                        <div>
                          <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300">
                            Perfil actual
                          </label>
                          <select
                            className="w-full px-4 py-3 rounded-xl bg-[#071A2E] border border-white/15 text-white focus:outline-none focus:border-[#FF8F1C] transition-colors cursor-pointer"
                            value={currentCert}
                            onChange={(e) => setCurrentCert(e.target.value)}
                          >
                            <option value="">Selecciona una opción</option>
                            {certifications.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        {/* Años de experiencia */}
                        <div>
                          <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300">
                            Años de experiencia o desarrollo de la idea
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#FF8F1C] transition-colors"
                            placeholder="Ej. 1"
                            min="0"
                            max="30"
                            value={yearsTraining}
                            onChange={(e) => setYearsTraining(e.target.value)}
                          />
                        </div>

                        {/* Plan de preferencia */}
                        <div>
                          <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300">
                            Plan de preferencia
                          </label>
                          <select
                            className="w-full px-4 py-3 rounded-xl bg-[#071A2E] border border-white/15 text-white focus:outline-none focus:border-[#FF8F1C] transition-colors cursor-pointer"
                            value={funding}
                            onChange={(e) => setFunding(e.target.value)}
                          >
                            <option value="">Selecciona un plan</option>
                            {fundingMethods.map((f) => (
                              <option key={f} value={f}>{f}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 text-[#030C16] cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)',
                        boxShadow: '0 8px 30px rgba(255, 143, 28, 0.45)',
                      }}
                    >
                      {isLoading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin text-[#030C16]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Enviando...
                        </>
                      ) : step === 'initial' ? (
                        <>
                          Continuar Postulación
                          <Icon name="ArrowRightIcon" size={16} />
                        </>
                      ) : (
                        <>
                          Asegurar Mi Puesto en Cohorte 1
                          <Icon name="TrophyIcon" size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-center text-slate-400 text-xs mt-4 font-medium">
                  Sin compromiso de pago hasta ser evaluado.
                </p>
              </div>
            ) : (
              <div
                className="rounded-3xl p-10 text-center backdrop-blur-xl border border-[#FF8F1C]/30"
                style={{ background: 'rgba(255, 143, 28, 0.08)' }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)',
                  }}
                >
                  <Icon name="TrophyIcon" size={30} style={{ color: '#030C16' }} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  Postulación Recibida
                </h3>
                <p className="text-slate-300 text-base mb-6 font-normal">
                  Revisa tu bandeja de entrada — evaluaremos tu perfil y te responderemos en un plazo máximo de 48 horas.
                </p>
                <div
                  className="rounded-2xl p-5 text-left border border-white/10"
                  style={{ background: 'rgba(7, 26, 46, 0.7)' }}
                >
                  <div className="text-xs font-bold uppercase tracking-wider mb-3 text-[#FF8F1C]">
                    Mientras esperas:
                  </div>
                  <div className="space-y-2.5">
                    {[
                      'Descarga el programa completo de la metodología.',
                      'Síguenos en redes para novedades del programa.',
                      'Únete a nuestro canal oficial de Telegram.',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-slate-300 text-sm font-medium">
                        <Icon name="CheckCircleIcon" size={16} style={{ color: '#FF8F1C' }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Login debajo del formulario */}
            <div className="mt-6 text-center">
              <span className="text-slate-400 text-sm font-medium">¿Ya tienes cuenta? </span>
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="text-[#FF8F1C] text-sm font-bold hover:underline cursor-pointer"
              >
                Inicia sesión
              </button>
            </div>
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
