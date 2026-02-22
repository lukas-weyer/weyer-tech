import Logo from './logo';
import Socjals from './socjals';

export default function Footer() {
  return (
    <footer className="border-t border-base-content/5 bg-base-100">
      <div className="section-container flex flex-col items-center gap-6 py-12">
        <Logo className="h-auto w-6 opacity-40" />
        <Socjals />
        <p className="text-sm text-base-content/40">
          {new Date().getFullYear()} &copy; Łukasz Weyer
        </p>
      </div>
    </footer>
  );
}
