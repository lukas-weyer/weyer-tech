import { Inter } from 'next/font/google';
import './globals.css';
import Nav from './_components/nav';
import Footer from './_components/footer';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata = {
  title: 'weyer.tech',
  description: 'Łukasz Weyer - personal blog',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl-PL">
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
