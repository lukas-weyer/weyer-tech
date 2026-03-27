'use client';

export default function Survey({ config }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-white/50">Survey for {config.client.name} — loading...</p>
    </div>
  );
}
