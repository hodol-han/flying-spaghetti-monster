'use client';

import { useState } from 'react';
import FoodCombinationGenerator from '@/components/FoodCombinationGenerator';
import CombinationDisplay from '@/components/CombinationDisplay';
import RatingSystem from '@/components/RatingSystem';
import SavedCombinations from '@/components/SavedCombinations';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  const [currentCombination, setCurrentCombination] = useState<string | null>(null);
  const [savedCombinations, setSavedCombinations] = useState<
    Array<{ combination: string; rating: number }>
  >([]);

  const handleGenerateCombination = (combination: string) => {
    setCurrentCombination(combination);
  };

  const handleSaveCombination = (rating: number) => {
    if (currentCombination) {
      setSavedCombinations([...savedCombinations, { combination: currentCombination, rating }]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">{t('app.title')}</h1>
        <p className="text-xl text-dark">{t('app.description')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <FoodCombinationGenerator onGenerate={handleGenerateCombination} />

          {currentCombination && (
            <>
              <CombinationDisplay combination={currentCombination} />
              <RatingSystem onRate={handleSaveCombination} />
            </>
          )}
        </div>

        <div>
          <SavedCombinations combinations={savedCombinations} />
        </div>
      </div>
    </div>
  );
}
