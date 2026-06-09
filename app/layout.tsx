import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HOBO hifi Den Haag - Exclusieve 3D Audio Ervaring',
  description: 'Ervaar hoge fideliteit in drie dimensies. Ontdek high-end Bowers & Wilkins luidsprekers en McIntosh buizenversterkers in onze interactieve 3D studio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800&family=Outfit:wght@300;400;500;700;800&family=UnifrakturMaguntia&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased bg-[#121212] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

