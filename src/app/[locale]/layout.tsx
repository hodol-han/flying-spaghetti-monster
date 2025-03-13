import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Get messages for metadata
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return {
    title: messages.app.title,
    description: messages.app.description,
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = ['en', 'ko'].includes(locale);
  if (!isValidLocale) notFound();

  // Get messages for the current locale
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Seoul">
          <header className="bg-primary text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Flying Spaghetti Monster</h1>
              <LanguageSwitcher />
            </div>
          </header>
          <main className="min-h-screen container mx-auto py-8 px-4">{children}</main>
          <footer className="bg-gray-100 p-4 text-center text-gray-600">
            <p>&copy; 2023 Flying Spaghetti Monster</p>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
