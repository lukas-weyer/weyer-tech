import Image from 'next/image';
import { MotionDiv } from './motionDiv';

const fadeUp = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 30 },
};

function AboutSection({ title, imageSrc, imageAlt, children, reverse }) {
  return (
    <MotionDiv
      variants={fadeUp}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12 ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className="shrink-0">
        <div className="overflow-hidden rounded-2xl border border-base-content/5 shadow-lg">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={280}
            height={280}
            className="h-56 w-56 object-cover sm:h-64 sm:w-64"
          />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="mb-4 text-2xl font-bold tracking-tight">{title}</h3>
        <div className="space-y-4 text-base leading-relaxed text-base-content/70">
          {children}
        </div>
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

        <div className="space-y-20">
          <AboutSection
            title="Ratownictwo medyczne"
            imageSrc="/lukasz_weyer_zrm.jpeg"
            imageAlt="Łukasz Weyer - ratownictwo medyczne"
          >
            <p className="border-l-2 border-primary/30 pl-4 text-lg font-medium italic text-base-content/80">
              Prawdziwa siła tkwi w empatii
            </p>
            <p>
              W ratownictwie medycznym jestem od 2008 roku. Syreny, światła,
              stres – to moja codzienność. Przez te lata nauczyłem się nie tylko
              jak pomagać medycznie, ale przede wszystkim jak zachować spokój,
              kiedy wokół panuje chaos.
            </p>
            <p>
              Najważniejsza lekcja?{' '}
              <strong>Empatia</strong>. Bez niej nie da się dobrze ocenić, czego
              tak naprawdę potrzebuje pacjent. To ona pomaga mi podejmować
              właściwe decyzje, nawet pod presją czasu.
            </p>
            <p>
              Praca w karetce nauczyła mnie też działać w zespole i szybko
              reagować – umiejętności, które przydają się nie tylko w medycynie.
            </p>
          </AboutSection>

          <div className="mx-auto h-px w-24 bg-base-content/10" />

          <AboutSection
            title="Programowanie"
            imageSrc="/weyer-tech.png"
            imageAlt="weyer.tech - logo"
            reverse
          >
            <p>
              Zaczęło się dość nietypowo – kodować uczyłem się na dyżurach w
              pogotowiu, w przerwach między wyjazdami. Z czasem to, co było
              hobby, stało się moim drugim zawodem.
            </p>
            <p>
              Skupiam się głównie na{' '}
              <strong>JavaScript</strong>, <strong>React</strong> i{' '}
              <strong>Next.js</strong>. Programowanie zaskakująco dużo ma
              wspólnego z ratownictwem – w obu trzeba szybko myśleć i
              kreatywnie rozwiązywać problemy.
            </p>
            <p>
              Działam jako freelancer. Buduję strony i aplikacje internetowe,
              a przy każdym projekcie staram się, żeby efekt był nie tylko ładny,
              ale przede wszystkim użyteczny.
            </p>
          </AboutSection>

          <div className="mx-auto h-px w-24 bg-base-content/10" />

          <AboutSection
            title="Zespół Pomocy Humanitarno-Medycznej"
            imageSrc="/lukasz_weyer_zphm.jpeg"
            imageAlt="Łukasz Weyer - zespół pomocy humanitarno-medycznej"
          >
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
              znaleźli się w sytuacji zagrożenia. Bywam też przy działaniach
              ratunkowych w innych krajach.
            </p>
            <p>
              To praca, która łączy wszystko, co umiem jako ratownik, z czymś
              większym. Daje ogromną satysfakcję, choć bywa wymagająca.
            </p>
          </AboutSection>
        </div>
      </MotionDiv>
    </section>
  );
}
