'use client';

export default function TextInput({ question, value, onChange }) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder || ''}
      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-[15px] text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-rose-500/50"
    />
  );
}
