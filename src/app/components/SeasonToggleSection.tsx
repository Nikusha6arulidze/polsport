'use client';
import React, { useState, useEffect, useRef } from 'react';


const winterActivities = [
  { icon: '🎿', title: 'Alpine Skiing', titleKa: 'თხილამური', desc: 'Expert coaching on Bakuriani\'s slopes for all skill levels, from first-timers to racers.', descKa: 'ექსპერტი მწვრთნელობა ბაკურიანის ფერდობებზე ყველა დონისთვის.' },
  { icon: '🏂', title: 'Snowboarding', titleKa: 'სნოუბორდი', desc: 'Freestyle and freeride sessions with certified instructors on groomed terrain.', descKa: 'ფრისტაილი და ფრირაიდი სერტიფიცირებულ მწვრთნელებთან.' },
  { icon: '⛸️', title: 'Ice Skating', titleKa: 'კონკი', desc: 'Evening ice skating sessions that build balance, coordination, and confidence.', descKa: 'საღამოს კონკის სეანსები ბალანსისა და კოორდინაციის გასაუმჯობესებლად.' },
  { icon: '🎮', title: 'Après-ski Games', titleKa: 'დასვენების თამაშები', desc: 'Indoor games, movie nights, and social activities after a full day on the mountain.', descKa: 'შიდა თამაშები, კინო ღამეები და სოციალური აქტივობები.' },
];

const summerActivities = [
  { icon: '🥾', title: 'Mountain Hiking', titleKa: 'მთის ლაშქრობა', desc: 'Guided trails through Bakuriani\'s stunning alpine meadows and forest paths.', descKa: 'გიდებით ლაშქრობა ბაკურიანის ალპური მდელოებითა და ტყის გზებზე.' },
  { icon: '⚽', title: 'Team Sports', titleKa: 'გუნდური სპორტი', desc: 'Football, volleyball, basketball — build teamwork, strategy, and healthy competition.', descKa: 'ფეხბურთი, ფრენბურთი, კალათბურთი — გუნდური სამუშაო.' },
  { icon: '🎨', title: 'Creative Workshops', titleKa: 'შემოქმედებითი ვორქშოფები', desc: 'Art, photography, and nature crafts that spark imagination and self-expression.', descKa: 'ხელოვნება, ფოტოგრაფია და ბუნებრივი ხელსაქმე.' },
  { icon: '🔥', title: 'Campfire Nights', titleKa: 'კოცონის ღამეები', desc: 'Stories, songs, and stargazing around the fire — memories that last a lifetime.', descKa: 'ისტორიები, სიმღერები და ვარსკვლავების ცქერა კოცონთან.' },
];

export default function SeasonToggleSection() {
  const [season, setSeason] = useState<'winter' | 'summer'>('winter');
  const [lang, setLang] = useState<'en' | 'ka'>('en');
  const [visible, setVisible] = useState(false);
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

  const isWinter = season === 'winter';
  const activities = isWinter ? winterActivities : summerActivities;

  return (
    <section
      id="activities"
      ref={sectionRef}
      className="relative py-24 transition-all duration-700 overflow-hidden"
      style={{ background: isWinter ? 'linear-gradient(135deg, #EBF0F9 0%, #dde8f6 100%)' : 'linear-gradient(135deg, #F0FDF4 0%, #dcfce7 100%)' }}
    >
      {/* Seasonal particle overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={isWinter ? 'winter-particle' : 'summer-particle'}
            style={{
              left: `${(i * 8.3) % 100}%`,
              width: 6 + (i % 3) * 4,
              height: 6 + (i % 3) * 4,
              background: isWinter ? 'rgba(59,99,171,0.25)' : 'rgba(2,179,185,0.3)',
              borderRadius: isWinter ? '50%' : '0 50% 50% 50%',
              animationDuration: `${5 + i * 0.7}s`,
              animationDelay: `${i * 0.4}s`,
              top: isWinter ? '-20px' : '100%',
            }}
          />
        ))}
      </div>

      <div
        className="max-w-6xl mx-auto px-4 sm:px-6"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease' }}
      >
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4 block">
            {lang === 'ka' ? 'ჩვენი პროგრამები' : 'Our Programs'}
          </span>
          <h2 className="font-heading font-black text-section-title text-foreground mb-8">
            {lang === 'ka' ? 'აირჩიე შენი სეზონი' : 'Choose Your Season'}
          </h2>

          {/* Season Toggle */}
          <div className="inline-flex items-center gap-2 p-2 rounded-2xl" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.8)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <button
              onClick={() => setSeason('winter')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300"
              style={{
                background: isWinter ? 'linear-gradient(135deg, var(--primary), #5b7fc5)' : 'transparent',
                color: isWinter ? 'white' : 'var(--muted)',
                boxShadow: isWinter ? '0 4px 16px rgba(59,99,171,0.3)' : 'none',
                transform: isWinter ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              <span>❄️</span>
              <span>{lang === 'ka' ? 'ზამთარი' : 'WINTER'}</span>
            </button>
            <button
              onClick={() => setSeason('summer')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300"
              style={{
                background: !isWinter ? 'linear-gradient(135deg, #02B3B9, #00876b)' : 'transparent',
                color: !isWinter ? 'white' : 'var(--muted)',
                boxShadow: !isWinter ? '0 4px 16px rgba(2,179,185,0.3)' : 'none',
                transform: !isWinter ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              <span>☀️</span>
              <span>{lang === 'ka' ? 'ზაფხული' : 'SUMMER'}</span>
            </button>
          </div>

          {/* Temperature bar */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="text-blue-400 font-bold text-sm">❄️ -5°C</span>
            <div className="w-48 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: isWinter ? '20%' : '80%',
                  background: isWinter ? 'linear-gradient(to right, #3B63AB, #02B3B9)' : 'linear-gradient(to right, #02B3B9, #f59e0b)',
                }}
              />
            </div>
            <span className="text-amber-500 font-bold text-sm">☀️ 22°C</span>
          </div>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act, i) => (
            <div
              key={`${season}-${i}`}
              className="activity-card-hover bg-white rounded-2xl p-6 shadow-sm"
              style={{
                border: `1.5px solid ${isWinter ? 'rgba(59,99,171,0.12)' : 'rgba(2,179,185,0.15)'}`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1)`,
                transitionDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{ background: isWinter ? 'rgba(59,99,171,0.08)' : 'rgba(2,179,185,0.08)' }}
              >
                {act.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                {lang === 'ka' ? act.titleKa : act.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === 'ka' ? act.descKa : act.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}