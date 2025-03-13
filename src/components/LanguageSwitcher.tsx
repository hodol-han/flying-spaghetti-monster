'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const otherLocale = locale === 'en' ? 'ko' : 'en';

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {t(locale)}
        <svg
          className="ml-2 -mr-0.5 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href={`/${locale === 'en' ? 'en' : 'ko'}`}
              className={`block w-full text-left px-4 py-2 text-sm ${
                locale === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } hover:bg-gray-100 hover:text-gray-900`}
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {t('en')}
            </Link>
            <Link
              href={`/${otherLocale}`}
              className={`block w-full text-left px-4 py-2 text-sm ${
                locale === 'ko' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } hover:bg-gray-100 hover:text-gray-900`}
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {t('ko')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
