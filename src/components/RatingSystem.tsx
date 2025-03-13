'use client';

import { useState } from 'react';

interface RatingSystemProps {
  onRate: (rating: number) => void;
}

export default function RatingSystem({ onRate }: RatingSystemProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (selectedRating !== null) {
      onRate(selectedRating);
      setIsSubmitted(true);

      // 3초 후 리셋
      setTimeout(() => {
        setSelectedRating(null);
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const ratings = [
    { value: 1, emoji: '🤢', label: '끔찍해요' },
    { value: 2, emoji: '😕', label: '별로예요' },
    { value: 3, emoji: '😐', label: '그저 그래요' },
    { value: 4, emoji: '😋', label: '맛있을 것 같아요' },
    { value: 5, emoji: '🤩', label: '환상적이에요' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-dark mb-4">이 조합을 평가해보세요</h2>

      {isSubmitted ? (
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <p className="text-green-700 font-bold">평가해주셔서 감사합니다! 저장되었습니다.</p>
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
            평가 저장하기
          </button>
        </>
      )}
    </div>
  );
}
