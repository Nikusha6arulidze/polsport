'use client';
import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimating(true), 1200);
    const t2 = setTimeout(() => setVisible(false), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #1B3F6B 0%, #3B63AB 60%, #02B3B9 100%)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        opacity: animating ? 0 : 1,
        transform: animating ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: animating ? 'none' : 'all',
      }}
    >
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="mb-6">
        <polyline
          points="10,70 35,20 55,50 75,10 95,40 110,70"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="1000"
          style={{
            strokeDashoffset: 0,
            animation: 'drawPath 1.2s ease forwards',
          }}
        />
        <polyline
          points="0,70 120,70"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="font-heading font-black text-4xl text-white tracking-tight mb-1">POLSPORT</div>
      <div className="text-white/60 text-sm tracking-widest uppercase font-medium">Where Champions Begin</div>
    </div>
  );
}