import { createSharedPathnamesNavigation } from 'next-intl/navigation';

// Define supported locales
export const locales = ['en', 'ko'] as const;
export const defaultLocale = 'en' as const;

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  defaultLocale,
});
