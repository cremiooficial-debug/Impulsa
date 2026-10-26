'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const graduates = [
{
  name: 'Devon Okafor',
  city: 'Chicago, IL',
  beforeRole: 'Competitive CrossFitter, 4 years',
  afterRole: 'Head Coach, CrossFit Eastside',
  salaryIncrease: '+$18,400/yr',
  timeToJob: '11 days post-cert',
  quote:
  "I was the athlete who knew more than the coach on the floor. Now I run the floor. Impulsa turned that knowledge into credentials.",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14dcfba0a-1769410672969.png",
  badge: 'CF-L1',
  stars: 5
},
{
  name: 'Priya Raghunathan',
  city: 'Austin, TX',
  beforeRole: 'Personal trainer, 6 years',
  afterRole: 'CrossFit Coach + Opening her own box',
  salaryIncrease: '+$22,100/yr',
  timeToJob: 'Self-employed, Q1 2025',
  quote:
  "I kept losing PT clients to the CrossFit box down the street. Twelve weeks later, I'm building my own box in East Austin.",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea507857-1768555582506.png",
  badge: 'CF-L1',
  stars: 5
},
{
  name: 'Jordan Castellano',
  city: 'Miami, FL',
  beforeRole: 'Box owner, no credentialed staff',
  afterRole: 'Head of Programming, CrossFit Sunset',
  salaryIncrease: 'Retained 3 coaches',
  timeToJob: 'Immediate — internal hire',
  quote:
  "I needed credentialed coaches yesterday. Impulsa\'s cohort model let me put two staff members through simultaneously. Problem solved.",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16d7da088-1767641913366.png",
  badge: 'CF-L1',
  stars: 5
}];


const outcomeStats = [
{ value: '94%', label: 'Pass rate on first attempt', icon: 'TrophyIcon' },
{ value: '11 days', label: 'Median days to first coaching job', icon: 'BriefcaseIcon' },
{ value: '$14.2K', label: 'Average annual salary increase', icon: 'BanknotesIcon' },
{ value: '247', label: 'Partner boxes actively hiring', icon: 'BuildingStorefrontIcon' }];


const GraduateResults: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-up');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('visible');}),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="resultados"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: '#0D0A1A' }}>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal-up">
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(204,255,0,0.1)', border: '1px solid rgba(204,255,0,0.2)' }}>
            
            <Icon name="TrophyIcon" size={14} className="text-lime-accent" style={{ color: '#CCFF00' }} />
            <span
              className="text-xs font-800 uppercase tracking-widest"
              style={{ color: '#CCFF00', fontWeight: 800 }}>
              
              Graduate Outcomes
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight mb-4"
            style={{ fontFamily: 'Fraunces, serif', color: 'white' }}>
            
            Real coaches.{' '}
            <span className="gradient-text-lime">Real results.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl" style={{ fontWeight: 400 }}>
            Every number below is pulled from graduate surveys 90 days post-certification.
          </p>
        </div>

        {/* Outcome stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {outcomeStats.map((stat, i) =>
          <div
            key={i}
            className="geo-card rounded-xl p-5 reveal-up"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              transitionDelay: `${i * 100}ms`
            }}>
            
              <div
              className="text-3xl font-black mb-1"
              style={{ color: '#CCFF00', fontWeight: 900 }}>
              
                {stat.value}
              </div>
              <div className="text-white/50 text-xs font-500" style={{ fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          )}
        </div>

        {/* Graduate cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {graduates.map((grad, i) =>
          <div
            key={i}
            className="geo-card rounded-2xl p-6 reveal-up group"
            style={{
              background: 'linear-gradient(160deg, #150E2E 0%, #1A1035 100%)',
              border: '1px solid rgba(123,47,255,0.2)',
              transitionDelay: `${i * 150}ms`
            }}>
            
              {/* Avatar + badge */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                    src={grad.avatar}
                    alt={grad.name}
                    className="w-12 h-12 rounded-xl object-cover" />
                  
                    <div
                    className="absolute -bottom-1 -right-1 text-xs font-800 px-1.5 py-0.5 rounded"
                    style={{ background: '#CCFF00', color: '#0D0A1A', fontWeight: 800, fontSize: '9px' }}>
                    
                      {grad.badge}
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-700 text-sm" style={{ fontWeight: 700 }}>
                      {grad.name}
                    </div>
                    <div className="text-white/40 text-xs" style={{ fontWeight: 500 }}>
                      {grad.city}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: grad.stars }).map((_, s) =>
                <svg key={s} className="w-3 h-3" fill="#CCFF00" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                )}
                </div>
              </div>

              {/* Before / After */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span
                  className="text-xs font-700 px-2 py-0.5 rounded"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                  
                    BEFORE
                  </span>
                  <span className="text-white/50 text-xs">{grad.beforeRole}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                  className="text-xs font-700 px-2 py-0.5 rounded"
                  style={{ background: 'rgba(204,255,0,0.15)', color: '#CCFF00', fontWeight: 700 }}>
                  
                    AFTER
                  </span>
                  <span className="text-white/80 text-xs font-600" style={{ fontWeight: 600 }}>
                    {grad.afterRole}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div
              className="flex gap-4 mb-4 py-3 px-3 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              
                <div>
                  <div
                  className="text-sm font-800"
                  style={{ color: '#CCFF00', fontWeight: 800 }}>
                  
                    {grad.salaryIncrease}
                  </div>
                  <div className="text-white/30 text-xs">salary</div>
                </div>
                <div
                className="w-px"
                style={{ background: 'rgba(255,255,255,0.08)' }} />
              
                <div>
                  <div className="text-white text-sm font-700" style={{ fontWeight: 700 }}>
                    {grad.timeToJob}
                  </div>
                  <div className="text-white/30 text-xs">to first job</div>
                </div>
              </div>

              {/* Quote */}
              <p
              className="text-white/60 text-sm italic leading-relaxed"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
              
                "{grad.quote}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default GraduateResults;
