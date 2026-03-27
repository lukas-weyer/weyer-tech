'use client';

import { useRef } from 'react';

export default function TextArea({ question, value, onChange }) {
  const ref = useRef(null);

  const handleInput = (e) => {
    onChange(e.target.value);
    const el = ref.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={ref}
      rows={4}
      value={value || ''}
      onInput={handleInput}
      placeholder={question.placeholder || ''}
      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-[15px] text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-rose-500/50 resize-none"
    />
  );
}
