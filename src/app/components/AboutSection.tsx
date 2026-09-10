'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const values = [
{ icon: '🎯', title: 'Our Mission', titleKa: 'ჩვენი მისია', front: 'Our Mission', frontKa: 'ჩვენი მისია', back: 'Nurture young athletes in a safe, expert-led environment where every child thrives.', backKa: 'ახალგაზრდა სპორტსმენების განვითარება უსაფრთხო, ექსპერტების ხელმძღვანელობით.' },
{ icon: '🏔️', title: 'Our Goal', titleKa: 'ჩვენი მიზანი', front: 'Our Goal', frontKa: 'ჩვენი მიზანი', back: 'Every child leaves with new skills, confidence, and friendships that last a lifetime.', backKa: 'ყოველი ბავშვი მიდის ახალი უნარებით, თავდაჯერებულობით და მეგობრებით.' },
{ icon: '🛡️', title: 'Safety First', titleKa: 'უსაფრთხოება პირველ ადგილზე', front: 'Safety First', frontKa: 'უსაფრთხოება', back: '24/7 certified supervision and emergency protocols — parents can fully relax.', backKa: '24/7 სერტიფიცირებული მეთვალყურეობა — მშობლები სრულად მშვიდად არიან.' },
{ icon: '🤝', title: 'Community', titleKa: 'თემი', front: 'Community', frontKa: 'თემი', back: 'Bonds formed at Polsport last a lifetime. Our alumni network spans over 15 years.', backKa: 'პოლსპორტში შექმნილი კავშირები სიცოცხლისთვის რჩება.' }];


export default function AboutSection() {
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
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Mountain SVG divider top */}
      <div className="absolute top-0 left-0 w-full" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full" style={{ height: 60 }}>
          <path d="M0,60 L0,40 L120,10 L240,35 L360,5 L480,30 L600,0 L720,25 L840,8 L960,32 L1080,12 L1200,38 L1320,15 L1440,42 L1440,60 Z" fill="#F4F6F9" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Polaroid image */}
          <div
            className="relative flex justify-center"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease 0.1s' }}>

            <div
              className="relative bg-white p-4 pb-12 shadow-2xl"
              style={{ transform: 'rotate(-3deg)', maxWidth: 420, transition: 'transform 0.4s ease' }}
              onMouseEnter={(e) => {(e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) scale(1.02)';}}
              onMouseLeave={(e) => {(e.currentTarget as HTMLDivElement).style.transform = 'rotate(-3deg)';}}>

              <AppImage
                src="/assets/images/618928519_1391453142993419_6933213946554431515_n-1784836009535.jpg"
                alt="Polsport camp facility in Bakuriani, warm sunny day, children playing outside mountain chalet"
                width={400}
                height={320}
                className="w-full object-cover" />

              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                  {lang === 'ka' ? 'ჩვენი სახლი ბაკურიანში' : 'Our Home in Bakuriani'}
                </span>
              </div>
            </div>
            {/* Decorative tape */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60" style={{ background: 'rgba(59,99,171,0.3)', transform: 'rotate(-2deg)' }} />
          </div>

          {/* Text */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease 0.3s' }}>
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4 block">
              {lang === 'ka' ? 'ჩვენი ისტორია' : 'Our Story'}
            </span>
            <h2 className="font-heading font-black text-section-title text-foreground mb-6">
              {lang === 'ka' ? 'ოჯახური ბიზნესი, მთის სიყვარულით' : 'A Family Business Built on a Love for the Mountains'}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {lang === 'ka' ? 'პოლსპორტი 15 წელზე მეტია ემსახურება ბაკურიანის ბავშვებს და ოჯახებს. ჩვენი ბანაკი დაარსდა ვნებიანი სპორტსმენებისა და მშობლების მიერ, ვინც სჯეროდა, რომ ყველა ბავშვი იმსახურებს მთის სასწაულს.' : 'For over 15 years, Polsport has been serving children and families in Bakuriani. Our camp was founded by passionate athletes and parents who believed every child deserves the magic of the mountains.'}
              </p>
              <p>
                {lang === 'ka' ? 'ჩვენ ვიყვართ ის ადგილი, სადაც ბავშვები ვითარდებიან — სპორტულად, სოციალურად და ემოციურად. ჩვენი გამოცდილი მწვრთნელები ზრუნავენ ყოველ ბავშვზე პირადად.' : 'We are the place where children grow — athletically, socially, and emotionally. Our experienced coaches care for every child individually, ensuring no one is left behind.'}
              </p>
            </div>
          </div>
        </div>

        {/* Value flip cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) =>
          <div
            key={v.title}
            className="flip-card h-52"
            style={{
              perspective: '1000px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1)`,
              transitionDelay: `${0.2 + i * 0.1}s`
            }}>

              <div className="flip-card-inner relative w-full h-full">
                <div className="flip-card-front absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 p-6 bg-white shadow-sm" style={{ border: '1.5px solid var(--border)' }}>
                  <span className="text-4xl">{v.icon}</span>
                  <h3 className="font-heading font-bold text-base text-center text-foreground">{lang === 'ka' ? v.titleKa : v.front}</h3>
                  <span className="text-xs text-muted-foreground">{lang === 'ka' ? 'შეხება' : 'Hover to learn more'}</span>
                </div>
                <div className="flip-card-back absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 p-6 text-white" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                  <span className="text-3xl">{v.icon}</span>
                  <p className="text-sm text-center leading-relaxed text-white/90">{lang === 'ka' ? v.backKa : v.back}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mountain SVG divider bottom */}
      <div className="absolute bottom-0 left-0 w-full" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full" style={{ height: 60 }}>
          <path d="M0,0 L0,20 L120,50 L240,25 L360,55 L480,30 L600,60 L720,35 L840,52 L960,28 L1080,48 L1200,22 L1320,45 L1440,18 L1440,0 Z" fill="#F4F6F9" />
        </svg>
      </div>
    </section>);

}