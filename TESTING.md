# Random Food Combination Generator Test Documentation

This document explains the testing methods and structure of the Random Food Combination Generator project.

## Test Structure

The project's tests are structured as follows:

```
src/
├── types/                      # Type declaration files
│   └── jest-dom.d.ts           # jest-dom type declaration
└── __tests__/
    ├── components/             # Component unit tests
    │   ├── FoodCombinationGenerator.test.tsx
    │   ├── CombinationDisplay.test.tsx
    │   ├── RatingSystem.test.tsx
    │   └── SavedCombinations.test.tsx
    └── integration/            # Integration tests
        └── FoodCombinationFlow.test.tsx
```

## How to Run Tests

### Run All Tests (Simplified Output)

```bash
npm test
# or
yarn test
```

### Run Tests with Detailed Output

```bash
npm run test:verbose
# or
yarn test:verbose
```

### Run Tests in Watch Mode (Useful During Development)

```bash
npm run test:watch
# or
yarn test:watch
```

### Generate Test Coverage Report

```bash
npm run test:coverage
# or
yarn test:coverage
```

The coverage report is generated in the `coverage/` directory.

## Types of Tests

### Component Unit Tests

Tests each component's functionality independently:

- **FoodCombinationGenerator**: Tests food combination generation functionality
- **CombinationDisplay**: Tests display functionality for generated combinations
- **RatingSystem**: Tests rating system functionality
- **SavedCombinations**: Tests display functionality for saved combinations list

### Integration Tests

Tests the flow of multiple components working together:

- **FoodCombinationFlow**: Tests the entire flow from combination generation to rating and saving

## Testing Tools

- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing library
- **jest-dom**: DOM node assertion extensions

## Mock Setup

- **Timers**: Timer functions like `setTimeout` are replaced with Jest's fake timers as needed in each test.
- **ResizeObserver**: The browser API ResizeObserver is replaced with a mock implementation.

## Test Writing Guidelines

1. Each test should be independent.
2. Test descriptions should be clear and specific.
3. Each test should test only one behavior.
4. Test code should reflect the actual user experience.
5. There should be test cases for all major functionality.
6. Each test file should import `@testing-library/jest-dom` to enable DOM-related assertions.

## Troubleshooting

### Type Errors

If you encounter type errors for jest-dom matchers like `toBeInTheDocument()` in test files:

1. Verify that `import '@testing-library/jest-dom';` is added at the top of the test file.
2. Check that `tsconfig.json` includes `"types": ["jest", "@testing-library/jest-dom"]`.
3. Ensure that the `src/types/jest-dom.d.ts` file exists.
