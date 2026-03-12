'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let x = 0;
    let y = 0;
    let currentX = 0;
    let currentY = 0;
    let visible = false;
    let rafId;

    const onMouseMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        glow.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      visible = false;
      glow.style.opacity = '0';
    };

    const animate = () => {
      currentX += (x - currentX) * 0.08;
      currentY += (y - currentY) * 0.08;
      glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full bg-rose-500/[0.06] opacity-0 blur-[80px] transition-opacity duration-500"
    />
  );
}
