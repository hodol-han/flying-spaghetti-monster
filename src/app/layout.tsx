import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: '랜덤 음식 조합 생성기',
  description: '정신나간 음식 조합을 무작위로 생성하고 평가하는 웹 애플리케이션',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
