// app/layout.js
import '../styles/globals.css';
import { Joost, Halant } from 'next/font/google';

export const metadata = {
  title: 'School AI Tutor',
  description: 'AI tutor MVP - Next.js 14 App Router'
};

// Load Joost for headers/buttons
const joost = Joost({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-joost'
});

// Load Halant for body/other text
const halant = Halant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-halant'
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={`${halant.variable} ${joost.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
