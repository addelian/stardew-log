import * as React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Home from "./Home";

test('renders top navbar', () => {
    render(<Home />);

    const navTitle = screen.getByText("Stardew Log");
    expect(navTitle).toBeInTheDocument();
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);
    // nav menu rendered after clicking hamburger
    const menuOptions = [screen.getByRole("menuitem", { name: "Log" }), screen.getByRole("menuitem", { name: "Settings" }), screen.getByRole("menuitem", { name: "About" })];
    menuOptions.forEach(option => expect(option).toBeInTheDocument);

});