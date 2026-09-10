'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';


const words = ['Where', 'Champions', 'Begin'];

const stats = [
  { icon: '🏔️', value: '15+', label: 'Years of Experience', labelKa: 'წლის გამოცდილება' },
  { icon: '👦', value: '500+', label: 'Children Coached', labelKa: 'ბავშვი გაწვრთნილი' },
  { icon: '🌟', value: '2', label: 'Seasons: Winter & Summer', labelKa: 'სეზონი: ზამთარი & ზაფხული' },
];

export default function HeroSection() {
  const [wordVisible, setWordVisible] = useState<boolean[]>([false, false, false]);
  const [statsVisible, setStatsVisible] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; size: number; delay: number; type: 'snow' | 'leaf' }[]>([]);
  const [lang, setLang] = useState<'en' | 'ka'>('en');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleLang = (e: Event) => setLang((e as CustomEvent).detail);
    window.addEventListener('langChange', handleLang);
    return () => window.removeEventListener('langChange', handleLang);
  }, []);

  useEffect(() => {
    words.forEach((_, i) => {
      setTimeout(() => {
        setWordVisible((prev) => { const next = [...prev]; next[i] = true; return next; });
      }, 400 + i * 200);
    });
    setTimeout(() => setStatsVisible(true), 1200);

    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 5,
      type: (i % 2 === 0 ? 'snow' : 'leaf') as 'snow' | 'leaf',
    }));
    setParticles(p);
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" id="hero">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Winter half */}
        <div className="diagonal-clip-winter absolute inset-0 overflow-hidden">
          <AppImage
            src="/assets/images/polsport-1784811273809.jpg"
            alt="Snowy ski slopes in Bakuriani, white mountains, winter skiing terrain"
            fill
            priority
            className="object-cover"
            sizes="60vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,63,107,0.72) 0%, rgba(59,99,171,0.55) 60%, rgba(2,179,185,0.3) 100%)' }} />
        </div>
        {/* Summer half */}
        <div className="diagonal-clip-summer absolute inset-0 overflow-hidden">
          <AppImage
            src="/assets/images/Polsport_house-1784811273593.jpg"
            alt="Lush green mountain summer camp in Bakuriani, sunny green slopes, outdoor activities"
            fill
            priority
            className="object-cover"
            sizes="60vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(225deg, rgba(2,100,60,0.65) 0%, rgba(2,179,185,0.45) 50%, rgba(27,63,107,0.3) 100%)' }} />
        </div>
        {/* Diagonal shimmer line */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom right, transparent 44%, rgba(255,255,255,0.4) 49.5%, rgba(255,255,255,0.7) 50.5%, rgba(255,255,255,0.4) 51.5%, transparent 56%)',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className={p.type === 'snow' ? 'winter-particle' : 'summer-particle'}
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              background: p.type === 'snow' ? 'rgba(255,255,255,0.8)' : 'rgba(2,179,185,0.6)',
              borderRadius: p.type === 'snow' ? '50%' : '0 50% 50% 50%',
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${p.delay}s`,
              top: p.type === 'snow' ? '-20px' : '100%',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-24">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
            animation: 'fadeInUp 0.8s ease forwards',
          }}
        >
          <span className="text-white/80 text-xs font-bold tracking-widest uppercase">
            {lang === 'ka' ? 'ბაკურიანი, საქართველო · 1,700მ' : 'Bakuriani, Georgia · 1,700m Altitude'}
          </span>
        </div>

        <h1 className="font-heading font-black text-hero text-white mb-6" style={{ perspective: '800px' }}>
          {words.map((word, i) => (
            <span
              key={word}
              className="inline-block mr-4"
              style={{
                opacity: wordVisible[i] ? 1 : 0,
                transform: wordVisible[i] ? 'translateY(0) rotateX(0)' : 'translateY(30px) rotateX(-20deg)',
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: `${i * 0.1}s`,
                textShadow: '0 4px 24px rgba(0,0,0,0.3)',
                color: i === 1 ? '#02B3B9' : 'white',
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          className="text-white/85 text-lg md:text-2xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)', animation: 'fadeInUp 0.8s 0.8s ease forwards', opacity: 0 }}
        >
          {lang === 'ka' ?'წლის ბანაკი ბავშვებისთვის ბაკურიანის გულში, საქართველოში' :'A year-round mountain camp for children in the heart of Bakuriani, Georgia'}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          style={{ animation: 'fadeInUp 0.8s 1s ease forwards', opacity: 0 }}
        >
          <button
            onClick={() => scrollToSection('#activities')}
            className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #1B3F6B, #3B63AB)', boxShadow: '0 8px 32px rgba(27,63,107,0.4)' }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
            <span>🎿</span>
            <span>{lang === 'ka' ? 'ზამთრის ბანაკი' : 'Winter Camp'}</span>
          </button>
          <button
            onClick={() => scrollToSection('#activities')}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow"
            style={{ background: 'linear-gradient(135deg, #02B3B9, #00876b)', boxShadow: '0 8px 32px rgba(2,179,185,0.4)' }}
          >
            <span>☀️</span>
            <span>{lang === 'ka' ? 'ზაფხულის ბანაკი' : 'Summer Camp'}</span>
          </button>
        </div>

        {/* Floating Stats */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className="stat-badge rounded-2xl px-6 py-4 flex items-center gap-3"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'scale(1) translateY(0)' : 'scale(0) translateY(30px)',
                transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              <span className="text-2xl">{stat.icon}</span>
              <div className="text-left">
                <div className="font-heading font-black text-2xl" style={{ color: 'var(--primary)' }}>{stat.value}</div>
                <div className="text-xs font-semibold text-muted-foreground leading-tight">{lang === 'ka' ? stat.labelKa : stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-white/60 text-xs font-bold tracking-widest uppercase">{lang === 'ka' ? 'გაიგე მეტი' : 'Discover'}</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/70 rounded-full" style={{ animation: 'scrollBar 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}