'use client';

export default function SingleSelect({ question, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {(question.options || []).map((option) => {
        const selected = value === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex items-center gap-3 rounded-xl border py-4 px-5 cursor-pointer transition-all duration-200 text-left ${
              selected
                ? 'border-rose-500/30 bg-rose-500/[0.05]'
                : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02]'
            }`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full transition-all duration-200 ${
                selected ? 'bg-rose-500' : 'bg-transparent'
              }`}
            />
            <span
              className={`text-[15px] transition-colors duration-200 ${
                selected ? 'text-white' : 'text-white/50'
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
