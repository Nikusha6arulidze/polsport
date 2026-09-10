'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const trainers = [
  {
    name: 'Giorgi Mchedlishvili',
    nameKa: 'გიორგი მჭედლიშვილი',
    role: 'Head Ski Instructor',
    roleKa: 'მთავარი სკი-ინსტრუქტორი',
    roleColor: '#3B63AB',
    bio: '15+ years on Bakuriani slopes. Former national competitor who turned a passion for skiing into a lifelong mission to inspire young athletes.',
    bioKa: '15+ წელი ბაკურიანის ფერდობებზე. ყოფილი ეროვნული მოთამაშე, ვინც თხილამურებისადმი სიყვარული ახალ თაობაზე გადასცემს.',
    fact: '🥇 National Ski Champion 2009',
    factKa: '🥇 ეროვნული ჩემპიონი 2009',
    photo: '/assets/images/polsport-1784811273809.jpg',
    photoAlt: 'Ski instructor on snowy slopes Bakuriani, athletic posture, blue ski jacket',
  },
  {
    name: 'Nino Kvaratskhelia',
    nameKa: 'ნინო კვარაცხელია',
    role: 'Ski Instructor',
    roleKa: 'სკი-ინსტრუქტორი',
    roleColor: '#5b7fc5',
    bio: 'Beginner specialist with endless patience. Nino has taught over 200 first-time skiers, making every lesson fun and fear-free.',
    bioKa: 'დამწყებთა სპეციალისტი, განუზომელი მოთმინებით. ნინომ 200-ზე მეტი პირველჯერადი მოსწავლე გაწვრთნა.',
    fact: '❤️ 200+ first-time skiers taught',
    factKa: '❤️ 200+ პირველჯერადი სტუდენტი',
    photo: '/assets/images/697155470_1487572480048151_164838605185672275_n-1784811386564.jpg',
    photoAlt: 'Female ski instructor smiling at mountain camp, warm and approachable, winter gear',
  },
  {
    name: 'Davit Beridze',
    nameKa: 'დავით ბერიძე',
    role: 'Summer Activities Coach',
    roleKa: 'ზაფხულის კოაჩი',
    roleColor: '#02B3B9',
    bio: 'Adventure specialist leading hiking, team sports, and outdoor challenges. Davit makes every summer day an unforgettable expedition.',
    bioKa: 'სათავგადასავლო სპეციალისტი, ლაშქრობის, გუნდური სპორტისა და გარე გამოწვევების ლიდერი.',
    fact: '🥾 Hiked every trail in Bakuriani',
    factKa: '🥾 ბაკურიანის ყველა ბილიკი გავლილი',
    photo: '/assets/images/696526874_1487572553381477_4667146978406524706_n-1784811386073.jpg',
    photoAlt: 'Male outdoor activities coach at summer camp, mountains in background, energetic pose',
  },
  {
    name: 'Tamar Natadze',
    nameKa: 'თამარ ნათაძე',
    role: 'Camp Director',
    roleKa: 'ბანაკის დირექტორი',
    roleColor: '#BF1E2E',
    bio: 'The heart of Polsport. Tamar keeps everything running smoothly and every child smiling — a logistics genius and child psychology expert.',
    bioKa: 'პოლსპორტის გული. თამარი ყველაფერს სრულყოფილად ინახავს — ლოჯისტიკის გენიოსი და ბავშვთა ფსიქოლოგიის ექსპერტი.',
    fact: '🌟 15 years running Polsport',
    factKa: '🌟 15 წელი პოლსპორტის ხელმძღვანელობა',
    photo: '/assets/images/68339549_1564496850364398_896731730512183296_n-1784811385133.jpg',
    photoAlt: 'Camp director smiling warmly at mountain facility, professional and approachable',
  },
];

export default function TrainersSection() {
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

  return (
    <section id="trainers" ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="text-center mb-16"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 block">
            {lang === 'ka' ? 'გუნდი' : 'The Team'}
          </span>
          <h2 className="font-heading font-black text-section-title text-foreground">
            {lang === 'ka' ? 'გაიცანი ჩვენი მწვრთნელები' : 'Meet Our Trainers'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, i) => (
            <div
              key={trainer.name}
              className="trainer-card-hover group relative bg-white rounded-3xl overflow-hidden shadow-sm"
              style={{
                border: '1.5px solid var(--border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(50px)',
                transition: `all 0.7s cubic-bezier(0.34,1.56,0.64,1)`,
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <AppImage
                  src={trainer.photo}
                  alt={trainer.photoAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                {/* Role badge */}
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold"
                  style={{ background: trainer.roleColor }}
                >
                  {lang === 'ka' ? trainer.roleKa : trainer.role}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                  {lang === 'ka' ? trainer.nameKa : trainer.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {lang === 'ka' ? trainer.bioKa : trainer.bio}
                </p>
              </div>

              {/* Hover achievement banner */}
              <div
                className="absolute bottom-0 left-0 right-0 py-3 px-5 text-center text-sm font-bold text-white translate-y-full group-hover:translate-y-0 transition-transform duration-400"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
              >
                {lang === 'ka' ? trainer.factKa : trainer.fact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}