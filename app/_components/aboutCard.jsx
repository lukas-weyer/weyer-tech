import { MotionDiv } from './motionDiv';

const fadeUp = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 30 },
};

function AboutSection({ title, children }) {
  return (
    <MotionDiv
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      <h3 className="mb-4 text-2xl font-bold tracking-tight">{title}</h3>
      <div className="space-y-4 text-base leading-relaxed text-base-content/70">
        {children}
      </div>
    </MotionDiv>
  );
}

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
  hidden: {},
};

export default function AboutCard() {
  return (
    <section className="section-container py-24">
      <MotionDiv
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <MotionDiv variants={fadeUp} transition={{ duration: 0.5 }} className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            O mnie
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Kilka słów o mnie
          </h2>
        </MotionDiv>

        <MotionDiv variants={stagger} className="mx-auto max-w-2xl space-y-20">
          <AboutSection title="Ratownictwo medyczne">
            <p>
              W ratownictwie medycznym jestem od 2008 roku. Syreny, światła,
              stres – to moja codzienność. Przez te lata nauczyłem się nie tylko
              udzielać pomocy, ale przede wszystkim zachowywać spokój, kiedy
              wokół panuje chaos.
            </p>
            <p>
              Najważniejsza lekcja?{' '}
              <strong>Empatia</strong>. Bez niej trudno zrozumieć, czego
              naprawdę potrzebuje pacjent. To dzięki niej podejmuję właściwe
              decyzje, nawet pod presją czasu.
            </p>
            <p>
              Praca w karetce nauczyła mnie też pracy zespołowej i szybkiego
              reagowania – to rzeczy, które przydają się nie tylko w medycynie.
            </p>
          </AboutSection>

          <div className="mx-auto h-px w-24 bg-base-content/10" />

          <AboutSection title="Programowanie">
            <p>
              Zaczęło się dość nietypowo – kodować uczyłem się na dyżurach w
              pogotowiu, w przerwach między wyjazdami. Z czasem to, co było
              hobby, stało się moim drugim zawodem.
            </p>
            <p>
              Skupiam się głównie na{' '}
              <strong>JavaScript</strong>, <strong>React</strong> i{' '}
              <strong>Next.js</strong>. Programowanie ma zaskakująco dużo
              wspólnego z ratownictwem – w obu trzeba szybko myśleć i
              kreatywnie rozwiązywać problemy.
            </p>
            <p>
              Działam jako freelancer. Buduję strony i aplikacje internetowe,
              a w każdym projekcie zależy mi na tym, żeby efekt był nie tylko
              ładny, ale przede wszystkim funkcjonalny.
            </p>
          </AboutSection>

          <div className="mx-auto h-px w-24 bg-base-content/10" />

          <AboutSection title="Zespół Pomocy Humanitarno-Medycznej">
            <p>
              Od niedawna jestem też częścią Zespołu Pomocy
              Humanitarno-Medycznej – jednostki przy Prezesie Rady Ministrów,
              działającej od maja 2022 roku. ZPHM wysyła pomoc medyczną i
              humanitarną tam, gdzie jest najbardziej potrzebna, szczególnie
              poza granicami Polski.
            </p>
            <p>
              W praktyce oznacza to udział w akcjach ewakuacyjnych i
              ratunkowych – pomagam Polakom, którzy za granicą mieli wypadek lub
              znaleźli się w sytuacji zagrożenia. Uczestniczę też w misjach
              ratunkowych w innych krajach.
            </p>
            <p>
              To praca, w której mogę wykorzystać wszystko, czego nauczyłem się
              jako ratownik. Bywa wymagająca, ale daje ogromną satysfakcję.
            </p>
          </AboutSection>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
