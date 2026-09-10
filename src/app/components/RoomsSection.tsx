'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';


const rooms = [
  {
    name: 'Standard Room',
    nameKa: 'სტანდარტული ოთახი',
    capacity: '3–4 kids',
    capacityKa: '3–4 ბავშვი',
    photo: '/assets/images/Polpsort_room-1784836210504.jpg',
    photoAlt: 'Cozy children\'s bunk bed room in mountain chalet, warm lighting, wooden walls',
    amenities: [
      { icon: '🛏️', label: 'Bunk Beds', labelKa: 'სარეცხი საწოლები' },
      { icon: '🏔️', label: 'Mountain View', labelKa: 'მთის ხედი' },
      { icon: '📶', label: 'Wi-Fi', labelKa: 'Wi-Fi' },
      { icon: '🧺', label: 'Daily Cleaning', labelKa: 'ყოველდღიური დასუფთავება' },
    ],
  },
  {
    name: 'Suite Room',
    nameKa: 'სუიტ ოთახი',
    capacity: '2 kids',
    capacityKa: '2 ბავშვი',
    photo: '/assets/images/Polsport_room_on_top-1784836287719.jpg',
    photoAlt: 'Comfortable twin room at mountain camp, natural light, alpine decor',
    amenities: [
      { icon: '🛏️', label: 'Twin Beds', labelKa: 'ორი საწოლი' },
      { icon: '🚿', label: 'En-suite', labelKa: 'საკუთარი აბაზანა' },
      { icon: '🏔️', label: 'Mountain View', labelKa: 'მთის ხედი' },
      { icon: '📶', label: 'Wi-Fi', labelKa: 'Wi-Fi' },
    ],
  },
  {
    name: 'Trainer Room',
    nameKa: 'მწვრთნელის ოთახი',
    capacity: '1–2 adults',
    capacityKa: '1–2 მოზრდილი',
    photo: '/assets/images/Polsport_chillspace-1784836389298.jpg',
    photoAlt: 'Quiet adult room at mountain camp facility, professional clean space',
    amenities: [
      { icon: '🛏️', label: 'Double Bed', labelKa: 'ორადგილიანი საწოლი' },
      { icon: '🚿', label: 'En-suite', labelKa: 'საკუთარი აბაზანა' },
      { icon: '🔇', label: 'Quiet Zone', labelKa: 'მშვიდი ზონა' },
      { icon: '📶', label: 'Wi-Fi', labelKa: 'Wi-Fi' },
    ],
  },
];

const hotspots = [
  { x: 20, y: 60, label: 'Morning Warm-Up', labelKa: 'დილის ვარჯიში', emoji: '🌅' },
  { x: 45, y: 40, label: 'Evening Games', labelKa: 'საღამოს თამაშები', emoji: '⚽' },
  { x: 70, y: 65, label: 'BBQ Nights', labelKa: 'ბარბექიუ ღამეები', emoji: '🔥' },
  { x: 85, y: 35, label: 'Team Meetings', labelKa: 'გუნდური შეხვედრები', emoji: '🤝' },
];

const facilityTicker = [
  { icon: '🍽️', label: 'Full Board', labelKa: 'სრული კვება' },
  { icon: '🧺', label: 'Laundry', labelKa: 'სარეცხი' },
  { icon: '🚐', label: 'Slope Shuttle', labelKa: 'ფერდობის შატლი' },
  { icon: '🔥', label: 'Evening Activities', labelKa: 'საღამოს აქტივობები' },
  { icon: '📶', label: 'Wi-Fi Throughout', labelKa: 'Wi-Fi ყველგან' },
  { icon: '🏥', label: 'First Aid', labelKa: 'სამედიცინო დახმარება' },
  { icon: '🎿', label: 'Ski Storage', labelKa: 'სკი-საცავი' },
  { icon: '🧊', label: 'Snow Equipment', labelKa: 'თოვლის აღჭურვილობა' },
];

export default function RoomsSection() {
  const [visible, setVisible] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
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
    <section id="rooms" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="text-center mb-16"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 block">
            {lang === 'ka' ? 'სად დარჩები' : 'Where You\'ll Stay'}
          </span>
          <h2 className="font-heading font-black text-section-title text-foreground">
            {lang === 'ka' ? 'კომფორტული, მყუდრო, სათავგადასავლოდ შექმნილი' : 'Comfortable, Cozy, Made for Adventure'}
          </h2>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {rooms.map((room, i) => (
            <div
              key={room.name}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-400 hover:shadow-xl hover:-translate-y-2"
              style={{
                border: '1.5px solid var(--border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1)`,
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <AppImage
                  src={room.photo}
                  alt={room.photoAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                  {lang === 'ka' ? room.capacityKa : room.capacity}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">{lang === 'ka' ? room.nameKa : room.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((a) => (
                    <span key={a.label} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground" style={{ background: 'var(--background)' }}>
                      <span>{a.icon}</span>
                      <span>{lang === 'ka' ? a.labelKa : a.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Yard Showcase with hotspots */}
        <div
          className="relative rounded-3xl overflow-hidden mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease 0.4s',
          }}
        >
          <AppImage
            src="/assets/images/696526874_1487572553381477_4667146978406524706_n-1784811386073.jpg"
            alt="Polsport outdoor yard in Bakuriani, sunny day, green mountains, children playing area"
            width={1200}
            height={400}
            className="w-full object-cover"
            style={{ height: 320 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,63,107,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div className="absolute bottom-4 left-6 text-white">
            <p className="font-heading font-bold text-xl">{lang === 'ka' ? 'ჩვენი ეზო' : 'Our Yard'}</p>
            <p className="text-white/70 text-sm">{lang === 'ka' ? 'დააჭირე ნებისმიერ წერტილს' : 'Click any hotspot to explore'}</p>
          </div>

          {hotspots.map((h, i) => (
            <button
              key={i}
              className="absolute"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
            >
              <div className="w-8 h-8 rounded-full bg-white/90 border-2 border-accent flex items-center justify-center text-sm hotspot-pulse cursor-pointer hover:scale-125 transition-transform">
                {h.emoji}
              </div>
              {activeHotspot === i && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-xl px-4 py-2 shadow-xl whitespace-nowrap z-10 border border-border">
                  <p className="font-bold text-sm text-foreground">{lang === 'ka' ? h.labelKa : h.label}</p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Facilities ticker */}
        <div
          className="relative overflow-hidden rounded-2xl py-4"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', opacity: visible ? 1 : 0, transition: 'all 0.8s ease 0.6s' }}
        >
          <div
            className="flex gap-12 whitespace-nowrap"
            style={{ animation: 'marquee 20s linear infinite' }}
          >
            {[...facilityTicker, ...facilityTicker].map((f, i) => (
              <span key={i} className="flex items-center gap-2 text-white font-bold text-sm">
                <span>{f.icon}</span>
                <span>{lang === 'ka' ? f.labelKa : f.label}</span>
                <span className="text-white/40 ml-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}