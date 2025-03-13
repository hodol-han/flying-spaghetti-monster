import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '@/lib/navigation';

export default getRequestConfig(async ({ locale }) => {
  // If locale is undefined, use the default locale
  const currentLocale = locale || defaultLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(currentLocale as any)) {
    throw new Error(`Locale '${currentLocale}' is not supported`);
  }

  // Load messages for the requested locale
  const messages = (await import(`../../messages/${currentLocale}.json`)).default;

  return {
    locale: currentLocale as string,
    messages,
    timeZone: 'Asia/Seoul',
  };
});
