import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KAGE — Anime Discovery',
  description: 'A fast, modern anime discovery experience powered by Jikan.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
