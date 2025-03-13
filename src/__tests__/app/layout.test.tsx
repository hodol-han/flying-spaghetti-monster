import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '@/app/layout';

// Mock the Inter font
jest.mock('next/font/google', () => ({
  Inter: jest.fn().mockReturnValue({
    className: 'mocked-inter',
    variable: '--mocked-font-inter',
  }),
}));

describe('RootLayout Component', () => {
  it('renders children correctly', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Test Child Content</div>
      </RootLayout>
    );

    // Check if the child is rendered
    expect(container.querySelector('[data-testid="test-child"]')).toBeInTheDocument();

    // Check if the font variable class is applied
    expect(container.querySelector('body')).toHaveClass('font-sans');

    // Check if the main element exists
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('main')).toHaveClass('min-h-screen');
  });

  it('has correct lang attribute', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    // Check if html element has the correct lang attribute
    // In the testing environment, we need to check the container itself
    expect(container.querySelector('html')).toHaveAttribute('lang', 'ko');
  });
});
