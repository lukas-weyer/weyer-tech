import { MotionDiv } from './motionDiv';

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
};

const container = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
  hidden: {},
};

export default function ChatWindow() {
  return (
    <section className="section-container py-24">
      <MotionDiv
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-3xl"
      >
        <MotionDiv
          variants={item}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Kim jestem
          </span>
        </MotionDiv>

        <MotionDiv variants={item} transition={{ duration: 0.5 }}>
          <h2 className="mb-6 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Hej! Jestem{' '}
            <span className="gradient-text">Łukasz</span>
          </h2>
        </MotionDiv>

        <MotionDiv variants={item} transition={{ duration: 0.5 }}>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-base-content/70">
            Na co dzień jeżdżę karetką, a po godzinach koduję. Ratownictwo
            medyczne i programowanie – dwie zupełnie różne rzeczy, a jednak obie
            napędzają mnie tak samo.
          </p>
        </MotionDiv>

        <MotionDiv
          variants={item}
          transition={{ duration: 0.5 }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-base-content/5 bg-base-200/50 p-6 text-center transition-colors hover:border-primary/20">
            <div className="mb-3 text-3xl">🚑</div>
            <h3 className="mb-1 font-semibold">Ratownik medyczny</h3>
            <p className="text-sm text-base-content/50">Od 2008 roku</p>
          </div>
          <div className="rounded-2xl border border-base-content/5 bg-base-200/50 p-6 text-center transition-colors hover:border-primary/20">
            <div className="mb-3 text-3xl">👨🏻‍💻</div>
            <h3 className="mb-1 font-semibold">Web developer</h3>
            <p className="text-sm text-base-content/50">React & Next.js</p>
          </div>
          <div className="rounded-2xl border border-base-content/5 bg-base-200/50 p-6 text-center transition-colors hover:border-primary/20">
            <div className="mb-3 text-3xl">🌍</div>
            <h3 className="mb-1 font-semibold">ZPHM</h3>
            <p className="text-sm text-base-content/50">Pomoc humanitarna</p>
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
