import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SavedCombinations from '@/components/SavedCombinations';

// Mock next-intl
jest.mock('next-intl', () => {
  const getTranslations = () => {
    return (key: string, params?: Record<string, any>) => {
      const translations: Record<string, string> = {
        'saved.title': 'Saved Food Combinations',
        'saved.empty': 'No saved food combinations yet.',
        'saved.suggestion': 'Generate and rate food combinations!',
        'saved.combination': 'Combination #{number}',
        'saved.rating': 'Rating: {rating}/5',
      };

      // Handle template strings with parameters
      if (key === 'saved.combination' && params) {
        return `Combination #${params.number}`;
      }

      if (key === 'saved.rating' && params) {
        return `Rating: ${params.rating}/5`;
      }

      return translations[key as keyof typeof translations] || key;
    };
  };

  return {
    useTranslations: () => getTranslations(),
    useLocale: () => 'en',
  };
});

describe('SavedCombinations Component', () => {
  it('should display empty state when no combinations are saved', () => {
    render(<SavedCombinations combinations={[]} />);

    // Check if title is displayed
    expect(screen.getByText('Saved Food Combinations')).toBeInTheDocument();

    // Check if empty state message is displayed
    expect(screen.getByText('No saved food combinations yet.')).toBeInTheDocument();
    expect(screen.getByText('Generate and rate food combinations!')).toBeInTheDocument();
  });

  it('should display saved combinations when available', () => {
    const mockCombinations = [
      { id: 1, combination: 'Fried kimchi and chocolate ice cream', rating: 4 },
      { id: 2, combination: 'Gratin coffee and kimbap jelly', rating: 5 },
    ];

    render(<SavedCombinations combinations={mockCombinations} />);

    // Check if title is displayed
    expect(screen.getByText('Saved Food Combinations')).toBeInTheDocument();

    // Check if combinations are displayed
    expect(screen.getByText('Combination #1')).toBeInTheDocument();
    expect(screen.getByText('Fried kimchi and chocolate ice cream')).toBeInTheDocument();

    // Check rating by title attribute instead of text content
    expect(screen.getByTitle('Rating: 4/5')).toBeInTheDocument();
    expect(screen.getByTitle('Rating: 4/5')).toHaveTextContent('😋');

    expect(screen.getByText('Combination #2')).toBeInTheDocument();
    expect(screen.getByText('Gratin coffee and kimbap jelly')).toBeInTheDocument();
    expect(screen.getByTitle('Rating: 5/5')).toBeInTheDocument();
    expect(screen.getByTitle('Rating: 5/5')).toHaveTextContent('🤩');

    // Check if empty state message is not displayed
    expect(screen.queryByText('No saved food combinations yet.')).not.toBeInTheDocument();
  });

  it('should display correct emoji based on rating', () => {
    const mockCombinations = [
      { combination: 'Combination 1', rating: 1 }, // 🤢
      { combination: 'Combination 2', rating: 2 }, // 😕
      { combination: 'Combination 3', rating: 3 }, // 😐
      { combination: 'Combination 4', rating: 4 }, // 😋
      { combination: 'Combination 5', rating: 5 }, // 🤩
    ];

    render(<SavedCombinations combinations={mockCombinations} />);

    // Check if each rating has the correct emoji
    const emojis = screen.getAllByTitle(/Rating: \d\/5/);
    expect(emojis).toHaveLength(5);

    expect(emojis[0]).toHaveTextContent('🤢');
    expect(emojis[1]).toHaveTextContent('😕');
    expect(emojis[2]).toHaveTextContent('😐');
    expect(emojis[3]).toHaveTextContent('😋');
    expect(emojis[4]).toHaveTextContent('🤩');
  });

  it('should display many combinations correctly', () => {
    const mockCombinations = Array.from({ length: 10 }, (_, i) => ({
      combination: `Test combination ${i + 1}`,
      rating: (i % 5) + 1,
    }));

    render(<SavedCombinations combinations={mockCombinations} />);

    // Check if all combinations are displayed
    mockCombinations.forEach((item, index) => {
      expect(screen.getByText(`Test combination ${index + 1}`)).toBeInTheDocument();
      expect(screen.getByText(`Combination #${index + 1}`)).toBeInTheDocument();
    });
  });

  it('should display question mark emoji for invalid ratings', () => {
    // Add combinations with invalid ratings (0, 6)
    const mockCombinations = [
      { combination: 'Invalid rating 0', rating: 0 },
      { combination: 'Invalid rating 6', rating: 6 },
    ];

    render(<SavedCombinations combinations={mockCombinations} />);

    // Check if question mark emoji is displayed
    const items = screen.getAllByText('❓');
    expect(items).toHaveLength(2);

    // Check if combination text is displayed correctly
    expect(screen.getByText('Invalid rating 0')).toBeInTheDocument();
    expect(screen.getByText('Invalid rating 6')).toBeInTheDocument();
  });
});
