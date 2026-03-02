import Image from 'next/image';
import LogoSM from './logoSM';
import { MotionDiv } from './motionDiv';

export default function Hero() {
  return (
    <header className="mesh-gradient relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Decorative orbs */}
      <div className="animate-float pointer-events-none absolute left-10 top-1/4 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />
      <div className="animate-float-delayed pointer-events-none absolute bottom-1/4 right-10 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

      <MotionDiv
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8"
      >
        <LogoSM className="h-auto w-20 drop-shadow-2xl md:w-28" />
      </MotionDiv>

      <MotionDiv
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-logo text-4xl tracking-tight md:text-7xl">
          weyer<span className="gradient-text">.tech</span>
        </h1>
      </MotionDiv>

      <MotionDiv
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 flex items-center gap-4 text-center"
      >
        <div className="h-px w-8 bg-base-content/20" />
        <p className="text-base font-light tracking-wide text-base-content/60 md:text-lg">
          Ratownik medyczny & Web developer
        </p>
        <div className="h-px w-8 bg-base-content/20" />
      </MotionDiv>

      <MotionDiv
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-10"
      >
        <div className="overflow-hidden rounded-full border-2 border-base-content/10 shadow-xl">
          <Image
            src="/lukasz_weyer.jpeg"
            width={128}
            height={128}
            alt="Łukasz Weyer"
            priority
            className="h-28 w-28 object-cover md:h-32 md:w-32"
          />
        </div>
      </MotionDiv>

      {/* Scroll indicator */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-base-content/30">
            przewiń
          </span>
          <MotionDiv
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-base-content/30"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </MotionDiv>
        </div>
      </MotionDiv>
    </header>
  );
}
