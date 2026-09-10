'use client';
import React, { useEffect, useState} from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const [lang, setLang] = useState<'en' | 'ka'>('en');
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
    const handleLang = (e: Event) => setLang((e as CustomEvent).detail);
    window.addEventListener('langChange', handleLang);
    return () => window.removeEventListener('langChange', handleLang);
  }, []);

  const navLinks = [
    { label: 'About', labelKa: 'ჩვენს შესახებ', href: '#about' },
    { label: 'Activities', labelKa: 'აქტივობები', href: '#activities' },
    { label: 'Trainers', labelKa: 'მწვრთნელები', href: '#trainers' },
    { label: 'Rooms', labelKa: 'ოთახები', href: '#rooms' },
    { label: 'Gallery', labelKa: 'გალერეა', href: '#gallery' },
    { label: 'Camps', labelKa: 'ბანაკები', href: '#camps' },
    { label: 'Register', labelKa: 'რეგისტრაცია', href: '#register' },
  ];

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--footer-dark)' }}>
      {/* Mountain SVG divider */}
      <div className="w-full" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full" style={{ height: 80, display: 'block' }}>
          <path
            d="M0,80 L0,55 L80,20 L160,45 L240,8 L320,38 L400,5 L480,35 L560,15 L640,42 L720,10 L800,40 L880,18 L960,48 L1040,12 L1120,44 L1200,22 L1280,50 L1360,28 L1440,52 L1440,80 Z"
            fill="var(--background)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AppLogo size={44} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
              <div>
                <span className="font-heading font-black text-xl text-white block">POLSPORT</span>
                <span className="text-white/50 text-xs tracking-widest uppercase">
                  {lang === 'ka' ? 'სადაც ჩემპიონები იწყებენ' : 'Where Champions Begin'}
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {lang === 'ka' ?'წლის ბანაკი ბავშვებისთვის ბაკურიანის გულში, საქართველოში.' :'Year-round mountain camp for children in the heart of Bakuriani, Georgia.'}
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white/70 uppercase tracking-widest mb-5">
              {lang === 'ka' ? 'კონტაქტი' : 'Contact'}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Icon name="MapPinIcon" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span>Trialeti St 1, Bakuriani, Georgia</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Icon name="PhoneIcon" size={16} className="text-accent flex-shrink-0" />
                <a href="tel:+995577500243" className="hover:text-white transition-colors">+995 577 50 02 43</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Icon name="PhoneIcon" size={16} className="text-accent flex-shrink-0" />
                <a href="tel:+995367240243" className="hover:text-white transition-colors">+995 367 24 02 43</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Icon name="EnvelopeIcon" size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:info@polsport.ge" className="hover:text-white transition-colors">info@polsport.ge</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social + Hours */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white/70 uppercase tracking-widest mb-5">
              {lang === 'ka' ? 'სოციალური მედია' : 'Follow Us'}
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: 'facebook', label: 'Facebook', href: '#', color: '#1877F2' },
                { icon: 'instagram', label: 'Instagram', href: '#', color: '#E1306C' },
                { icon: 'youtube', label: 'YouTube', href: '#', color: '#FF0000' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = s.color; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'; }}
                >
                  {s.icon === 'facebook' && (
                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  )}
                  {s.icon === 'instagram' && (
                    <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  )}
                  {s.icon === 'youtube' && (
                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1B3F6B" /></svg>
                  )}
                </a>
              ))}
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm text-white/70 uppercase tracking-widest mb-3">
                {lang === 'ka' ? 'სამუშაო საათები' : 'Office Hours'}
              </h4>
              <p className="text-white/50 text-sm">
                {lang === 'ka' ? 'ორშ–პარ: 10:00–18:00' : 'Mon–Fri: 10:00–18:00'}
              </p>
              <p className="text-white/50 text-sm">
                {lang === 'ka' ? 'შაბ–კვი: 10:00–15:00' : 'Sat–Sun: 10:00–15:00'}
              </p>
            </div>
          </div>
        </div>

        {/* Nav links row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-8 pb-8 border-b border-white/10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm font-medium text-white/40 hover:text-white transition-colors duration-200"
            >
              {lang === 'ka' ? link.labelKa : link.label}
            </button>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <p>© {year} Polsport Bakuriani · პოლსპორტი. {lang === 'ka' ? 'ყველა უფლება დაცულია.' : 'All rights reserved.'}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{lang === 'ka' ? 'კონფიდენციალობა' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-white transition-colors">{lang === 'ka' ? 'პირობები' : 'Terms of Service'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}