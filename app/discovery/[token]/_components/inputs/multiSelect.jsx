'use client';

export default function MultiSelect({ question, value, onChange }) {
  const selected = value || [];

  const toggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {(question.options || []).map((option, index) => {
        const isSelected = selected.includes(option);
        const useRose = index % 2 === 0;

        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`flex items-center gap-3 rounded-xl border py-4 px-5 cursor-pointer transition-all duration-200 text-left ${
              isSelected
                ? useRose
                  ? 'border-rose-500/30 bg-rose-500/[0.05]'
                  : 'border-purple-500/30 bg-purple-500/[0.05]'
                : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02]'
            }`}
          >
            <span
              className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border transition-all duration-200 text-xs ${
                isSelected
                  ? 'border-purple-500 bg-purple-500/15 text-purple-500'
                  : 'border-white/[0.15]'
              }`}
            >
              {isSelected && '✓'}
            </span>
            <span
              className={`text-[15px] transition-colors duration-200 ${
                isSelected ? 'text-white' : 'text-white/50'
              }`}
            >
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}
