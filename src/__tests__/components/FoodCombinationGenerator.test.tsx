import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodCombinationGenerator from '@/components/FoodCombinationGenerator';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'generator.title': 'Food Combination Generator',
      'generator.description': 'Click the button to generate an unexpected food combination!',
      'generator.button': 'Generate Random Combination',
      'generator.generating': 'Generating...',
      'generator.combinationTemplate': '{method} {food1} and {food2} {form}',
    };
    return translations[key as keyof typeof translations] || key;
  },
  useLocale: () => 'en',
}));

describe('FoodCombinationGenerator Component', () => {
  const mockOnGenerate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    render(<FoodCombinationGenerator onGenerate={mockOnGenerate} />);

    // Check if title is displayed correctly
    expect(screen.getByText('Food Combination Generator')).toBeInTheDocument();

    // Check if description is displayed correctly
    expect(
      screen.getByText('Click the button to generate an unexpected food combination!')
    ).toBeInTheDocument();

    // Check if button is displayed correctly
    expect(screen.getByText('Generate Random Combination')).toBeInTheDocument();
  });

  it('should generate a combination when button is clicked', async () => {
    render(<FoodCombinationGenerator onGenerate={mockOnGenerate} />);

    // Click the generate button
    fireEvent.click(screen.getByText('Generate Random Combination'));

    // Check if generating state is displayed
    expect(screen.getByText('Generating...')).toBeInTheDocument();

    // Advance timer to complete the generation
    jest.advanceTimersByTime(800);

    // Check if onGenerate was called
    await waitFor(() => {
      expect(mockOnGenerate).toHaveBeenCalled();
    });

    // Check if the combination format is correct (this is a bit tricky since it's random)
    const combinationArg = mockOnGenerate.mock.calls[0][0];
    expect(typeof combinationArg).toBe('string');
    expect(combinationArg.length).toBeGreaterThan(0);
  });

  it('should disable the button while generating', async () => {
    render(<FoodCombinationGenerator onGenerate={mockOnGenerate} />);

    // Click the generate button
    fireEvent.click(screen.getByText('Generate Random Combination'));

    // Check if button is disabled
    expect(screen.getByText('Generating...')).toBeDisabled();

    // Advance timer to complete the generation
    jest.advanceTimersByTime(800);

    // Wait for the button to reappear with the original text
    await waitFor(() => {
      expect(screen.queryByText('Generate Random Combination')).toBeInTheDocument();
    });

    // Check if button is enabled again
    const button = screen.getByText('Generate Random Combination');
    expect(button).not.toBeDisabled();
  });
});
