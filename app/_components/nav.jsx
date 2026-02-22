import Logo from './logo';
import ThemeControler from './themeController';
import Socjals from './socjals';

export default function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-base-content/5 bg-base-100/70 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Logo className="h-auto w-7" />
          <span className="font-logo text-sm tracking-wide">weyer.tech</span>
        </a>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Socjals />
          </div>
          <div className="h-5 w-px bg-base-content/10" />
          <ThemeControler />
        </div>
      </div>
    </nav>
  );
}
