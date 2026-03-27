'use client';

export default function YesNo({ question, value, onChange }) {
  return (
    <div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 rounded-xl py-4 text-center cursor-pointer transition-all duration-200 border text-[15px] ${
            value === true
              ? 'border-purple-500/30 bg-purple-500/[0.05] text-white'
              : 'border-white/[0.08] bg-white/[0.02] text-white/50'
          }`}
        >
          Tak
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 rounded-xl py-4 text-center cursor-pointer transition-all duration-200 border text-[15px] ${
            value === false
              ? 'border-white/[0.15] bg-white/[0.04] text-white'
              : 'border-white/[0.08] bg-white/[0.02] text-white/50'
          }`}
        >
          Nie
        </button>
      </div>
      {question.showSection && (
        <p className="mt-3 text-[11px] opacity-20">
          Ta odpowiedź wpływa na widoczność dodatkowej sekcji pytań.
        </p>
      )}
    </div>
  );
}
