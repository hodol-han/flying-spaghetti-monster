// jest-dom adds custom assertions for DOM nodes
import '@testing-library/jest-dom';

// Mock timer setup - global setup, use only when needed in individual tests
// jest.useFakeTimers();

// Global mock setup
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Suppress console errors (if needed)
const originalConsoleError = console.error;
console.error = (...args) => {
  // Suppress React 18 useEffect warnings
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: ReactDOM.render is no longer supported')
  ) {
    return;
  }
  originalConsoleError(...args);
};
