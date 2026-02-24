import { Inter } from 'next/font/google';
import './globals.css';
import Nav from './_components/nav';
import Footer from './_components/footer';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata = {
  title: 'weyer.tech | Łukasz Weyer',
  description:
    'Łukasz Weyer - ratownik medyczny i web developer. Portfolio i blog osobisty.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl-PL" data-theme="dark">
      <body
        className={`${inter.className} bg-base-100 text-base-content antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
