'use client';

import { AnimatePresence, motion } from 'framer-motion';
import TextInput from './inputs/textInput';
import TextArea from './inputs/textArea';
import SingleSelect from './inputs/singleSelect';
import MultiSelect from './inputs/multiSelect';
import YesNo from './inputs/yesNo';
import Scale from './inputs/scale';

const INPUT_MAP = {
  text: TextInput,
  textarea: TextArea,
  singleSelect: SingleSelect,
  multiSelect: MultiSelect,
  yesNo: YesNo,
  scale: Scale,
};

const variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  value,
  onChange,
}) {
  const InputComponent = INPUT_MAP[question.type];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="mx-auto w-full max-w-[520px]"
      >
        <p className="text-[11px] uppercase tracking-[3px] opacity-25 mb-4">
          Pytanie {questionIndex + 1} z {totalQuestions}
        </p>

        <h2 className="text-[26px] font-semibold leading-snug mb-2.5 text-white">
          {question.label}
        </h2>

        {question.description && (
          <p className="text-sm opacity-35 leading-relaxed mb-8">
            {question.description}
          </p>
        )}

        {InputComponent && (
          <InputComponent
            question={question}
            value={value}
            onChange={onChange}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
