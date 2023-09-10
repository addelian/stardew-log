import * as React from "react";
import { render, screen } from '@testing-library/react';
import Home from "./Home";

test('footer renders on every page', () => {
    render(<Home />);

    const footerCopyright = screen.getByText("Stardew Valley © ConcernedApe LLC.");
    expect(footerCopyright).toBeInTheDocument();
    const quote = screen.getByTestId("quote");
    expect(quote).toBeInTheDocument;

});