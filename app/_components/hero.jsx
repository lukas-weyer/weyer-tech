import LogoSM from './logoSM';
import { MotionDiv } from './motionDiv';

export default function Hero() {
  return (
    <header className="my-8 flex items-center p-4 md:mt-0">
      <LogoSM className="mr-4 h-auto max-w-8 md:max-w-12" />
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <h1 className="font-logo text-xl font-normal md:text-5xl">
          weyer.tech
        </h1>
      </MotionDiv>
    </header>
  );
}
