'use client';

interface SavedCombinationsProps {
  combinations: Array<{ combination: string; rating: number }>;
}

export default function SavedCombinations({ combinations }: SavedCombinationsProps) {
  const getRatingEmoji = (rating: number) => {
    switch (rating) {
      case 1:
        return '🤢';
      case 2:
        return '😕';
      case 3:
        return '😐';
      case 4:
        return '😋';
      case 5:
        return '🤩';
      default:
        return '❓';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-dark mb-4">Saved Food Combinations</h2>

      {combinations.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600">No saved food combinations yet.</p>
          <p className="text-gray-600 text-sm mt-2">Generate and rate food combinations!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {combinations.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-secondary transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Combination #{index + 1}</span>
                <span className="text-2xl" title={`Rating: ${item.rating}/5`}>
                  {getRatingEmoji(item.rating)}
                </span>
              </div>
              <p className="font-medium text-dark">{item.combination}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
