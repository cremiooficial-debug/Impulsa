'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StatCard {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  color: string;
  rotate: string;
  delay: number;
}

const stats: StatCard[] = [
  {
    value: 2847,
    suffix: '',
    label: 'Usuarios Certificados',
    sublabel: 'desde 2027',
    color: 'from-indigo-primary to-violet-active',
    rotate: '-rotate-1',
    delay: 0,
  },
  {
    value: 34,
    suffix: '%',
    label: 'Supera los dos años',
    sublabel: 'Promedio de la industria: 2%',
    color: 'from-violet-active to-indigo-primary',
    rotate: 'rotate-1',
    delay: 150,
  },
  {
    value: 142000,
    prefix: '$',
    suffix: '',
    label: 'Capital Recaudado',
    sublabel: 'Post-certificación',
    color: 'from-indigo-deep to-violet-active',
    rotate: '-rotate-1',
    delay: 300,
  },
  {
    value: 247,
    suffix: '',
    label: 'Facilitadores Disponibles',
    sublabel: 'Todos los niveles académicos',
    color: 'from-violet-active to-indigo-light',
    rotate: 'rotate-2',
    delay: 450,
  },
];

function useCountUp(target: number, duration: number = 2000, started: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

const StatCardItem: React.FC<{ stat: StatCard; index: number; started: boolean }> = ({
  stat,
  index,
  started,
}) => {
  const count = useCountUp(stat.value, 2000 + index * 200, started);

  const formatValue = (n: number) => {
    if (n >= 1000) return n.toLocaleString();
    return n.toString();
  };

  return (
    <div
      className={`stat-card geo-card rounded-2xl p-6 ${stat.rotate} reveal-up transition-all duration-300 hover:scale-105 hover:rotate-0`}
      style={{
        background: 'rgba(11, 37, 64, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        transitionDelay: `${stat.delay}ms`,
      }}
    >
      {/* Accent de esquina */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-10 pointer-events-none"
        style={{
          background: '#FF8F1C',
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }}
      />

      <div className="relative z-10">
        <div
          className="text-4xl font-black tracking-tight mb-1"
          style={{ color: '#FF8F1C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          {stat.prefix || ''}
          {formatValue(count)}
          {stat.suffix}
        </div>

        <div className="text-white font-bold text-base mb-1" style={{ fontWeight: 700 }}>
          {stat.label}
        </div>
        <div className="text-slate-400 text-xs font-medium" style={{ fontWeight: 500 }}>
          {stat.sublabel}
        </div>
      </div>
    </div>
  );
};

export default function MetricsSection() {
  const [countersStarted, setCountersStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Activa el conteo cuando la sección entra en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // IntersectionObserver para activar la clase 'visible' en los elementos reveal-up
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-up');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="metricas" 
      className="py-16 px-6 relative z-20 border-y border-white/10"
      style={{
        background: 'rgba(11, 37, 64, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCardItem key={i} stat={stat} index={i} started={countersStarted} />
          ))}
        </div>
      </div>
    </section>
  );
}
