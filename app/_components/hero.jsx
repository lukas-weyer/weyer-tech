import { MotionDiv } from './motionDiv';

export default function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Glow orbs */}
      <div className="animate-float pointer-events-none absolute left-[10%] top-[15%] h-[400px] w-[400px] rounded-full bg-rose-500/[0.15] blur-[80px]" />
      <div className="animate-float-delayed pointer-events-none absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-purple-500/[0.12] blur-[80px]" />
      <div className="animate-float-slow pointer-events-none absolute bottom-[10%] left-[30%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.08] blur-[60px]" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <MotionDiv
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-[72px]">
            weyer<span className="gradient-text">.tech</span>
          </h1>
        </MotionDiv>

        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="mt-6 text-base font-light text-white/50 md:text-lg">
            Buduję strony i aplikacje. Masz pomysł? Odezwij się.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="mailto:kontakt@weyer.tech"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,45,99,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(255,45,99,0.4)]"
          >
            Napisz do mnie
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </MotionDiv>
      </div>

      {/* Scroll indicator */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10"
      >
        <a
          href="#projects"
          className="flex flex-col items-center gap-2 transition-opacity hover:opacity-60"
        >
          <span className="text-[10px] font-medium uppercase tracking-[3px] text-white/20">
            scroll
          </span>
          <div className="animate-bounce-slow">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white/20"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </a>
      </MotionDiv>
    </header>
  );
}
