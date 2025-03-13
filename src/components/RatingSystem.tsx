'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface RatingSystemProps {
  onRate: (rating: number) => void;
}

export default function RatingSystem({ onRate }: RatingSystemProps) {
  const t = useTranslations();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (selectedRating !== null) {
      onRate(selectedRating);
      setIsSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setSelectedRating(null);
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const ratings = [
    { value: 1, emoji: '🤢', label: t('rating.ratings.1') },
    { value: 2, emoji: '😕', label: t('rating.ratings.2') },
    { value: 3, emoji: '😐', label: t('rating.ratings.3') },
    { value: 4, emoji: '😋', label: t('rating.ratings.4') },
    { value: 5, emoji: '🤩', label: t('rating.ratings.5') },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-dark mb-4">{t('rating.title')}</h2>

      {isSubmitted ? (
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <p className="text-green-700 font-bold">{t('rating.thankyou')}</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-6">
            {ratings.map(rating => (
              <button
                key={rating.value}
                onClick={() => handleRatingClick(rating.value)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  selectedRating === rating.value
                    ? 'bg-secondary text-white scale-110'
                    : 'hover:bg-light'
                }`}
              >
                <span className="text-2xl mb-1">{rating.emoji}</span>
                <span className="text-xs">{rating.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={selectedRating === null}
            className={`w-full py-3 px-6 rounded-lg text-white font-bold transition-all ${
              selectedRating === null
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-opacity-80'
            }`}
          >
            {t('rating.button')}
          </button>
        </>
      )}
    </div>
  );
}
