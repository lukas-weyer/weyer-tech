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
          <div className="divider" />

          <article className="prose dark:prose-invert">
            <ArticleImage
              src="/lukasz_weyer_zrm.jpeg"
              alt="Łukasz Weyer - zdjęcie autora - ratownictwo medyczne"
              mask="squircle"
            />
            <h2>Ratownictwo medyczne</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              esse in ipsam quasi dolor minima, eos assumenda debitis illo!
              Perspiciatis similique amet ea expedita illum delectus debitis
              fugit quos sint?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              esse in ipsam quasi dolor minima, eos assumenda debitis illo!
              Perspiciatis similique amet ea expedita illum delectus debitis
              fugit quos sint?
            </p>

            <ArticleImage
              src="/weyer-tech.png"
              alt="weyer.tech - logo"
              mask="square"
            />
            <h2>Programowanie</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              esse in ipsam quasi dolor minima, eos assumenda debitis illo!
              Perspiciatis similique amet ea expedita illum delectus debitis
              fugit quos sint?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              esse in ipsam quasi dolor minima, eos assumenda debitis illo!
              Perspiciatis similique amet ea expedita illum delectus debitis
              fugit quos sint?
            </p>

            <ArticleImage
              src="/lukasz_weyer_zphm.jpeg"
              alt="Łukasz Weyer - zdjęcie autora - zespół pomocy humanitarno-medycznej"
              mask="squircle"
            />
            <h2>Zespół Pomocy Humanitarno-Medycznej</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              esse in ipsam quasi dolor minima, eos assumenda debitis illo!
              Perspiciatis similique amet ea expedita illum delectus debitis
              fugit quos sint?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              esse in ipsam quasi dolor minima, eos assumenda debitis illo!
              Perspiciatis similique amet ea expedita illum delectus debitis
              fugit quos sint?
            </p>
          </article>
        </div>
      </div>
    </MotionDiv>
  );
}
