'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';

interface CostosShellProps {
  title: string;
  highlight: string;
  subtitle: string;
  children: (session: { usuario: string; dependencia: string; ownerId: string }) => React.ReactNode;
}

interface NavTab {
  label: string;
  href: string;
  icon: string;
}

const TABS: NavTab[] = [
  { label: 'Costos Variables', href: '/costos-variables', icon: 'ChartBarIcon' },
  { label: 'Costos Fijos', href: '/costos-fijos', icon: 'BanknotesIcon' },
  { label: 'Productos', href: '/productos', icon: 'CubeIcon' },
];

const CostosShell: React.FC<CostosShellProps> = ({ title, highlight, subtitle, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [dependencia, setDependencia] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [ready, setReady] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!user?.email) {
      router.replace('/impulsa');
      return;
    }
    setUsuario(user.email);
    setOwnerId(user.id);
    const userDependency = user.user_metadata?.dependencia;
    setDependencia(typeof userDependency === 'string' ? userDependency : '');
    setReady(true);
  }, [loading, router, user]);

  const handleLogout = async () => {
    setLogoutError('');
    try {
      await signOut();
      router.push('/impulsa');
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : 'No se pudo cerrar la sesión.');
    }
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

      <header className="w-full border-b border-white/10 bg-[#030C16]/90 backdrop-blur-xl relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
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

          {/* Desktop navigation (top) */}
          <nav aria-label="Estructura de Costos" className="hidden md:flex items-center gap-1.5">
            {TABS.map((tab) => {
              const active = pathname === tab.href;
              return (
                <button
                  key={tab.href}
                  type="button"
                  onClick={() => router.push(tab.href)}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors cursor-pointer border ${
                    active
                      ? 'bg-[#FF8F1C] text-[#030C16] border-[#FF8F1C]'
                      : 'text-slate-200 border-white/10 hover:text-[#FF8F1C] hover:border-[#FF8F1C]/60'
                  }`}
                >
                  <Icon name={tab.icon as any} size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

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

      {logoutError && (
        <p role="alert" className="relative z-20 px-4 py-2 text-center text-sm text-red-300">
          No se pudo cerrar la sesión: {logoutError}
        </p>
      )}

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 md:pb-10 relative z-10">
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => router.push('/distribution')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FF8F1C] transition-colors mb-4 cursor-pointer"
          >
            <Icon name="ChevronLeftIcon" size={16} className="text-[#FF8F1C]" />
            <span>Volver</span>
          </button>
          <p className="text-[#FF8F1C] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-1">
            Estructura de Costos
          </p>
          <h1 className="text-white text-2xl sm:text-4xl font-black leading-tight">
            {title} <span style={{ color: '#FF8F1C' }}>{highlight}</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-medium mt-2">{subtitle}</p>
        </div>

        {children({ usuario, dependencia, ownerId })}
      </main>

      {/* Mobile navigation (bottom) */}
      <nav
        aria-label="Estructura de Costos"
        className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-white/10 bg-[#030C16]/95 backdrop-blur-xl"
      >
        <ul className="grid grid-cols-3 max-w-xl mx-auto">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <li key={tab.href}>
                <button
                  type="button"
                  onClick={() => router.push(tab.href)}
                  aria-current={active ? 'page' : undefined}
                  className={`w-full flex flex-col items-center gap-1 py-3 text-[11px] font-bold transition-colors cursor-pointer ${
                    active ? 'text-[#FF8F1C]' : 'text-slate-400'
                  }`}
                >
                  <span
                    className={`w-10 h-7 rounded-full flex items-center justify-center ${
                      active ? 'bg-[#FF8F1C]/20' : ''
                    }`}
                  >
                    <Icon name={tab.icon as any} size={20} />
                  </span>
                  <span>{tab.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default CostosShell;
