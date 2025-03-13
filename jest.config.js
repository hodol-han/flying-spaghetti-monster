const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Specify the location of next.config.js and .env files
  dir: './',
});

// Custom configuration to pass to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle aliases (should match paths in tsconfig.json)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/_*.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
};

// createJestConfig is a function that allows next/jest to provide async configuration
module.exports = createJestConfig(customJestConfig);
