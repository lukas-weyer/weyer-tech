'use client';

import { usePathname } from 'next/navigation';
import Nav from './nav';
import Footer from './footer';
import CursorGlow from './cursorGlow';
import Preloader from './preloader';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isDiscovery = pathname.startsWith('/discovery');

  if (isDiscovery) {
    return children;
  }

  return (
    <>
      <Preloader />
      <CursorGlow />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
