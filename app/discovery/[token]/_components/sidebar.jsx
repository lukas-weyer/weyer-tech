'use client';

import Logo from '@/app/_components/logo';

export default function Sidebar({
  config,
  visibleSections,
  currentSectionIndex,
  completedSections,
  totalQuestions,
  answeredCount,
  onSectionClick,
}) {
  const visibleIds = new Set(visibleSections.map((s) => s.id));
  const currentSection = visibleSections[currentSectionIndex];
  const progressPercent = totalQuestions > 0
    ? (answeredCount / totalQuestions) * 100
    : 0;

  const getSectionState = (section) => {
    const visibleIndex = visibleSections.findIndex((s) => s.id === section.id);
    const isVisible = visibleIndex !== -1;
    const isCompleted = completedSections.has(section.id);
    const isActive = isVisible && visibleIndex === currentSectionIndex;
    const isConditional = !!section.condition;

    if (isCompleted) return 'completed';
    if (isActive) return 'active';
    if (!isVisible && isConditional) return 'skipped';
    if (isVisible && isConditional) return 'conditional';
    if (isVisible) return 'upcoming';
    return 'upcoming';
  };

  const handleClick = (section) => {
    const visibleIndex = visibleSections.findIndex((s) => s.id === section.id);
    if (visibleIndex !== -1 && visibleIndex <= currentSectionIndex) {
      onSectionClick(visibleIndex);
    }
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-[260px] h-screen sticky top-0 bg-[#0a0a12] border-r border-white/[0.06] px-5 py-8 text-white">
        {/* Logo */}
        <div className="mb-6 pb-5 border-b border-white/[0.06]">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-opacity hover:opacity-70">
            <Logo className="h-auto w-6" />
            <span className="font-logo text-sm tracking-wide">
              weyer<span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">.tech</span>
            </span>
          </a>
        </div>

        {/* Top section */}
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[3px] opacity-30">
            Discovery
          </p>
          <p className="text-[15px] font-semibold mt-1.5 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            {config.client.name}
          </p>
          <p className="text-[11px] opacity-25 mt-0.5">
            Ankieta dla: {config.client.contactFormal}
          </p>
        </div>

        {/* Middle section — section list */}
        <div className="flex-1 flex flex-col gap-0.5 overflow-y-auto">
          {config.sections.map((section) => {
            const state = getSectionState(section);

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleClick(section)}
                className={`
                  py-2.5 px-3.5 rounded-lg text-[13px] flex items-center gap-2.5
                  cursor-pointer transition-all duration-200 text-left w-full
                  ${state === 'completed' ? 'opacity-30 hover:opacity-50' : ''}
                  ${state === 'active' ? 'border-l-2 border-rose-500 bg-white/[0.03]' : 'border-l-2 border-transparent'}
                  ${state === 'upcoming' ? 'opacity-25' : ''}
                  ${state === 'skipped' ? 'opacity-15' : ''}
                  ${state === 'conditional' ? '' : ''}
                `}
              >
                {/* Dot / checkmark */}
                {state === 'completed' && (
                  <span className="text-purple-500 text-[13px] font-bold flex-shrink-0 w-[6px] flex justify-center">
                    ✓
                  </span>
                )}
                {state === 'active' && (
                  <span className="w-[6px] h-[6px] rounded-full bg-rose-500 flex-shrink-0" />
                )}
                {state === 'upcoming' && (
                  <span className="w-[6px] h-[6px] rounded-full bg-white/15 flex-shrink-0" />
                )}
                {state === 'skipped' && (
                  <span className="w-[6px] h-[6px] rounded-full bg-white/15 flex-shrink-0" />
                )}
                {state === 'conditional' && (
                  <span className="w-[6px] h-[6px] rounded-full bg-white/15 flex-shrink-0" />
                )}

                {/* Section name */}
                <span className={`flex-1 ${state === 'active' ? 'text-white' : 'text-white/80'}`}>
                  {section.title}
                </span>

                {/* Badges */}
                {state === 'skipped' && (
                  <span className="text-[9px] uppercase tracking-wider bg-white/[0.06] text-white/30 px-1.5 py-0.5 rounded">
                    pominięta
                  </span>
                )}
                {state === 'conditional' && (
                  <span className="text-[9px] uppercase tracking-wider bg-white/[0.08] text-white/40 px-1.5 py-0.5 rounded">
                    opcja
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom section — progress */}
        <div className="mt-auto pt-5 border-t border-white/[0.06]">
          <div className="flex justify-between text-[11px] opacity-30 mb-2">
            <span>Postęp</span>
            <span>{answeredCount} / {totalQuestions}</span>
          </div>
          <div className="h-[3px] rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-[#0a0a12]/90 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-opacity hover:opacity-70">
            <Logo className="h-auto w-5" />
            <span className="font-logo text-xs tracking-wide">
              weyer<span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">.tech</span>
            </span>
          </a>
          <span className="text-[11px] opacity-30 text-white">
            {currentSection?.title} · {answeredCount}/{totalQuestions}
          </span>
        </div>
        <div className="mt-2 h-[2px] rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </>
  );
}
