'use client';

interface CombinationDisplayProps {
  combination: string;
}

export default function CombinationDisplay({ combination }: CombinationDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-2 border-secondary">
      <h2 className="text-2xl font-bold text-dark mb-4">Generated Food Combination</h2>
      <div className="p-4 bg-light rounded-lg">
        <p className="text-xl font-bold text-center text-primary">{combination}</p>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>How does this food combination sound? Does it seem delicious or terrible?</p>
      </div>
    </div>
  );
}
