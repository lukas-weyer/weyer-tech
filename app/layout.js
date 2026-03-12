import { Inter, Russo_One } from 'next/font/google';
import './globals.css';
import Nav from './_components/nav';
import Footer from './_components/footer';
import CursorGlow from './_components/cursorGlow';
import Preloader from './_components/preloader';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });
const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-russo-one',
});

export const metadata = {
  metadataBase: new URL('https://weyer.tech'),
  title: 'weyer.tech | Portfolio',
  description:
    'Buduję strony i aplikacje. Portfolio projektów webowych — Łukasz Weyer.',
  openGraph: {
    title: 'weyer.tech | Portfolio',
    description:
      'Buduję strony i aplikacje. Portfolio projektów webowych — Łukasz Weyer.',
    url: 'https://weyer.tech',
    siteName: 'weyer.tech',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'weyer.tech — Portfolio',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'weyer.tech | Portfolio',
    description:
      'Buduję strony i aplikacje. Portfolio projektów webowych — Łukasz Weyer.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body
        className={`${inter.className} ${russoOne.variable} bg-[#0a0a12] text-white antialiased`}
      >
        <Preloader />
        <CursorGlow />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
