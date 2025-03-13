import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/[locale]/page';

// Mock messages for testing
const messages = {
  app: {
    title: 'Random Food Combination Generator',
    description: 'Discover unexpected food combinations!',
  },
  generator: {
    title: 'Food Combination Generator',
    description: 'Click the button to generate an unexpected food combination!',
    button: 'Generate Random Combination',
    generating: 'Generating...',
    combinationTemplate: '{method} {food1} and {food2} {form}',
  },
  display: {
    title: 'Generated Food Combination',
    question: 'How does this food combination sound? Does it seem delicious or terrible?',
  },
  rating: {
    title: 'Rate this combination',
    thankyou: 'Thank you for your rating! It has been saved.',
    button: 'Save Rating',
    ratings: {
      '1': 'Terrible',
      '2': 'Not good',
      '3': 'Okay',
      '4': 'Looks tasty',
      '5': 'Amazing',
    },
  },
  saved: {
    title: 'Saved Food Combinations',
    empty: 'No saved food combinations yet.',
    suggestion: 'Generate and rate food combinations!',
    combination: 'Combination #{number}',
    rating: 'Rating: {rating}/5',
  },
  foodCategories: {
    Korean: 'Korean',
    Western: 'Western',
    Chinese: 'Chinese',
    Japanese: 'Japanese',
    Dessert: 'Dessert',
    Beverage: 'Beverage',
    Condiment: 'Condiment',
    Fruit: 'Fruit',
  },
  language: {
    en: 'English',
    ko: 'Korean',
  },
};

// Mock next-intl hooks
jest.mock('next-intl', () => {
  const getTranslations = () => {
    return (key: string, params?: Record<string, any>) => {
      // Simple implementation to handle nested keys like 'app.title'
      const keys = key.split('.');
      let value: any = messages;

      for (const k of keys) {
        if (value[k] === undefined) return key;
        value = value[k];
      }

      // Handle template strings with parameters
      if (typeof value === 'string' && params) {
        return Object.entries(params).reduce((str, [param, val]) => {
          return str.replace(`{${param}}`, String(val));
        }, value);
      }

      return value;
    };
  };

  return {
    useTranslations: () => getTranslations(),
    useLocale: () => 'en',
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('Food Combination Generation and Rating Flow', () => {
  beforeEach(() => {
    // Initialize mock functions before each test
    jest.clearAllMocks();

    // Set up Jest's mock timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Restore real timers
    jest.useRealTimers();
  });

  it('Complete flow: Generate combination -> Rate -> Save', async () => {
    render(<Home />);

    // 1. Check initial state
    expect(screen.getByText('Random Food Combination Generator')).toBeInTheDocument();
    expect(screen.getByText('Discover unexpected food combinations!')).toBeInTheDocument();
    expect(screen.getByText('Generate Random Combination')).toBeInTheDocument();
    expect(screen.getByText('No saved food combinations yet.')).toBeInTheDocument();

    // 2. Click generate combination button
    fireEvent.click(screen.getByText('Generate Random Combination'));

    // Check generating state
    expect(screen.getByText('Generating...')).toBeInTheDocument();

    // Advance timer
    jest.advanceTimersByTime(800);

    // 3. Check generated combination
    await waitFor(() => {
      expect(screen.getByText('Generated Food Combination')).toBeInTheDocument();
    });

    // 4. Check rating system
    expect(screen.getByText('Rate this combination')).toBeInTheDocument();
    expect(screen.getByText('Terrible')).toBeInTheDocument();
    expect(screen.getByText('Amazing')).toBeInTheDocument();

    // 5. Select rating
    fireEvent.click(screen.getByText('Looks tasty'));

    // 6. Save rating
    fireEvent.click(screen.getByText('Save Rating'));

    // 7. Check thank you message
    expect(screen.getByText('Thank you for your rating! It has been saved.')).toBeInTheDocument();

    // 8. Check saved combinations list
    expect(screen.queryByText('No saved food combinations yet.')).not.toBeInTheDocument();
    expect(screen.getByText('Combination #1')).toBeInTheDocument();

    // 9. Generate combination again
    // Advance 3 seconds to reset rating form
    jest.advanceTimersByTime(3000);

    // Click button again
    await waitFor(() => {
      expect(screen.getByText('Generate Random Combination')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Generate Random Combination'));

    // Advance timer
    jest.advanceTimersByTime(800);

    // 10. Rate second combination
    await waitFor(() => {
      expect(screen.getByText('Generated Food Combination')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Amazing'));
    fireEvent.click(screen.getByText('Save Rating'));

    // 11. Check two saved combinations
    expect(screen.getByText('Combination #1')).toBeInTheDocument();
    expect(screen.getByText('Combination #2')).toBeInTheDocument();
  });
});
