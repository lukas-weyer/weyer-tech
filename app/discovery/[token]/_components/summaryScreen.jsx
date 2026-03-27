'use client';

import { motion } from 'framer-motion';

const TAG_COLORS = [
  {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    text: 'text-rose-400',
  },
  {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
  },
  {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
  },
];

const DOT_COLORS = ['bg-rose-500', 'bg-purple-500'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function renderAnswer(question, answer) {
  if (answer === undefined || answer === null) {
    return <p className="text-[13px] opacity-30 italic">Pominięte</p>;
  }

  if (Array.isArray(answer)) {
    return (
      <div className="flex gap-1.5 flex-wrap mt-1">
        {answer.map((a, i) => {
          const color = TAG_COLORS[i % 3];
          return (
            <span
              key={a}
              className={`px-2.5 py-0.5 rounded-md text-[12px] border ${color.bg} ${color.border} ${color.text}`}
            >
              {a}
            </span>
          );
        })}
      </div>
    );
  }

  if (typeof answer === 'boolean') {
    return <p className="text-[13px] opacity-70">{answer ? 'Tak' : 'Nie'}</p>;
  }

  if (question.type === 'yesNo') {
    return (
      <p className="text-[13px] opacity-70">
        {answer === true || answer === 'yes' ? 'Tak' : 'Nie'}
      </p>
    );
  }

  if (question.type === 'scale') {
    return <p className="text-[13px] opacity-70">{answer}/5</p>;
  }

  return <p className="text-[13px] opacity-70">{String(answer)}</p>;
}

export default function SummaryScreen({ config, answers, visibleSections }) {
  const allSections = config.sections;
  const visibleIds = new Set(visibleSections.map((s) => s.id));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-[560px]"
    >
      {/* Thank you header */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <p className="text-5xl mb-4">✓</p>
        <h1 className="text-[28px] font-bold mb-2">
          Dziękuję,{' '}
          <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            {config.client.contact}
          </span>
          !
        </h1>
        <p className="text-sm opacity-35 leading-relaxed">
          Odpowiedzi zostały wysłane. Odezwę się w ciągu{' '}
          <strong>48 godzin</strong> z wstępną wyceną.
        </p>
      </motion.div>

      {/* Answer summary */}
      <motion.div
        variants={itemVariants}
        className="border-t border-white/[0.06] pt-8"
      >
        <p className="text-[11px] uppercase tracking-[3px] opacity-25 mb-5">
          Podsumowanie odpowiedzi
        </p>

        {allSections.map((section, sectionIndex) => {
          if (!visibleIds.has(section.id)) {
            return (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="opacity-30 mb-4"
              >
                <p className="text-[12px] font-semibold">
                  {section.title} — pominięta
                </p>
              </motion.div>
            );
          }

          return (
            <motion.div key={section.id} variants={itemVariants} className="mb-6">
              <p className="text-[12px] font-semibold opacity-50 mb-2.5 flex items-center gap-2">
                <span
                  className={`inline-block w-[5px] h-[5px] rounded-full ${DOT_COLORS[sectionIndex % 2]}`}
                />
                {section.title}
              </p>

              <div className="flex flex-col gap-2 pl-3.5 border-l border-white/[0.06]">
                {section.questions.map((question) => {
                  const answer = answers[question.id];
                  return (
                    <div key={question.id}>
                      <p className="text-[11px] opacity-25">
                        {question.title}
                      </p>
                      {renderAnswer(question, answer)}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Contact card */}
      <motion.div
        variants={itemVariants}
        className="mt-8 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center"
      >
        <p className="text-[12px] opacity-25 mb-2">Kontakt</p>
        <p className="text-sm opacity-60">lukasz@weyer.tech</p>
        <p className="text-[12px] opacity-25 mt-1">weyer.tech</p>
      </motion.div>
    </motion.div>
  );
}
