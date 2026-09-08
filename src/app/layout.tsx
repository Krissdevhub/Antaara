import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Antaara Unplugged | Conversations That Stay With You',
  description:
    'A luxury editorial podcast hosted by Kirti Jaiswal Rajpal featuring meaningful dialogues with voices from spirituality, cinema, entrepreneurship, social impact, and culture.',
  keywords: [
    'Antaara Unplugged',
    'Kirti Jaiswal Rajpal',
    'Antaara Studio',
    'Luxury Podcast',
    'Spiritual Conversations',
    'Indian Cultural Dialogue',
    'Amogh Lila Das',
    'Manish Wadhwa',
    'Ishita Moitra',
  ],
  authors: [{ name: 'Kirti Jaiswal Rajpal' }],
  openGraph: {
    title: 'Antaara Unplugged | Conversations That Stay With You',
    description:
      'Meaningful conversations with leaders in spirituality, cinema, culture, and social impact.',
    images: [
      {
        url: '/assets/kirti_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Antaara Unplugged - Hosted by Kirti Jaiswal Rajpal',
      },
    ],
  },
  icons: {
    icon: '/assets/antaara_logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F4F1EC] text-[#292625] selection:bg-[#E4D3CC] selection:text-[#292625]">
        {children}
      </body>
    </html>
  );
}
