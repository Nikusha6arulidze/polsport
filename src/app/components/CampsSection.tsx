'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const camps = [
  {
    id: 'winter-2025',
    emoji: '⛷️',
    name: 'Winter Ski Camp 2025',
    nameKa: 'ზამთრის სკი ბანაკი 2025',
    dates: 'Jan 4 – 18, 2025',
    datesKa: '4–18 იანვარი, 2025',
    ages: '7–16',
    duration: '14 days',
    durationKa: '14 დღე',
    spotsTotal: 24,
    spotsLeft: 12,
    color: '#3B63AB',
    bg: '#EBF0F9',
  },
  {
    id: 'summer-2025',
    emoji: '☀️',
    name: 'Summer Adventure Camp 2025',
    nameKa: 'ზაფხულის სათავგადასავლო ბანაკი 2025',
    dates: 'Jul 7 – 21, 2025',
    datesKa: '7–21 ივლისი, 2025',
    ages: '6–15',
    duration: '14 days',
    durationKa: '14 დღე',
    spotsTotal: 30,
    spotsLeft: 15,
    color: '#02B3B9',
    bg: '#F0FDF4',
  },
  {
    id: 'winter-2026',
    emoji: '⛷️',
    name: 'Winter Ski Camp 2026',
    nameKa: 'ზამთრის სკი ბანაკი 2026',
    dates: 'Feb 1 – 15, 2026',
    datesKa: '1–15 თებერვალი, 2026',
    ages: '7–16',
    duration: '14 days',
    durationKa: '14 დღე',
    spotsTotal: 24,
    spotsLeft: 18,
    color: '#3B63AB',
    bg: '#EBF0F9',
  },
];

interface CampsSectionProps {
  onSelectCamp?: (campId: string) => void;
}

export default function CampsSection({ onSelectCamp }: CampsSectionProps) {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<'en' | 'ka'>('en');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLang = (e: Event) => setLang((e as CustomEvent).detail);
    window.addEventListener('langChange', handleLang);
    return () => window.removeEventListener('langChange', handleLang);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleRegister = (campId: string) => {
    if (onSelectCamp) onSelectCamp(campId);
    const registerEl = document.querySelector('#register');
    if (registerEl) {
      registerEl.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('selectCamp', { detail: campId }));
    }
  };

  return (
    <section id="camps" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className="text-center mb-16"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 block">
            {lang === 'ka' ? 'მომავალი ბანაკები' : 'Upcoming Camps'}
          </span>
          <h2 className="font-heading font-black text-section-title text-foreground mb-4">
            {lang === 'ka' ? 'დარეგისტრირდი ბანაკზე' : 'Register for a Camp'}
          </h2>
          <p className="text-muted-foreground font-medium">
            {lang === 'ka' ? 'ადგილები შეზღუდულია — დარეგისტრირდი ადრე' : 'Spots are limited — register early'}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {camps.map((camp, i) => (
              <div
                key={camp.id}
                className="relative flex gap-6 md:gap-8 items-start"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `all 0.7s cubic-bezier(0.34,1.56,0.64,1)`,
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:flex w-12 h-12 rounded-full items-center justify-center text-xl flex-shrink-0 z-10 border-4 border-white"
                  style={{ background: camp.color, boxShadow: `0 4px 16px ${camp.color}40` }}
                >
                  {camp.emoji}
                </div>

                {/* Camp card */}
                <div
                  className="flex-1 rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ background: camp.bg, border: `1.5px solid ${camp.color}22` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl md:hidden">{camp.emoji}</span>
                        <h3 className="font-heading font-black text-xl text-foreground">
                          {lang === 'ka' ? camp.nameKa : camp.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                          <Icon name="CalendarIcon" size={14} />
                          {lang === 'ka' ? camp.datesKa : camp.dates}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                          <Icon name="UserGroupIcon" size={14} />
                          {lang === 'ka' ? `ასაკი ${camp.ages}` : `Ages ${camp.ages}`}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                          <Icon name="ClockIcon" size={14} />
                          {lang === 'ka' ? camp.durationKa : camp.duration}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRegister(camp.id)}
                      className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{ background: `linear-gradient(135deg, ${camp.color}, ${camp.color}cc)`, boxShadow: `0 4px 16px ${camp.color}40` }}
                    >
                      {lang === 'ka' ? 'დარეგისტრირდი' : 'Register Now'}
                      <Icon name="ArrowRightIcon" size={16} className="text-white" />
                    </button>
                  </div>

                  {/* Spots progress */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span style={{ color: camp.color }}>
                        {lang === 'ka' ? `${camp.spotsLeft} ადგილი დარჩა` : `${camp.spotsLeft} spots left`}
                      </span>
                      <span className="text-muted-foreground">{camp.spotsTotal} {lang === 'ka' ? 'სულ' : 'total'}</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: `${camp.color}20` }}>
                      <div
                        className="h-full rounded-full progress-fill"
                        style={{
                          width: `${((camp.spotsTotal - camp.spotsLeft) / camp.spotsTotal) * 100}%`,
                          background: `linear-gradient(to right, ${camp.color}, ${camp.color}99)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}