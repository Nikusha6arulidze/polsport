'use client';
import React, { useState, useEffect, useRef } from 'react';


type LangKey = 'en' | 'ka';

const labels: Record<string, Record<LangKey, string>> = {
  sectionTag: { en: 'Sign Up', ka: 'რეგისტრაცია' },
  headline: { en: "Secure Your Child's Spot", ka: 'დაიკავე შენი ბავშვის ადგილი' },
  childName: { en: "Child's Full Name", ka: 'ბავშვის სახელი და გვარი' },
  childAge: { en: "Child's Age", ka: 'ბავშვის ასაკი' },
  parentName: { en: 'Parent / Guardian Name', ka: 'მშობლის / მეურვის სახელი' },
  phone: { en: 'Phone Number', ka: 'ტელეფონის ნომერი' },
  email: { en: 'Email Address', ka: 'ელ-ფოსტა' },
  selectCamp: { en: 'Select Camp', ka: 'აირჩიე ბანაკი' },
  notes: { en: 'Additional Notes (optional)', ka: 'დამატებითი შენიშვნები (არასავალდებულო)' },
  submit: { en: "Secure My Child's Spot", ka: 'დაიკავე ჩემი ბავშვის ადგილი' },
  noSpam: { en: 'We respond within 24 hours. No spam, ever.', ka: 'ვპასუხობთ 24 საათის განმავლობაში. სპამი არ გაიგზავნება.' },
  successTitle: { en: "🎉 You're in!", ka: '🎉 ჩართული ხარ!' },
  successMsg: { en: "We'll confirm your spot within 24 hours.", ka: 'ჩვენ დავადასტურებთ შენს ადგილს 24 საათის განმავლობაში.' },
  campOptions: { en: 'Select a camp...', ka: 'აირჩიე ბანაკი...' },
  winter2025: { en: '⛷️ Winter Ski Camp 2025 (Jan 4–18)', ka: '⛷️ ზამთრის სკი ბანაკი 2025 (4–18 იანვ)' },
  summer2025: { en: '☀️ Summer Adventure Camp 2025 (Jul 7–21)', ka: '☀️ ზაფხულის ბანაკი 2025 (7–21 ივლ)' },
  winter2026: { en: '⛷️ Winter Ski Camp 2026 (Feb 1–15)', ka: '⛷️ ზამთრის სკი ბანაკი 2026 (1–15 თებ)' },
};

export default function RegistrationSection() {
  const [lang, setLang] = useState<LangKey>('en');
  const [formLang, setFormLang] = useState<LangKey>('en');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [visible, setVisible] = useState(false);
  const [age, setAge] = useState(10);
  const [selectedCamp, setSelectedCamp] = useState('');
  const [form, setForm] = useState({ childName: '', parentName: '', phone: '', email: '', notes: '' });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLang = (e: Event) => setLang((e as CustomEvent).detail);
    const handleCamp = (e: Event) => setSelectedCamp((e as CustomEvent).detail);
    window.addEventListener('langChange', handleLang);
    window.addEventListener('selectCamp', handleCamp);
    return () => {
      window.removeEventListener('langChange', handleLang);
      window.removeEventListener('selectCamp', handleCamp);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const t = (key: string) => labels[key]?.[formLang] || labels[key]?.en || key;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock submit — replace with actual Google Apps Script endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  };

  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: ['#3B63AB', '#02B3B9', '#BF1E2E', '#f59e0b', '#10b981'][i % 5],
    delay: i * 0.07,
    size: 6 + (i % 4) * 3,
  }));

  return (
    <section id="register" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-[600]">
          {confettiPieces.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left,
                top: '-20px',
                width: p.size,
                height: p.size,
                background: p.color,
                borderRadius: '2px',
                animation: `confettiFall ${2 + Math.random() * 2}s ease ${p.delay}s forwards`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className="text-center mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 block">{t('sectionTag')}</span>
          <h2 className="font-heading font-black text-section-title text-foreground">{t('headline')}</h2>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease 0.2s' }}
        >
          {/* Illustration side */}
          <div className="hidden lg:flex flex-col justify-between h-full">
            <div className="rounded-3xl p-8 text-white" style={{ background: 'linear-gradient(135deg, #1B3F6B 0%, #3B63AB 60%, #02B3B9 100%)' }}>
              <svg viewBox="0 0 300 200" fill="none" className="w-full mb-6">
                <path d="M0,200 L0,140 L40,80 L80,120 L120,40 L160,90 L200,30 L240,80 L280,50 L300,70 L300,200 Z" fill="rgba(255,255,255,0.08)" />
                <path d="M0,200 L0,160 L50,110 L100,150 L150,70 L200,120 L250,80 L300,100 L300,200 Z" fill="rgba(255,255,255,0.06)" />
                <circle cx="120" cy="140" r="30" fill="rgba(255,255,255,0.1)" />
                <circle cx="180" cy="150" r="20" fill="rgba(2,179,185,0.3)" />
                <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="48" fontFamily="sans-serif">⛷️</text>
              </svg>
              <h3 className="font-heading font-black text-2xl text-white mb-3">
                {lang === 'ka' ? 'რატომ პოლსპორტი?' : 'Why Polsport?'}
              </h3>
              <ul className="space-y-3">
                {[
                  { en: '✓ 15+ years of trusted experience', ka: '✓ 15+ წლის გამოცდილება' },
                  { en: '✓ Certified instructors on every slope', ka: '✓ სერტიფიცირებული მწვრთნელები' },
                  { en: '✓ Full board + slope shuttle included', ka: '✓ სრული კვება + შატლი' },
                  { en: '✓ 24/7 supervision and support', ka: '✓ 24/7 მეთვალყურეობა' },
                ].map((item, i) => (
                  <li key={i} className="text-white/85 text-sm font-medium">{lang === 'ka' ? item.ka : item.en}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-5 bg-white rounded-2xl shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-bold text-sm text-foreground">{lang === 'ka' ? 'გვიკავშირდი' : 'Call Us'}</p>
                  <p className="text-muted-foreground text-sm">+995 577 50 02 43</p>
                  <p className="text-muted-foreground text-sm">+995 367 24 02 43</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-border">
            {/* Form language toggle */}
            <div className="flex justify-end mb-6">
              <div className="flex items-center rounded-full overflow-hidden border border-border">
                {(['en', 'ka'] as LangKey[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setFormLang(l)}
                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                    style={{
                      background: formLang === l ? 'var(--primary)' : 'transparent',
                      color: formLang === l ? 'white' : 'var(--muted)',
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-heading font-black text-2xl text-foreground mb-3">{t('successTitle')}</h3>
                <p className="text-muted-foreground">{t('successMsg')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Child's Name */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">{t('childName')} *</label>
                  <input
                    type="text"
                    required
                    value={form.childName}
                    onChange={(e) => setForm({ ...form, childName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder={formLang === 'ka' ? 'მაგ: გიორგი ბერიძე' : 'e.g. Alex Johnson'}
                  />
                </div>

                {/* Child's Age */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">{t('childAge')} *</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAge(Math.max(6, age - 1))}
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center font-bold text-lg transition-colors hover:bg-primary/5"
                    >−</button>
                    <span className="font-heading font-black text-2xl text-primary w-12 text-center">{age}</span>
                    <button
                      type="button"
                      onClick={() => setAge(Math.min(18, age + 1))}
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center font-bold text-lg transition-colors hover:bg-primary/5"
                    >+</button>
                    <span className="text-muted-foreground text-sm ml-2">{formLang === 'ka' ? 'წელი' : 'years old'}</span>
                  </div>
                </div>

                {/* Parent Name */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">{t('parentName')} *</label>
                  <input
                    type="text"
                    required
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder={formLang === 'ka' ? 'მაგ: ნინო ბერიძე' : 'e.g. Sarah Johnson'}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">{t('phone')} *</label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl border border-border bg-input text-sm font-bold text-foreground flex-shrink-0">
                      <span>🇬🇪</span>
                      <span>+995</span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl border border-border bg-input text-foreground text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="577 50 02 43"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">{t('email')} *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder={formLang === 'ka' ? 'მაგ: nino@example.ge' : 'your@email.com'}
                  />
                </div>

                {/* Select Camp */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">{t('selectCamp')} *</label>
                  <select
                    required
                    value={selectedCamp}
                    onChange={(e) => setSelectedCamp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">{t('campOptions')}</option>
                    <option value="winter-2025">{t('winter2025')}</option>
                    <option value="summer-2025">{t('summer2025')}</option>
                    <option value="winter-2026">{t('winter2026')}</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wide">{t('notes')}</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder={formLang === 'ka' ? 'ნებისმიერი სპეციალური მოთხოვნა...' : 'Any special requirements or questions...'}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-heading font-black text-base text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 relative overflow-hidden"
                  style={{
                    background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #1B3F6B, #3B63AB, #02B3B9)',
                    boxShadow: loading ? 'none' : '0 8px 32px rgba(59,99,171,0.35)',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30 60" />
                      </svg>
                      {formLang === 'ka' ? 'გაგზავნა...' : 'Sending...'}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>🎿</span>
                      <span>{t('submit')}</span>
                    </span>
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground">{t('noSpam')}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}