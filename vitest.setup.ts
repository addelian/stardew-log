import '@testing-library/jest-dom';

// Provide any globals or mocks used by the CRA tests
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
