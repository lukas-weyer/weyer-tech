import Logo from './logo';
import Socjals from './socjals';

export default function Footer() {
  return (
    <>
      <div className="section-divider" />
      <footer className="bg-base-100 py-12">
        <div className="section-container flex flex-col items-center gap-6">
          <Logo className="h-auto w-6 opacity-40" />
          <Socjals />
          <p className="text-xs text-white/20">
            {new Date().getFullYear()} &copy; Łukasz Weyer
          </p>
        </div>
      </footer>
    </>
  );
}
