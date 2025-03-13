import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingSystem from '@/components/RatingSystem';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'rating.title': 'Rate this combination',
      'rating.thankyou': 'Thank you for your rating! It has been saved.',
      'rating.button': 'Save Rating',
      'rating.ratings.1': 'Terrible',
      'rating.ratings.2': 'Not good',
      'rating.ratings.3': 'Okay',
      'rating.ratings.4': 'Looks tasty',
      'rating.ratings.5': 'Amazing',
    };
    return translations[key as keyof typeof translations] || key;
  },
  useLocale: () => 'en',
}));

// 모의 함수 생성
const mockOnRate = jest.fn();

describe('RatingSystem Component', () => {
  const mockOnRate = jest.fn();

  beforeEach(() => {
    // 각 테스트 전에 모의 함수 초기화
    mockOnRate.mockClear();

    // Jest의 타이머 모의 설정
    jest.useFakeTimers();
  });

  afterEach(() => {
    // 실제 타이머로 복원
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // Check if title is displayed correctly
    expect(screen.getByText('Rate this combination')).toBeInTheDocument();

    // Check if all rating options are displayed
    expect(screen.getByText('Terrible')).toBeInTheDocument();
    expect(screen.getByText('Not good')).toBeInTheDocument();
    expect(screen.getByText('Okay')).toBeInTheDocument();
    expect(screen.getByText('Looks tasty')).toBeInTheDocument();
    expect(screen.getByText('Amazing')).toBeInTheDocument();

    // Check if save button is displayed
    expect(screen.getByText('Save Rating')).toBeInTheDocument();
  });

  it('should allow selecting a rating', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // Select a rating
    fireEvent.click(screen.getByText('Looks tasty'));

    // Check if the rating is selected (has the selected class)
    expect(screen.getByText('Looks tasty').closest('button')).toHaveClass('bg-secondary');
  });

  it('should call onRate when saving a rating', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // Select a rating
    fireEvent.click(screen.getByText('Amazing'));

    // Click save button
    fireEvent.click(screen.getByText('Save Rating'));

    // Check if onRate was called with the correct rating
    expect(mockOnRate).toHaveBeenCalledWith(5);

    // Check if thank you message is displayed
    expect(screen.getByText('Thank you for your rating! It has been saved.')).toBeInTheDocument();
  });

  it('should not allow saving without selecting a rating', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // Try to save without selecting a rating
    fireEvent.click(screen.getByText('Save Rating'));

    // Check if onRate was not called
    expect(mockOnRate).not.toHaveBeenCalled();

    // Check if thank you message is not displayed
    expect(
      screen.queryByText('Thank you for your rating! It has been saved.')
    ).not.toBeInTheDocument();
  });

  it('should call onRate callback with correct rating value', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // Select a rating option (4 points)
    fireEvent.click(screen.getByText('Looks tasty'));

    // Click save button
    fireEvent.click(screen.getByText('Save Rating'));

    // Check if onRate was called with the correct value
    expect(mockOnRate).toHaveBeenCalledWith(4);
  });

  it('should display thank you message after saving rating', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // Select a rating option
    fireEvent.click(screen.getByText('Amazing'));

    // Click save button
    fireEvent.click(screen.getByText('Save Rating'));

    // Check if thank you message is displayed
    expect(screen.getByText('Thank you for your rating! It has been saved.')).toBeInTheDocument();
  });

  it('should reset the form after 3 seconds', async () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // Select a rating option
    fireEvent.click(screen.getByText('Terrible'));

    // Click save button
    fireEvent.click(screen.getByText('Save Rating'));

    // Check if thank you message is displayed
    expect(screen.getByText('Thank you for your rating! It has been saved.')).toBeInTheDocument();

    // Advance timer by 3 seconds
    jest.advanceTimersByTime(3000);

    // Check if form is reset and rating options are displayed again
    await waitFor(() => {
      expect(screen.getByText('Terrible')).toBeInTheDocument();
    });
  });
});
