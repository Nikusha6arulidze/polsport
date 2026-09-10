'use client';
import React, { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
}

export default function CursorSparkle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    const colors = ['#3B63AB', '#02B3B9', '#BF1E2E', '#FFFFFF', '#F4F6F9'];
    let lastX = 0, lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = Math.abs(e.clientX - lastX);
      const dy = Math.abs(e.clientY - lastY);
      if (dx + dy < 10) return;
      lastX = e.clientX;
      lastY = e.clientY;

      if (!containerRef.current) return;
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${4 + Math.random() * 6}px;
        height: ${4 + Math.random() * 6}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%) scale(0);
        animation: sparkle 0.6s ease forwards;
      `;
      containerRef.current.appendChild(particle);
      setTimeout(() => { if (particle.parentNode) particle.parentNode.removeChild(particle); }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9998]" />;
}