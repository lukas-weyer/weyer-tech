import Link from 'next/link';
import Logo from './logo';
import Socjals from './socjals';

export default function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#0a0a12]/70 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Logo className="h-auto w-7" />
          <span className="font-logo text-sm tracking-wide">
            weyer<span className="gradient-text">.tech</span>
          </span>
        </Link>
        <Socjals />
      </div>
    </nav>
  );
}
