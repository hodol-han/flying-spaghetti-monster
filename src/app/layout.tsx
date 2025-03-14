import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Random Food Combination Generator',
  description: 'A web application that randomly generates and evaluates crazy food combinations',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
