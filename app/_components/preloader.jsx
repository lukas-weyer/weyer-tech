'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('preloader_shown');
    }
    return true;
  });

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('preloader_shown', '1');
    }, 1400);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a12]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {/* Logo mark */}
          <motion.svg
            width="60"
            height="60"
            viewBox="0 0 200 210"
            fill="none"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M101.961 7.843h-31.1v131.509c0 35.661 28.908 64.57 64.569 64.57S200 175.013 200 139.352V7.843h-39.216c0 16.244-13.168 29.412-29.411 29.412-16.244 0-29.412-13.168-29.412-29.412z"
              fill="#FF2D63"
              fillOpacity={0.8}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            <motion.path
              d="M3.922 7.843h129.14v131.509c0 35.661-28.909 64.57-64.57 64.57-35.661 0-64.57-28.909-64.57-64.57V7.843z"
              fill="#FF2D63"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
