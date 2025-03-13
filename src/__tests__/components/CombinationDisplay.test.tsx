import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CombinationDisplay from '@/components/CombinationDisplay';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'display.title': 'Generated Food Combination',
      'display.question':
        'How does this food combination sound? Does it seem delicious or terrible?',
    };
    return translations[key as keyof typeof translations] || key;
  },
}));

describe('CombinationDisplay Component', () => {
  const mockCombination = 'Fried kimchi and chocolate ice cream';

  it('should render correctly', () => {
    render(<CombinationDisplay combination={mockCombination} />);

    // Check if title is displayed correctly
    expect(screen.getByText('Generated Food Combination')).toBeInTheDocument();

    // Check if food combination is displayed correctly
    expect(screen.getByText(mockCombination)).toBeInTheDocument();

    // Check if guidance text is displayed correctly
    expect(
      screen.getByText('How does this food combination sound? Does it seem delicious or terrible?')
    ).toBeInTheDocument();
  });

  it('should update correctly when rendered with a different combination', () => {
    const { rerender } = render(<CombinationDisplay combination={mockCombination} />);

    // Check if initial combination is displayed correctly
    expect(screen.getByText(mockCombination)).toBeInTheDocument();

    // New combination
    const newCombination = 'Gratin coffee and kimbap jelly';

    // Re-render component
    rerender(<CombinationDisplay combination={newCombination} />);

    // Check if new combination is displayed correctly
    expect(screen.getByText(newCombination)).toBeInTheDocument();

    // Check if previous combination is no longer displayed
    expect(screen.queryByText(mockCombination)).not.toBeInTheDocument();
  });

  it('should display long combination text correctly', () => {
    const longCombination =
      'Sous-vide mapo tofu and ice cream sandwich blended and caramelized special dessert';

    render(<CombinationDisplay combination={longCombination} />);

    // Check if long combination is displayed correctly
    expect(screen.getByText(longCombination)).toBeInTheDocument();
  });
});
