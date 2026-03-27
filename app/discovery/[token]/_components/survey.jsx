'use client';

import { useState, useEffect, useMemo } from 'react';
import WelcomeScreen from './welcomeScreen';
import Sidebar from './sidebar';
import QuestionScreen from './questionScreen';
import SummaryScreen from './summaryScreen';

export default function Survey({ config }) {
  const [screen, setScreen] = useState('welcome');
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [hasProgress, setHasProgress] = useState(false);

  // --- Computed values ---

  const visibleSections = useMemo(() => {
    return config.sections.filter((section) => {
      if (!section.conditional) return true;
      for (const s of config.sections) {
        for (const q of s.questions) {
          if (q.showSection === section.id) {
            return answers[q.id] === true;
          }
        }
      }
      return true;
    });
  }, [config.sections, answers]);

  const flatQuestions = useMemo(
    () => visibleSections.flatMap((s) => s.questions),
    [visibleSections],
  );

  const totalQuestions = flatQuestions.length;

  const answeredCount = flatQuestions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] !== '' && answers[q.id] !== null,
  ).length;

  const completedSections = useMemo(() => {
    const set = new Set();
    for (const section of visibleSections) {
      const allAnswered = section.questions.every((q) => {
        const a = answers[q.id];
        return a !== undefined && a !== '' && a !== null;
      });
      if (allAnswered) set.add(section.id);
    }
    return set;
  }, [visibleSections, answers]);

  const currentSectionData = visibleSections[currentSection];
  const currentQuestionData = currentSectionData?.questions[currentQuestion];
  const isFirstQuestion = currentSection === 0 && currentQuestion === 0;
  const isLastQuestion =
    currentSection === visibleSections.length - 1 &&
    currentQuestion === currentSectionData?.questions.length - 1;

  // --- localStorage persistence ---

  useEffect(() => {
    if (screen === 'summary' || submitted) return;
    const data = {
      answers,
      currentSection,
      currentQuestion,
      screen,
      timestamp: Date.now(),
    };
    localStorage.setItem(`survey_${config.token}`, JSON.stringify(data));
  }, [answers, currentSection, currentQuestion, screen, submitted, config.token]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`survey_${config.token}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.answers && Object.keys(data.answers).length > 0) {
          setAnswers(data.answers);
          setCurrentSection(data.currentSection || 0);
          setCurrentQuestion(data.currentQuestion || 0);
          setHasProgress(true);
        }
      }
    } catch {}
  }, [config.token]);

  // --- Navigation ---

  function goNext() {
    if (isLastQuestion) {
      handleSubmit();
      return;
    }
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setCurrentSection((s) => s + 1);
      setCurrentQuestion(0);
    }
  }

  function goPrev() {
    if (isFirstQuestion) return;
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    } else {
      const prevSection = visibleSections[currentSection - 1];
      setCurrentSection((s) => s - 1);
      setCurrentQuestion(prevSection.questions.length - 1);
    }
  }

  function goToSection(index) {
    setCurrentSection(index);
    setCurrentQuestion(0);
  }

  function handleAnswer(value) {
    setAnswers((prev) => ({ ...prev, [currentQuestionData.id]: value }));
  }

  function handleStart() {
    setScreen('survey');
  }

  // --- Submit (Netlify Forms) ---

  async function handleSubmit() {
    setSubmitError(null);

    const lines = [];
    for (const section of visibleSections) {
      lines.push(`\n--- ${section.title.toUpperCase()} ---\n`);
      for (const q of section.questions) {
        lines.push(q.question);
        const a = answers[q.id];
        if (a === undefined || a === null || a === '') {
          lines.push('→ (pominięte)\n');
        } else if (Array.isArray(a)) {
          lines.push(`→ ${a.join(', ')}\n`);
        } else if (typeof a === 'boolean') {
          lines.push(`→ ${a ? 'Tak' : 'Nie'}\n`);
        } else {
          lines.push(`→ ${a}\n`);
        }
      }
    }

    for (const section of config.sections) {
      if (section.conditional && !visibleSections.includes(section)) {
        lines.push(`\n--- ${section.title.toUpperCase()} --- pominięta\n`);
      }
    }

    const formData = new URLSearchParams();
    formData.append('form-name', `discovery-${config.token}`);
    formData.append('client', config.client.name);
    formData.append('answers', lines.join('\n'));

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      setSubmitted(true);
      setScreen('summary');
      localStorage.removeItem(`survey_${config.token}`);
    } catch (err) {
      setSubmitError('Wystąpił błąd przy wysyłaniu. Spróbuj ponownie.');
    }
  }

  // --- Render ---

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      {/* Hidden Netlify form for detection */}
      <form
        name={`discovery-${config.token}`}
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
      >
        <input name="form-name" />
        <input name="bot-field" />
        <input name="client" />
        <textarea name="answers" />
      </form>

      {screen === 'welcome' && (
        <WelcomeScreen
          config={config}
          totalQuestions={totalQuestions}
          sectionCount={visibleSections.length}
          onStart={handleStart}
          hasProgress={hasProgress}
        />
      )}

      {screen === 'survey' && (
        <div className="flex min-h-screen">
          <Sidebar
            config={config}
            visibleSections={visibleSections}
            currentSectionIndex={currentSection}
            completedSections={completedSections}
            totalQuestions={totalQuestions}
            answeredCount={answeredCount}
            onSectionClick={goToSection}
          />

          <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-16 py-20 lg:py-12 relative">
            {/* Subtle glow orb */}
            <div
              className="pointer-events-none absolute top-[20%] right-[20%] h-[300px] w-[300px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,45,99,0.06) 0%, transparent 70%)',
              }}
            />

            <QuestionScreen
              question={currentQuestionData}
              questionIndex={flatQuestions.indexOf(currentQuestionData)}
              totalQuestions={totalQuestions}
              value={answers[currentQuestionData?.id]}
              onChange={handleAnswer}
            />

            {/* Navigation */}
            <div className="mt-10 flex w-full max-w-[520px] items-center justify-between">
              {!isFirstQuestion ? (
                <button
                  onClick={goPrev}
                  className="text-[13px] opacity-25 transition-opacity duration-200 hover:opacity-50 cursor-pointer"
                >
                  ← Wstecz
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={goNext}
                className="cursor-pointer rounded-full bg-gradient-to-r from-rose-500 to-purple-500 px-8 py-3 text-[13px] font-semibold shadow-[0_0_30px_rgba(255,45,99,0.2)] transition-all duration-200 hover:shadow-[0_0_40px_rgba(255,45,99,0.3)]"
              >
                {isLastQuestion ? 'Podsumuj i wyślij' : 'Dalej →'}
              </button>
            </div>

            {submitError && (
              <p className="mt-4 text-sm text-rose-400">{submitError}</p>
            )}
          </main>
        </div>
      )}

      {screen === 'summary' && (
        <div className="flex min-h-screen">
          <Sidebar
            config={config}
            visibleSections={visibleSections}
            currentSectionIndex={-1}
            completedSections={new Set(visibleSections.map((s) => s.id))}
            totalQuestions={totalQuestions}
            answeredCount={totalQuestions}
            onSectionClick={() => {}}
          />
          <main className="flex-1 flex flex-col items-center px-6 lg:px-16 py-20 lg:py-12 overflow-y-auto">
            <SummaryScreen
              config={config}
              answers={answers}
              visibleSections={visibleSections}
            />
          </main>
        </div>
      )}
    </div>
  );
}
