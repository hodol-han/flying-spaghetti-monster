import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

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
