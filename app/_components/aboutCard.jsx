import Image from 'next/image';

import logo from '@/public/weyer-tech.png';
import ArticleImage from './articleImage';
import { MotionDiv } from './motionDiv';
import { delay } from 'framer-motion';

export default function AboutCard() {
  return (
    <MotionDiv
      className="w-full max-w-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5 }}
    >
      <div className="card md:bg-base-200 md:shadow-lg ">
        <div className="card-body items-center">
          <h3 className="card-title my-4 self-center text-base text-gray-600">
            Kilka słów o mnie...
          </h3>

          <article className="prose dark:prose-invert">
            <hr />
            <h2>Ratownictwo medyczne</h2>
            <ArticleImage
              src="/lukasz_weyer_zrm.jpeg"
              alt="Łukasz Weyer - zdjęcie autora - ratownictwo medyczne"
              mask="mask mask-squircle w-60"
            />
            <p>
              Pracuję w Zespołach Ratownictw Medycznego od 2008 roku. W świecie,
              gdzie syreny i światła są codziennym tłem, droga którą pokonałem
              nauczyła mnie nie tylko cennych umiejętności medycznych, ale
              również jak być ostoją spokoju w chaosie.
            </p>
            <blockquote className="text-2xl">
              <p>Prawdziwa siła tkwi w empatii</p>
            </blockquote>
            <p>
              Z czasem zrozumiałem, że
              <strong> prawdziwa siła tkwi w empatii </strong>- to klucz do
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
            <hr />
            <h2>Programowanie</h2>
            <ArticleImage
              src="/weyer-tech.png"
              alt="weyer.tech - logo"
              mask="mask mask-square w-60"
            />
            <p>
              Moja przygoda z programowaniem rozpoczęła się w nieoczekiwanych
              okolicznościach - podczas dyżurów w pogotowiu, kiedy między jednym
              wyjazdem do zdarzenia a drugim znajdowałem chwilę na naukę
              kodowania. Ta pasja do technologii rozwinęła się z czasem, stając
              się moim drugim zawodem.
            </p>
            <p>
              Świat programowania, podobnie jak medycyna ratunkowa, często
              wymaga szybkiego myślenia i kreatywnego rozwiązywania problemów.
              Zdobyte umiejętności w ratownictwie medycznym okazały się być
              nieocenioną wartością również w świecie technologii. Z wielką
              determinacją oddałem się nauce języków takich jak JavaScript,
              frameworków jak React i Next.js a także eksploracji nowoczesnych
              technologii webowych.
            </p>
            <p>
              Jako freelancer, każdy projekt jest dla mnie nowym wyzwaniem i
              okazją do rozwijania swoich umiejętności. Tworząc strony i
              aplikacje internetowe, skupiam się na zapewnieniu intuicyjnych,
              funkcjonalnych i estetycznych rozwiązań dla moich klientów. Moja
              praca programistyczna, choć różni się od ratownictwa medycznego,
              jest równie satysfakcjonująca, ponieważ każde zbudowane przeze
              mnie rozwiązanie jest kolejnym krokiem w kierunku ulepszania życia
              i pracy ludzi.
            </p>
            <hr />
            <h2>Zespół Pomocy Humanitarno-Medycznej</h2>
            <ArticleImage
              src="/lukasz_weyer_zphm.jpeg"
              alt="Łukasz Weyer - zdjęcie autora - zespół pomocy humanitarno-medycznej"
              mask="mask mask-squircle w-60"
            />
            <p>
              Moja najnowsza przygoda zawodowa rozpoczęła się wraz z dołączeniem
              do Zespołu Pomocy Humanitarno-Medycznej, jednostki działającej
              przy Prezesie Rady Ministrów. Powołana w maju 2022 roku, ZPHM
              skupia się na zapewnieniu natychmiastowej i niezbędnej pomocy
              ratowniczo-medycznej oraz humanitarnej, szczególnie osobom
              znajdującym się w stanie nagłego zagrożenia zdrowotnego poza
              granicami.
            </p>
            <p>
              W ramach ZPHM uczestniczę w akcjach ratunkowo-ewakuacyjnych
              obywateli polskich będących ofiarami wypadków i innych zdarzeń
              nagłych, a także wspieram działania ratunkowe podejmowane na
              terytorium innych państw. Praca w ZPHM wymaga nie tylko
              specjalistycznej wiedzy medycznej, ale także zdolności do
              szybkiego reagowania w skomplikowanych sytuacjach
              międzynarodowych.
            </p>
            <p>
              Doświadczenia zdobyte w ZPHM są dla mnie niezwykle cenne, zarówno
              pod względem zawodowym, jak i osobistym. Praca ta pozwala mi
              łączyć moje umiejętności ratownika medycznego z misją humanitarną,
              przyczyniając się do ratowania życia i zdrowia ludzi na całym
              świecie. Jest to wyjątkowa rola, która nieustannie przypomina mi o
              znaczeniu międzynarodowej solidarności i współpracy w dziedzinie
              ratownictwa i pomocy humanitarnej.
            </p>
          </article>
        </div>
      </div>
    </MotionDiv>
  );
}
