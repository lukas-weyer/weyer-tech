import Link from 'next/link';
import Logo from './logo';
import ThemeControler from './themeController';
import Socjals from './socjals';

export default function Nav() {
  return (
    <div className="navbar bg-base-200">
      <div className="container mx-auto">
        <div className="flex-1 pl-4">
          <Logo className="h-auto w-8" />
        </div>
        <div className="mr-4 flex-none">
          <Socjals />
        </div>
        <ThemeControler />
      </div>
    </div>
  );
}
