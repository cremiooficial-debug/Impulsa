'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const faqs = [
  {
    q: 'Do I need to be a competitive CrossFitter to apply?',
    a: "You need a minimum of 1 year of consistent CrossFit training. Competitive experience helps — but what matters more is your movement literacy and desire to coach. We've certified athletes at every level from recreational to national competitors.",
  },
  {
    q: 'What\'s the difference between Impulsa and a standard CF-L1 weekend course?',
    a: "A standard CF-L1 is a 2-day seminar. Impulsa is 12 weeks of deliberate coaching practice — fault detection, programming, practicum hours, and community building. Our graduates consistently outperform weekend-cert coaches in their first year on the floor.",
  },
  {
    q: 'What happens if I fail the final assessment?',
    a: "Less than 6% of Impulsa graduates need a second attempt. If you do, you get one free retake within 90 days at no additional cost. We don't pass people who aren't ready — but we don't leave anyone behind either.",
  },
  {
    q: 'Can my box sponsor me?',
    a: "Yes. Box-sponsored enrollment includes group pricing for 2+ coaches, invoice billing, and progress reporting for the box owner. Contact our admissions team for a group quote — we'll turn it around in 24 hours.",
  },
  {
    q: 'How does the practicum work if I\'m not near a partner box?',
    a: "We have partner boxes in 15 US cities. If you're not near one, we'll work with your local affiliate to create a supervised practicum arrangement. Remote practicum is not available — on-floor hours are non-negotiable.",
  },
  {
    q: 'Is the certification recognized by CrossFit Inc.?',
    a: "Impulsa\'s CF-L1 pathway is a preparatory and practical training program. The final assessment aligns with CrossFit Inc.\'s CF-L1 exam standards. Over 94% of our graduates pass the CF-L1 on their first attempt.",
  },
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-up');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="preguntas"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: '#F4F0EB' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left */}
          <div className="space-y-6 reveal-up">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(61,23,198,0.08)', border: '1px solid rgba(61,23,198,0.15)' }}
            >
              <span
                className="text-xs font-800 uppercase tracking-widest"
                style={{ color: '#3D17C6', fontWeight: 800 }}
              >
                FAQ
              </span>
            </div>
            <h2
              className="text-4xl font-black leading-tight"
              style={{ fontFamily: 'Fraunces, serif', color: '#0D0A1A' }}
            >
              Questions from the floor.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#6B6480', fontWeight: 400 }}>
              If you're still reading, you're closer than you think. These are the questions we hear most from athletes who end up enrolling.
            </p>
            <a
              href="#register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-700 text-sm transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #3D17C6, #7B2FFF)',
                color: 'white',
                fontWeight: 700,
                boxShadow: '0 4px 20px rgba(61,23,198,0.2)',
              }}
            >
              <Icon name="PhoneIcon" size={16} />
              Talk to admissions
            </a>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-2 reveal-up delay-200">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: openIndex === i ? 'white' : 'transparent',
                  border: `1px solid ${openIndex === i ? 'rgba(61,23,198,0.15)' : 'rgba(61,23,198,0.08)'}`,
                  boxShadow: openIndex === i ? '0 4px 20px rgba(61,23,198,0.08)' : 'none',
                }}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span
                    className="font-700 text-sm pr-4"
                    style={{ color: openIndex === i ? '#3D17C6' : '#0D0A1A', fontWeight: 700 }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: openIndex === i ? '#3D17C6' : 'rgba(61,23,198,0.08)',
                      transform: openIndex === i ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    <Icon
                      name="PlusIcon"
                      size={14}
                      style={{ color: openIndex === i ? '#CCFF00' : '#3D17C6' }}
                    />
                  </div>
                </button>

                {openIndex === i && (
                  <div className="px-5 pb-5">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: '#6B6480', fontWeight: 400 }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
