// app/layout.js
import '../styles/globals.css';

export const metadata = {
  title: 'School AI Tutor',
  description: 'AI tutor MVP - Next.js 14 App Router'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
  <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
