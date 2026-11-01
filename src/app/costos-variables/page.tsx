'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import CostList from './components/CostList';

export default function CostosVariablesPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [dependencia, setDependencia] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user_session');
      if (!raw) {
        router.replace('/impulsa');
        return;
      }
      const session = JSON.parse(raw);
      setUsuario(session?.email ?? '');
      setDependencia(session?.dependencia ?? '');
      setReady(true);
    } catch {
      router.replace('/impulsa');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    router.push('/impulsa');
  };

  if (!ready) {
    return <div className="min-h-screen bg-[#030C16]" />;
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        background: 'linear-gradient(180deg, #030C16 0%, #071628 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-35 blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(255,143,28,0.5) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 -left-40 w-[650px] h-[650px] rounded-full opacity-25 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(20,73,121,0.6) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1.5px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <header className="w-full border-b border-white/10 bg-[#030C16]/90 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-xl shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #144979 0%, #0B2540 100%)',
                border: '1px solid rgba(255, 143, 28, 0.3)',
              }}
            >
              <AppLogo size={24} />
            </div>
            <span className="text-white font-black text-lg tracking-tight">
              Impulsa <span style={{ color: '#FF8F1C' }}>UCV</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FF8F1C] transition-colors cursor-pointer"
          >
            <Icon name="ArrowRightOnRectangleIcon" size={18} className="text-[#FF8F1C]" />
            <span>Salir</span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10">
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => router.push('/distribution')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FF8F1C] transition-colors mb-4 cursor-pointer"
          >
            <Icon name="ChevronLeftIcon" size={16} className="text-[#FF8F1C]" />
            <span>Volver</span>
          </button>
          <h1 className="text-white text-2xl sm:text-4xl font-black leading-tight">
            Costos <span style={{ color: '#FF8F1C' }}>Variables</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-medium mt-2">
            Gestiona tus materiales, empaques y etiquetas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <CostList
            title="Lista de materiales"
            table="materiales"
            nameColumn="material"
            costColumn="costo_unitario"
            hasUnit
            namePlaceholder="Nombre del material"
            emptyText="Aún no tienes materiales registrados."
            usuario={usuario}
            dependencia={dependencia}
          />
          <CostList
            title="Lista de Empaques"
            table="empaques"
            nameColumn="empaque"
            costColumn="costo"
            namePlaceholder="Nombre del empaque"
            emptyText="Aún no tienes empaques registrados."
            usuario={usuario}
            dependencia={dependencia}
          />
          <CostList
            title="Lista de Etiquetas"
            table="etiquetas"
            nameColumn="etiqueta"
            costColumn="costo"
            namePlaceholder="Nombre de la etiqueta"
            emptyText="Aún no tienes etiquetas registradas."
            usuario={usuario}
            dependencia={dependencia}
          />
        </div>
      </main>
    </div>
  );
}
