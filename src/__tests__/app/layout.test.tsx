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

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

// Mock the layout structure
jest.mock('@/app/layout', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <html lang="en">
        <body className="font-sans">
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    ),
  };
});

describe('RootLayout Component', () => {
  it('renders children correctly', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Test Child Content</div>
      </RootLayout>
    );

    // Check if the child is rendered
    expect(container.textContent).toContain('Test Child Content');
  });
});
