'use client';

export default function Scale({ question, value, onChange }) {
  const scaleLabels = question.scaleLabels;

  return (
    <div>
      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;

          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-200 text-sm ${
                selected
                  ? 'bg-gradient-to-br from-rose-500 to-purple-500 border-transparent text-white font-semibold'
                  : 'border-white/[0.08] text-white/50 hover:border-white/[0.2]'
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      {scaleLabels && (
        <div className="mt-3 flex justify-between text-[11px] opacity-25">
          <span>{scaleLabels[0]}</span>
          <span>{scaleLabels[1]}</span>
        </div>
      )}
    </div>
  );
}
