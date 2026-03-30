'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Logo from '@/app/_components/logo';

/* ─── helpers ─── */

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function padPhase(n) {
  return String(n).padStart(2, '0');
}

/* ─── animated counter ─── */

function AnimatedNumber({ value, suffix = '', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const spring = useSpring(0, { duration: 1200, bounce: 0 });
  const display = useTransform(spring, (v) => formatNumber(Math.round(v)));
  const [text, setText] = useState('0');

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setText(v));
    return unsubscribe;
  }, [display]);

  return (
    <span ref={ref} className={className}>
      {text}
      {suffix}
    </span>
  );
}

/* ─── icons (inline SVG, 24x24, stroke) ─── */

const icons = {
  palette: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <path d="M15.5 14.5c0 2.5-1.5 4-3.5 4s-2.5-1-2.5-2 1-1.5 2-1.5h1.5c1.5 0 2.5-.5 2.5-2" />
    </svg>
  ),
  database: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  truck: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 4v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  'credit-card': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
};

/* ─── motion presets ─── */

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-80px' },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

/* ─── priority badge colors ─── */

function priorityGradient(priority) {
  switch (priority) {
    case 'Krytyczny':
      return 'from-rose-500 to-orange-500';
    case 'Wysoki':
      return 'from-rose-500 to-purple-500';
    case 'Średni':
      return 'from-purple-500 to-blue-500';
    default:
      return 'from-purple-500 to-blue-500';
  }
}

/* ─── section wrapper ─── */

function Section({ children, className = '' }) {
  return (
    <section className={`relative px-6 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

/* ─── MAIN COMPONENT ─── */

function PasswordGate({ password, clientName, onUnlock }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (input === password) {
      sessionStorage.setItem(`proposal_unlocked_${password}`, '1');
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a12] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm text-center"
      >
        <div className="mb-8">
          <Logo className="mx-auto h-auto w-8 mb-4" />
          <p className="text-[11px] uppercase tracking-[4px] opacity-30 mb-3">
            Wycena
          </p>
          <h1 className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              {clientName}
            </span>
          </h1>
          <p className="mt-2 text-sm opacity-30">
            Ten dokument jest chroniony hasłem
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Wpisz hasło..."
            autoFocus
            className={`w-full rounded-xl border bg-white/[0.04] px-5 py-4 text-center text-[15px] text-white placeholder-white/20 outline-none transition-all duration-300 ${
              error
                ? 'border-rose-500/50 shadow-[0_0_20px_rgba(255,45,99,0.15)]'
                : 'border-white/[0.08] focus:border-purple-500/50'
            }`}
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-gradient-to-r from-rose-500 to-purple-500 py-3.5 text-[13px] font-semibold shadow-[0_0_30px_rgba(255,45,99,0.2)] transition-all duration-200 hover:shadow-[0_0_40px_rgba(255,45,99,0.3)]"
          >
            Otwórz wycenę
          </button>
        </form>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm text-rose-400"
          >
            Nieprawidłowe hasło
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default function Proposal({ data }) {
  const {
    client,
    date,
    validUntil,
    summary,
    phases,
    extras,
    requirements,
    hosting,
  } = data;

  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!data.password) {
      setUnlocked(true);
      return;
    }
    const saved = sessionStorage.getItem(`proposal_unlocked_${data.password}`);
    if (saved) setUnlocked(true);
  }, [data.password]);

  if (!unlocked && data.password) {
    return (
      <PasswordGate
        password={data.password}
        clientName={client.name}
        onUnlock={() => setUnlocked(true)}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a12] text-white selection:bg-rose-500/30">
      {/* subtle radial glow at top */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[40%] left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-rose-500/[0.04] blur-[120px]" />
      </div>

      {/* ── 1. HEADER ── */}
      <header className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <a
            href="https://weyer.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block opacity-40 transition-opacity hover:opacity-70"
          >
            <Logo className="mx-auto h-10 w-auto" />
          </a>
        </motion.div>

        <motion.p
          className="mt-12 text-[11px] uppercase tracking-[4px] opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Wycena
        </motion.p>

        <motion.h1
          className="mt-4 pb-2 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-6xl font-bold tracking-tight text-transparent md:text-8xl leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {client.name}
        </motion.h1>

        <motion.p
          className="mt-4 text-lg opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Przygotowana dla: {client.contact}
        </motion.p>

        <motion.div
          className="mt-6 flex items-center gap-4 text-sm opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <span>{date}</span>
          <span className="h-1 w-1 rounded-full bg-white" />
          <span>Ważna do: {validUntil}</span>
        </motion.div>

        <motion.p
          className="mt-10 text-sm tracking-wide opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {summary.phases} etapy &middot; {summary.totalHours} godzin &middot;{' '}
          {summary.timeline}
        </motion.p>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-20"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </header>

      {/* ── 2. SUMMARY CARDS ── */}
      <Section>
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          {...staggerContainer}
        >
          {[
            {
              gradient: 'from-rose-500 to-purple-500',
              content: (
                <>
                  <AnimatedNumber value={summary.totalCost} suffix="" />
                  <span className="ml-1.5 text-lg">{summary.currency}</span>
                </>
              ),
              label: `Łączny koszt (Etap 1-${summary.phases})`,
            },
            {
              gradient: 'from-purple-500 to-blue-500',
              content: summary.timeline,
              label: 'Czas realizacji',
            },
            {
              gradient: 'from-rose-500 to-purple-500',
              content: <AnimatedNumber value={summary.totalHours} suffix="h" />,
              label: 'Godziny pracy',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8"
              {...staggerItem}
            >
              <div className={`whitespace-nowrap bg-gradient-to-r ${card.gradient} bg-clip-text pb-1 leading-[1.2] text-2xl font-bold text-transparent md:text-3xl`}>
                {card.content}
              </div>
              <p className="mt-3 text-sm opacity-30">{card.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── 3. PHASES ── */}
      {phases.map((phase, idx) => (
        <PhaseSection key={phase.id} phase={phase} index={idx} />
      ))}

      {/* ── 4. EXTRAS ── */}
      <Section>
        <div className="border-t border-white/[0.06] pt-24">
          <motion.div {...fadeUp}>
            <p className="text-[11px] uppercase tracking-[4px] opacity-30">
              Opcjonalnie
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Opcjonalne rozszerzenia
            </h2>
            <p className="mt-4 max-w-2xl opacity-50">
              Moduły, które możesz dodać na dowolnym etapie projektu.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-4 md:grid-cols-2"
            {...staggerContainer}
          >
            {extras.map((extra) => (
              <motion.div
                key={extra.name}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 opacity-80"
                {...staggerItem}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{extra.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed opacity-50">
                      {extra.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-lg font-bold text-transparent">
                      {formatNumber(extra.cost)} PLN
                    </span>
                    <p className="text-xs opacity-30">{extra.hours}h</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── 5. REQUIREMENTS ── */}
      <Section>
        <div className="border-t border-white/[0.06] pt-24">
          <motion.div {...fadeUp}>
            <p className="text-[11px] uppercase tracking-[4px] opacity-30">
              Przed startem
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Co potrzebujemy na start
            </h2>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            {...staggerContainer}
          >
            {requirements.map((req) => (
              <motion.div
                key={req.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6"
                {...staggerItem}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-purple-500/20 text-rose-400">
                  {icons[req.icon]}
                </div>
                <h3 className="mt-4 font-semibold">{req.title}</h3>
                <p className="mt-1 text-sm leading-relaxed opacity-50">
                  {req.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── 6. HOSTING ── */}
      <Section>
        <div className="border-t border-white/[0.06] pt-24">
          <motion.div {...fadeUp}>
            <p className="text-[11px] uppercase tracking-[4px] opacity-30">
              Utrzymanie
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Hosting i infrastruktura
            </h2>
          </motion.div>

          <motion.div
            className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8"
            {...fadeUp}
          >
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
                  ~{hosting.monthly}
                </span>
                <span className="ml-2 text-sm opacity-30">/ miesiąc</span>
                <p className="mt-2 text-sm opacity-50">{hosting.includes}</p>
              </div>
              <div className="shrink-0 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs opacity-40">
                Rozliczane miesięcznie
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── 7. HOW WE WORK ── */}
      <Section>
        <div className="border-t border-white/[0.06] pt-24">
          <motion.div {...fadeUp}>
            <p className="text-[11px] uppercase tracking-[4px] opacity-30">
              Współpraca
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Jak pracujemy
            </h2>
          </motion.div>

          <motion.div className="mt-12 space-y-0" {...staggerContainer}>
            {[
              {
                title: 'Płatność etapami',
                desc: 'Płacisz za każdy etap osobno — po jego zakończeniu i akceptacji.',
              },
              {
                title: 'Cotygodniowe demo',
                desc: 'Co tydzień pokazuję postępy na żywo — widzisz efekty pracy w czasie rzeczywistym.',
              },
              {
                title: 'Bieżący kontakt',
                desc: 'Piszesz kiedy chcesz — odpowiadam szybko, bez formalnych ticketów.',
              },
              {
                title: 'Poprawki w cenie',
                desc: 'Poprawki w ramach zakresu etapu są wliczone — żadnych ukrytych kosztów.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="relative flex gap-6 pb-10"
                {...staggerItem}
              >
                {/* timeline line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-500 text-sm font-bold">
                    {i + 1}
                  </div>
                  {i < 3 && (
                    <div className="mt-2 h-full w-px bg-gradient-to-b from-white/10 to-transparent" />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm opacity-50">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── 8. FOOTER / CTA ── */}
      <Section>
        <div className="border-t border-white/[0.06] pt-24">
          <motion.div {...fadeUp} className="text-center">
            <p className="text-[11px] uppercase tracking-[4px] opacity-30">
              Zaczynamy?
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-5xl">
              Następne kroki
            </h2>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4"
            {...staggerContainer}
          >
            {[
              { step: '01', label: 'Wybierasz etapy' },
              { step: '02', label: 'Krótki call' },
              { step: '03', label: 'Umowa' },
              { step: '04', label: 'Start' },
            ].map((s) => (
              <motion.div
                key={s.step}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center"
                {...staggerItem}
              >
                <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
                  {s.step}
                </span>
                <p className="mt-2 text-sm opacity-50">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="mt-20 text-center">
            <a
              href="mailto:kontakt@weyer.tech"
              className="inline-block rounded-full bg-gradient-to-r from-rose-500 to-purple-500 px-10 py-4 text-sm font-semibold tracking-wide text-white transition-shadow hover:shadow-lg hover:shadow-rose-500/20"
            >
              kontakt@weyer.tech
            </a>

            <div className="mt-8 flex items-center justify-center gap-4 text-sm opacity-30">
              <a
                href="https://weyer.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/20 underline-offset-4 transition-opacity hover:opacity-60"
              >
                weyer.tech
              </a>
              <span className="h-1 w-1 rounded-full bg-white" />
              <span>Wycena ważna do: {validUntil}</span>
            </div>
          </motion.div>
        </div>

        {/* bottom spacer */}
        <div className="h-16" />
      </Section>
    </div>
  );
}

/* ─── PHASE SECTION COMPONENT ─── */

function PhaseSection({ phase, index }) {
  const isOdd = index % 2 === 0;
  const glowColor = isOdd ? 'bg-rose-500/[0.03]' : 'bg-purple-500/[0.03]';
  const accentGradient = isOdd
    ? 'from-rose-500 to-purple-500'
    : 'from-purple-500 to-blue-500';

  return (
    <Section>
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/2 ${isOdd ? '-left-[20%]' : '-right-[20%]'} h-[60vh] w-[60vh] -translate-y-1/2 rounded-full ${glowColor} blur-[120px]`}
        />
      </div>

      <div className="border-t border-white/[0.06] pt-24">
        <motion.div {...fadeUp}>
          {/* ghost number */}
          <span className="text-8xl font-bold leading-none opacity-[0.04] md:text-[10rem]">
            {padPhase(phase.id)}
          </span>

          {/* title area */}
          <div className="-mt-12 md:-mt-20">
            <p className="text-[11px] uppercase tracking-[4px] opacity-30">
              Etap {phase.id}
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              {phase.title}
            </h2>
            <p
              className={`mt-1 bg-gradient-to-r ${accentGradient} bg-clip-text text-lg font-medium text-transparent`}
            >
              {phase.subtitle}
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed opacity-50">
              {phase.description}
            </p>
          </div>

          {/* stats row */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
            <span className="opacity-50">
              {phase.hours}h &middot; {formatNumber(phase.cost)} PLN &middot;{' '}
              {phase.timeline}
            </span>
            <span
              className={`rounded-full bg-gradient-to-r ${priorityGradient(phase.priority)} px-3 py-1 text-xs font-medium`}
            >
              {phase.priority}
            </span>
          </div>
        </motion.div>

        {/* items */}
        <motion.div className="mt-12 space-y-3" {...staggerContainer}>
          {phase.items.map((item) => (
            <motion.div
              key={item.name}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-colors hover:border-white/[0.1] hover:bg-white/[0.05]"
              {...staggerItem}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="font-semibold leading-snug">{item.name}</h4>
                  <p className="mt-1 text-sm leading-relaxed opacity-50">
                    {item.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-lg bg-gradient-to-r ${accentGradient} px-3 py-1 text-xs font-bold`}
                >
                  {item.hours}h
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* phase total */}
        <motion.div
          className="mt-8 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6"
          {...fadeUp}
        >
          <span className="text-sm font-medium opacity-50">
            Koszt etapu {phase.id}
          </span>
          <span
            className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-2xl font-bold text-transparent`}
          >
            {formatNumber(phase.cost)} PLN
          </span>
        </motion.div>
      </div>
    </Section>
  );
}
