'use client';

import { useState } from 'react';
import FoodCombinationGenerator from '@/components/FoodCombinationGenerator';
import CombinationDisplay from '@/components/CombinationDisplay';
import RatingSystem from '@/components/RatingSystem';
import SavedCombinations from '@/components/SavedCombinations';

export default function Home() {
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
        <h1 className="text-4xl font-bold text-primary mb-2">랜덤 음식 조합 생성기</h1>
        <p className="text-xl text-dark">상상도 못한 음식 조합을 발견하세요!</p>
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
