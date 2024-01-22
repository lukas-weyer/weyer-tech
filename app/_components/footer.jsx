import Link from 'next/link';
import Socjals from './socjals';

export default function Footer() {
  return (
    <footer className="footer footer-center rounded bg-base-200 p-10 text-base-content">
      <nav>
        <Socjals />
      </nav>
      <aside>
        <p>2024 © - Łukasz Weyer</p>
      </aside>
    </footer>
  );
}
