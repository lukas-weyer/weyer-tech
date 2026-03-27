'use client';

import { motion } from 'framer-motion';
import Logo from '@/app/_components/logo';

export default function WelcomeScreen({
  config,
  totalQuestions,
  sectionCount,
  onStart,
  hasProgress,
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {/* Background glow orbs */}
      <div
        className="pointer-events-none absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,45,99,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[20%] right-[25%] w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-[480px] text-center"
      >
        <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-70 mb-8">
          <Logo className="h-auto w-7" />
          <span className="font-logo text-sm tracking-wide">
            weyer<span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">.tech</span>
          </span>
        </a>

        <p className="text-[11px] uppercase tracking-[4px] opacity-30">
          Discovery
        </p>

        <h1 className="text-4xl font-bold mt-5 mb-2">
          Cześć,{' '}
          <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            {config.client.contact}
          </span>
          !
        </h1>

        <p className="text-[15px] opacity-40 leading-relaxed mb-3">
          Ta ankieta pomoże mi zrozumieć potrzeby{' '}
          <strong>{config.client.name}</strong> i przygotować dopasowaną wycenę.
        </p>

        {hasProgress ? (
          <p className="text-[13px] opacity-25 mb-9">
            Masz zapisane odpowiedzi — kontynuujesz od miejsca gdzie skończyłaś.
          </p>
        ) : (
          <p className="text-[13px] opacity-25 mb-9">
            Zajmie ok. 10-15 minut. Możesz przerwać i wrócić później —
            odpowiedzi się zapisują.
          </p>
        )}

        <button
          onClick={onStart}
          className="inline-block px-10 py-3.5 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full text-[14px] font-semibold cursor-pointer"
          style={{ boxShadow: '0 0 40px rgba(255,45,99,0.25)' }}
        >
          {hasProgress ? 'Kontynuuj →' : 'Zaczynamy →'}
        </button>

        <p className="mt-8 flex justify-center gap-6 text-[11px] opacity-20">
          {sectionCount} sekcji · ~{totalQuestions} pytań · 10-15 min
        </p>
      </motion.div>
    </div>
  );
}
