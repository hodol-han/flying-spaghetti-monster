import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from '@/lib/navigation';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Use the default strategy for matching locales in pathnames
  localePrefix: 'as-needed',
});
