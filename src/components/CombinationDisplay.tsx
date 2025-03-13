'use client';

import { useTranslations } from 'next-intl';

interface CombinationDisplayProps {
  combination: string;
}

export default function CombinationDisplay({ combination }: CombinationDisplayProps) {
  const t = useTranslations();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-2 border-secondary">
      <h2 className="text-2xl font-bold text-dark mb-4">{t('display.title')}</h2>
      <div className="p-4 bg-light rounded-lg">
        <p className="text-xl font-bold text-center text-primary">{combination}</p>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>{t('display.question')}</p>
      </div>
    </div>
  );
}
