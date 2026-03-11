'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxImage({ src, alt, width, height, placeholder }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[20px] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <motion.div style={{ y }}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 500}
            className="h-auto w-full object-cover"
          />
        ) : (
          <div
            className={`flex aspect-video w-full items-center justify-center text-sm text-white/15 ${placeholder || 'bg-gradient-to-br from-white/[0.03] to-white/[0.06]'}`}
          >
            {alt}
          </div>
        )}
      </motion.div>
    </div>
  );
}
