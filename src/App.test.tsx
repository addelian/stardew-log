import * as React from 'react';
import { render } from '@testing-library/react';
import App from './App';


describe("canary", () => {
    it('should pass', () => {
        render(<App />);
    });
});
