import { Inter, Russo_One } from 'next/font/google';
import './globals.css';
import Nav from './_components/nav';
import Footer from './_components/footer';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });
const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-russo-one',
});

export const metadata = {
  title: 'weyer.tech | Portfolio',
  description:
    'Buduję strony i aplikacje. Portfolio projektów webowych — Łukasz Weyer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" data-theme="dark">
      <body
        className={`${inter.className} ${russoOne.variable} bg-base-100 text-base-content antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
