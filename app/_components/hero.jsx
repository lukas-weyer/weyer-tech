import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from './MotionDiv';
import Message from './message';
import Writing from './writing';

const container = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
      delayChildren: 2,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const writing = {
  visible: {
    opacity: 0,
  },
  hidden: {
    opacity: 1,
  },
};

const item = {
  visible: {
    display: 'block',
    opacity: 1,
    y: 0,
  },
  hidden: {
    display: 'none',
    opacity: 0,
    y: 10,
  },
};

export default function Hero() {
  return (
    <div className="container max-w-6xl">
      <div className="min-w-full md:mockup-window md:border md:bg-base-300">
        <div className="flex min-w-fit flex-col justify-center px-6 py-12 md:bg-base-200 md:px-10 md:py-16">
          <MotionDiv variants={container} initial="hidden" animate="visible">
            <MotionDiv variants={item}>
              <Message>Hej! Jestem Łukasz 👋🏻</Message>
            </MotionDiv>

            <MotionDiv variants={item}>
              <Message>
                Pasjonuję się ratownictwem medycznym 🚑 i programowaniem 👨🏻‍💻 – to
                właśnie tym zajmuję się na co dzień!
              </Message>
            </MotionDiv>

            <MotionDiv variants={item}>
              <Message>
                Poniej naszego chatu znajdziesz więcej informacji o mnie...
              </Message>
            </MotionDiv>

            <MotionDiv variants={item}>
              <Message>
                ...dowiesz się czym się zajmuję na codzień. Poznasz projekty
                które tworzę.
              </Message>
            </MotionDiv>

            <div className="divider" />
            <MotionDiv variants={writing}>
              <Writing />
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
