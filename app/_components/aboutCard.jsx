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
              Pracuję w Zespołach Ratownictwa Medycznego od 2008 roku. W
              świecie, gdzie syreny i światła są codziennym tłem, droga którą
              pokonałem nauczyła mnie nie tylko cennych umiejętności medycznych,
              ale również jak być ostoją spokoju w chaosie.
            </p>
            <p>
              Z czasem zrozumiałem, że{' '}
              <strong>prawdziwa siła tkwi w empatii</strong> -- to klucz do
              zrozumienia potrzeb pacjentów, co pozwala mi na podejmowanie
              trafnych decyzji. Empatia, wrażliwość, determinacja to moje
              narzędzia, którymi służę innym.
            </p>
            <p>
              Praca w ratownictwie medycznym wykształciła we mnie umiejętność
              pracy zespołowej, zarządzania stresem, a także podejmowania
              szybkich decyzji. Te doświadczenia w znaczący sposób przyczyniły
              się do mojego osobistego i zawodowego rozwoju.
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
              Moja przygoda z programowaniem rozpoczęła się w nieoczekiwanych
              okolicznościach -- podczas dyżurów w pogotowiu, kiedy między
              jednym wyjazdem do zdarzenia a drugim znajdowałem chwilę na naukę
              kodowania. Ta pasja do technologii rozwinęła się z czasem, stając
              się moim drugim zawodem.
            </p>
            <p>
              Świat programowania, podobnie jak medycyna ratunkowa, często
              wymaga szybkiego myślenia i kreatywnego rozwiązywania problemów.
              Z wielką determinacją oddałem się nauce języków takich jak{' '}
              <strong>JavaScript</strong>, frameworków jak{' '}
              <strong>React</strong> i <strong>Next.js</strong>, a także
              eksploracji nowoczesnych technologii webowych.
            </p>
            <p>
              Jako freelancer, każdy projekt jest dla mnie nowym wyzwaniem i
              okazją do rozwijania swoich umiejętności. Tworząc strony i
              aplikacje internetowe, skupiam się na zapewnieniu intuicyjnych,
              funkcjonalnych i estetycznych rozwiązań dla moich klientów.
            </p>
          </AboutSection>

          <div className="mx-auto h-px w-24 bg-base-content/10" />

          <AboutSection
            title="Zespół Pomocy Humanitarno-Medycznej"
            imageSrc="/lukasz_weyer_zphm.jpeg"
            imageAlt="Łukasz Weyer - zespół pomocy humanitarno-medycznej"
          >
            <p>
              Moja najnowsza przygoda zawodowa rozpoczęła się wraz z dołączeniem
              do Zespołu Pomocy Humanitarno-Medycznej, jednostki działającej
              przy Prezesie Rady Ministrów. ZPHM -- powołany w maju 2022 roku,
              skupia się na zapewnieniu natychmiastowej i niezbędnej pomocy
              ratowniczo-medycznej oraz humanitarnej, szczególnie osobom
              znajdującym się w stanie nagłego zagrożenia zdrowotnego poza
              granicami.
            </p>
            <p>
              W ramach ZPHM uczestniczę w akcjach ratunkowo-ewakuacyjnych
              obywateli polskich będących ofiarami wypadków i innych zdarzeń
              nagłych, a także wspieram działania ratunkowe podejmowane na
              terytorium innych państw.
            </p>
            <p>
              Doświadczenia zdobyte w ZPHM są dla mnie niezwykle cenne, zarówno
              pod względem zawodowym, jak i osobistym. Praca ta pozwala mi
              łączyć moje umiejętności ratownika medycznego z misją humanitarną,
              przyczyniając się do ratowania życia i zdrowia ludzi na całym
              świecie.
            </p>
          </AboutSection>
        </div>
      </MotionDiv>
    </section>
  );
}
