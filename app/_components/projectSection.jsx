import { MotionDiv } from './motionDiv';
import ParallaxImage from './parallaxImage';

const fadeLeft = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -40 },
};

const fadeRight = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 40 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
  hidden: {},
};

export default function ProjectSection({ project, index }) {
  const { title, description, tech, url, img, alt, gradient } = project;
  const number = String(index + 1).padStart(2, '0');
  const isReversed = index % 2 !== 0;

  return (
    <>
      <div className="section-divider" />
      <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-16">
        {/* Background gradient unique per project */}
        <div className={`pointer-events-none absolute inset-0 opacity-60 ${gradient}`} />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <MotionDiv
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${isReversed ? 'lg:[direction:rtl]' : ''}`}
          >
            {/* Info column */}
            <MotionDiv
              variants={isReversed ? fadeRight : fadeLeft}
              transition={{ duration: 0.6 }}
              className={`relative ${isReversed ? 'lg:[direction:ltr]' : ''}`}
            >
              {/* Big number */}
              <span className="pointer-events-none absolute -left-2 -top-5 select-none text-[120px] font-black leading-none max-lg:text-[80px]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {number}
              </span>

              <div className="relative">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[4px] text-white/30">
                  Projekt {number}
                </p>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-[42px] md:leading-tight">
                  {title}
                </h2>
                <p className="mb-6 text-base leading-relaxed text-white/50">
                  {description}
                </p>
                <div className="mb-8 flex flex-wrap gap-2">
                  {tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-1.5 text-[11px] font-medium text-white/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-rose-500 transition-all duration-300 hover:gap-3.5"
                >
                  Zobacz projekt
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform duration-300"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </MotionDiv>

            {/* Screenshot column */}
            <MotionDiv
              variants={isReversed ? fadeLeft : fadeRight}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={isReversed ? 'lg:[direction:ltr]' : ''}
            >
              <ParallaxImage
                src={img}
                alt={alt}
                width={800}
                height={500}
                placeholder={!img ? gradient : undefined}
              />
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
    </>
  );
}
