'use client';
import React, { useState, useEffect, useCallback } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'About', labelKa: 'ჩვენს შესახებ', href: '#about' },
  { label: 'Activities', labelKa: 'აქტივობები', href: '#activities' },
  { label: 'Trainers', labelKa: 'მწვრთნელები', href: '#trainers' },
  { label: 'Rooms', labelKa: 'ოთახები', href: '#rooms' },
  { label: 'Gallery', labelKa: 'გალერეა', href: '#gallery' },
  { label: 'Camps', labelKa: 'ბანაკები', href: '#camps' },
];

interface HeaderProps {
  lang?: 'en' | 'ka';
  onLangChange?: (lang: 'en' | 'ka') => void;
}

export default function Header({ lang: externalLang, onLangChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'ka'>('en');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (externalLang) setLang(externalLang);
  }, [externalLang]);

  const handleLang = (l: 'en' | 'ka') => {
    setLang(l);
    onLangChange?.(l);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('langChange', { detail: l }));
    }
  };

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-[500] transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(59,99,171,0.10)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <AppLogo size={40} />
          <span
            className="font-heading font-black text-xl tracking-tight hidden sm:block"
            style={{ color: scrolled ? 'var(--primary)' : 'white', textShadow: scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.3)' }}
          >
            POLSPORT
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-semibold tracking-wide transition-colors duration-200 relative group"
              style={{ color: scrolled ? 'var(--foreground)' : 'rgba(255,255,255,0.92)', textShadow: scrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              {lang === 'ka' ? link.labelKa : link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 rounded-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full overflow-hidden border border-white/20" style={{ background: scrolled ? 'rgba(59,99,171,0.08)' : 'rgba(255,255,255,0.15)' }}>
            {(['en', 'ka'] as const).map((l) => (
              <button
                key={l}
                onClick={() => handleLang(l)}
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: lang === l ? 'var(--primary)' : 'transparent',
                  color: lang === l ? 'white' : (scrolled ? 'var(--foreground)' : 'white'),
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('#register')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', boxShadow: '0 4px 16px rgba(59,99,171,0.3)' }}
          >
            {lang === 'ka' ? 'რეგისტრაცია' : 'Register Now'}
          </button>

          <button
            className="lg:hidden p-2 rounded-xl"
            style={{ color: scrolled ? 'var(--foreground)' : 'white' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-border shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-primary/5 transition-colors"
              >
                {lang === 'ka' ? link.labelKa : link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#register')}
              className="mt-2 w-full py-3 rounded-xl font-bold text-sm text-white text-center"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
            >
              {lang === 'ka' ? 'რეგისტრაცია' : 'Register Now'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}