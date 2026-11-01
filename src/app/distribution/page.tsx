'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface MenuItem {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Clases y Asesoreías',
    description: 'Accede a las clases teóricas y prácticas del programa.',
    image: '/assets/images/iconclases.png',
    alt: 'Icono de clases y videos educativos',
  },
  {
    title: 'Calculadora para formulación',
    description: 'Calcula ingredientes, porciones y el costo exacto de cada receta.',
    image: '/assets/images/iconcalculadora.png',
    alt: 'Calculadora con monedas y una hoja de cálculo',
  },
  {
    title: 'Costos Variables',
    description: 'Controla lo que gastas según cuánto produces y vendes.',
    image: '/assets/images/iconcv.png',
    alt: 'Gráfico de barras ascendente con una flecha naranja de tendencia',
  },
  {
    title: 'Costos Fijos',
    description: 'Organiza alquiler, servicios y gastos que se repiten cada mes.',
    image: '/assets/images/iconcf.png',
    alt: 'Bolsa de dinero con símbolo de dólar junto a una diana con flecha',
  },
  {
    title: 'Proyecciones',
    description: 'Mira hacia adelante y estima las ventas y ganancias de tu negocio.',
    image: '/assets/images/iconproyeccion.png',
    alt: 'Telescopio apuntando al cielo',
  },
  {
    title: 'Riesgos',
    description: 'Identifica amenazas a tiempo y protege la rentabilidad de tu emprendimiento.',
    image: '/assets/images/iconriesgo.png',
    alt: 'Escudo azul con un triángulo de advertencia naranja',
  },
];

export default function DistributionPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user_session');
      if (!raw) {
        router.replace('/impulsa');
        return;
      }
      const session = JSON.parse(raw);
      const name: string = session?.nombre || session?.name || session?.email || '';
      setUserName(name.includes('@') ? name.split('@')[0] : name);
      setReady(true);
    } catch {
      router.replace('/impulsa');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    router.push('/impulsa');
  };

  const handleProfile = () => {
    console.log('Ir a perfil');
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
      {/* Reflejos naranjas y azules ambientales en el fondo con puntos espaciados */}
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
          className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full opacity-30 blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(255,115,0,0.45) 0%, transparent 70%)' }}
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

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleProfile}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FF8F1C] transition-colors cursor-pointer"
            >
              <Icon name="UserIcon" size={18} className="text-[#FF8F1C]" />
              <span>Perfil</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FF8F1C] transition-colors cursor-pointer"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={18} className="text-[#FF8F1C]" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10">
        {/* Banner de bienvenida responsivo: en celular se apila (flex-col) y en PC se pone lado a lado (sm:flex-row) */}
        <section
          className="relative overflow-hidden rounded-3xl mb-8 flex flex-col sm:flex-row items-center justify-between shadow-2xl p-6 sm:p-8 gap-4"
          style={{
            background: 'linear-gradient(135deg, #1A5A96 0%, #0F3A66 45%, #07192C 100%)',
            border: '1px solid rgba(255, 143, 28, 0.35)',
          }}
        >
          {/* Destello de luz ambiental interno */}
          <div 
            className="absolute -left-10 -top-10 w-[250px] h-[250px] rounded-full blur-[70px] pointer-events-none"
            style={{ background: 'rgba(255, 143, 28, 0.15)' }}
          />

          {/* Texto de bienvenida con su espacio reservado */}
          <div className="relative z-10 w-full sm:max-w-[60%] order-2 sm:order-1">
            <h1 className="text-white text-2xl sm:text-4xl font-black leading-tight drop-shadow-md">
              ¡Te damos la bienvenida{userName ? `, ${userName}` : ''}!
            </h1>
            <p className="text-slate-200 text-sm sm:text-base font-medium mt-2 drop-shadow">
              Elige una herramienta para impulsar tu negocio.
            </p>
          </div>

          {/* Imagen adaptada: en móvil ocupa su propio espacio visible abajo/centrada, en PC va a la derecha */}
          <div className="relative z-10 w-full sm:w-2/5 h-[140px] sm:h-full flex items-center justify-center sm:justify-end order-1 sm:order-2 pointer-events-none">
            <AppImage
              src="/assets/images/welcomebanner.png"
              alt="Ilustración de línea naranja de una cabeza con un cerebro en forma de bombilla"
              width={400}
              height={300}
              className="h-full max-h-[160px] sm:max-h-none w-auto object-contain sm:-translate-x-6 filter contrast-125 brightness-110 drop-shadow-[0_0_20px_rgba(255,143,28,0.5)]"
            />
          </div>
        </section>

        <nav aria-label="Menú principal" className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.title}
              type="button"
              className="group w-full flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-3xl bg-[#0B2540]/75 backdrop-blur-md text-left shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-[#0B2540]/95 hover:shadow-[0_8px_30px_rgba(255,143,28,0.3)] active:scale-[0.98] cursor-pointer border border-white/10 hover:border-[#FF8F1C]"
            >
              <div 
                className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-3 flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #0f294a 0%, #071628 100%)',
                  border: '1px solid rgba(255, 143, 28, 0.25)',
                }}
              >
                <AppImage
                  src={item.image}
                  alt={item.alt}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,143,28,0.25)]"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-white font-extrabold text-base sm:text-lg leading-snug group-hover:text-[#FF8F1C] transition-colors">
                  {item.title}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
                  {item.description}
                </p>
              </div>

              <span
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-[#FF8F1C] group-hover:bg-[#FF8F1C] group-hover:text-[#030C16] transition-all"
                aria-hidden="true"
              >
                <Icon name="ChevronRightIcon" size={18} />
              </span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}