import { MotionDiv } from './motionDiv';
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

export default function ChatWindow() {
  return (
    <MotionDiv
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="w-full max-w-3xl md:mb-12"
    >
      <div className="md:mockup-window md:bg-base-300 md:shadow-lg">
        <div className="flex min-w-full flex-col justify-center p-4 md:bg-base-200 md:p-6">
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
                Poniżej naszego chatu znajdziesz więcej informacji o mnie...
              </Message>
            </MotionDiv>

            <MotionDiv variants={writing}>
              <Writing />
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
}
