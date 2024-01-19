import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from './MotionDiv';
import Message from './message';

const item = {
  hidden: {
    // display: 'none',
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    // transitionEnd: {
    //   display: 'block',
    // },
  },
};

export default function Hero() {
  return (
    <div className="md:mockup-window md:border md:bg-base-300">
      <div className="flex flex-col justify-center px-6 py-12 md:bg-base-200 md:px-10 md:py-16">
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Message>Hej! Jestem Łukasz 👋🏻</Message>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Message>
            Pasjonuję się ratownictwem medycznym 🚑 i programowaniem 👨🏻‍💻 – to
            właśnie tym zajmuję się na co dzień! Specjalizuję się w tworzeniu
            aplikacji webowych przeznaczonych dla medyków.
          </Message>
        </MotionDiv>
        <div className="divider" />
        <MotionDiv
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center">
            <div className="avatar chat-image">
              <div className="w-10 rounded-full lg:w-10">
                <Image
                  src="/lukasz_weyer.jpeg"
                  width={80}
                  height={80}
                  alt="Picture of the author"
                  priority={true}
                  // placeholder="blur"
                  // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                />
              </div>
            </div>
            <span className="chat-header mx-4">Łukasz Weyer pisze</span>
            <span className="loading loading-dots loading-sm" />
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
