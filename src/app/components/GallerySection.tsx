'use client';
import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type FilterType = 'all' | 'winter' | 'summer' | 'rooms' | 'activities';

const galleryItems = [
  { id: 1, src: '/assets/images/polsport-1784811273809.jpg', alt: 'Skiers on snowy Bakuriani slopes, winter ski camp, blue sky mountains', caption: 'On the Slopes', captionKa: 'ფერდობებზე', filter: 'winter', size: 'tall' },
  { id: 2, src: '/assets/images/Polsport_house-1784811273593.jpg', alt: 'Polsport mountain chalet exterior, sunny day, green mountains Bakuriani', caption: 'Our Mountain Home', captionKa: 'ჩვენი სახლი', filter: 'rooms', size: 'wide' },
  { id: 3, src: '/assets/images/68339549_1564496850364398_896731730512183296_n-1784811385133.jpg', alt: 'Summer camp outdoor activities, children playing in mountain yard', caption: 'Summer Fun', captionKa: 'ზაფხულის სიხარული', filter: 'summer', size: 'normal' },
  { id: 4, src: '/assets/images/696526874_1487572553381477_4667146978406524706_n-1784811386073.jpg', alt: 'Camp activities outdoor, team sports in mountain setting', caption: 'Team Adventures', captionKa: 'გუნდური სათავგადასავლო', filter: 'activities', size: 'normal' },
  { id: 5, src: '/assets/images/697155470_1487572480048151_164838605185672275_n-1784811386564.jpg', alt: 'Mountain camp trainer with children, ski lesson preparation', caption: 'Expert Coaching', captionKa: 'ექსპერტი მწვრთნელობა', filter: 'winter', size: 'tall' },
  { id: 6, src: '/assets/images/polsport-1784811273809.jpg', alt: 'Winter mountain landscape Bakuriani, ski slopes panorama', caption: 'Winter Panorama', captionKa: 'ზამთრის პანორამა', filter: 'winter', size: 'wide' },
  { id: 7, src: '/assets/images/Polsport_house-1784811273593.jpg', alt: 'Polsport camp building surrounded by green mountains summer', caption: 'Surrounded by Nature', captionKa: 'ბუნებით გარშემორტყმული', filter: 'summer', size: 'normal' },
  { id: 8, src: '/assets/images/68339549_1564496850364398_896731730512183296_n-1784811385133.jpg', alt: 'Camp facility yard with mountain backdrop, outdoor recreation area', caption: 'The Yard', captionKa: 'ეზო', filter: 'rooms', size: 'normal' },
];

export default function GallerySection() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
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

  const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter((i) => i.filter === filter);
  const lightboxItem = lightbox !== null ? galleryItems.find((i) => i.id === lightbox) : null;
  const lightboxIdx = lightbox !== null ? filteredItems.findIndex((i) => i.id === lightbox) : -1;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight' && lightbox !== null) {
        const filtered = filteredItems;
        const idx = filtered.findIndex((i) => i.id === lightbox);
        if (idx < filtered.length - 1) setLightbox(filtered[idx + 1].id);
      }
      if (e.key === 'ArrowLeft' && lightbox !== null) {
        const filtered = filteredItems;
        const idx = filtered.findIndex((i) => i.id === lightbox);
        if (idx > 0) setLightbox(filtered[idx - 1].id);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, filter]);

  const filters: { key: FilterType; label: string; labelKa: string }[] = [
    { key: 'all', label: 'All', labelKa: 'ყველა' },
    { key: 'winter', label: 'Winter', labelKa: 'ზამთარი' },
    { key: 'summer', label: 'Summer', labelKa: 'ზაფხული' },
    { key: 'rooms', label: 'Rooms', labelKa: 'ოთახები' },
    { key: 'activities', label: 'Activities', labelKa: 'აქტივობები' },
  ];

  return (
    <section id="gallery" ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="text-center mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 block">
            {lang === 'ka' ? 'გალერეა' : 'Gallery'}
          </span>
          <h2 className="font-heading font-black text-section-title text-foreground mb-8">
            {lang === 'ka' ? 'ცხოვრება პოლსპორტში' : 'Life at Polsport'}
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="px-5 py-2 rounded-full font-bold text-sm transition-all duration-300"
                style={{
                  background: filter === f.key ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'white',
                  color: filter === f.key ? 'white' : 'var(--muted)',
                  border: `1.5px solid ${filter === f.key ? 'transparent' : 'var(--border)'}`,
                  boxShadow: filter === f.key ? '0 4px 16px rgba(59,99,171,0.25)' : 'none',
                  transform: filter === f.key ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {lang === 'ka' ? f.labelKa : f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease`,
                transitionDelay: `${i * 0.07}s`,
              }}
              onClick={() => setLightbox(item.id)}
            >
              <AppImage
                src={item.src}
                alt={item.alt}
                width={600}
                height={item.size === 'tall' ? 480 : item.size === 'wide' ? 300 : 380}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-sm">{lang === 'ka' ? item.captionKa : item.caption}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name="MagnifyingGlassPlusIcon" size={16} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[800] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="XMarkIcon" size={20} className="text-white" />
          </button>

          {lightboxIdx > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox(filteredItems[lightboxIdx - 1].id); }}
            >
              <Icon name="ChevronLeftIcon" size={24} className="text-white" />
            </button>
          )}
          {lightboxIdx < filteredItems.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox(filteredItems[lightboxIdx + 1].id); }}
            >
              <Icon name="ChevronRightIcon" size={24} className="text-white" />
            </button>
          )}

          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl w-full">
            <AppImage
              src={lightboxItem.src}
              alt={lightboxItem.alt}
              width={1200}
              height={800}
              className="w-full object-contain rounded-2xl"
              priority
            />
            <p className="text-white/80 text-center mt-4 font-medium">{lang === 'ka' ? lightboxItem.captionKa : lightboxItem.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}