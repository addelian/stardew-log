import * as React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Counter from "./Counter";
import { ErrorType, TimerType } from "../../helpers/types";

beforeEach(() => {
    const Wrapper = () => {
        const [day, setDay] = React.useState(0);
        const [timers, setTimers] = React.useState<TimerType[] | []>([]);
        const [error, setError] = React.useState<ErrorType>({
            exists: false,
            message: "Oh no!",
            description: "",
            triggers: [],
        });
        return <Counter
            day={day}
            setDay={setDay}
            timers={timers}
            setTimers={setTimers}
            mobile={false}
            error={error}
            setError={setError} />
    }
    render(<Wrapper />);
})

test("renders revert and advance day buttons", () => {

    const dayButtons = [screen.getByText("Revert Day"), screen.getByText("Advance Day")]
    dayButtons.forEach(button => expect(button).toBeInTheDocument);

});

test("dialog is visible when advancing from Winter 28 to Spring 1 and disappears when confirmation button is clicked", () => {

    const revert = screen.getByRole("button", { name: "Revert Day" });
    const advance = screen.getByRole("button", { name: "Advance Day" });
    // to Winter 28
    fireEvent.click(revert);
    // to Spring 1
    fireEvent.click(advance);
    const dialog = screen.getByTestId("sentinelStart");
    expect(dialog).toBeInTheDocument();
    const dialogButton = screen.getByRole("button", { name: "Got it" });
    fireEvent.click(dialogButton);
    // modal doesn't unmount immediately, add slight delay to handle garbage collection
    setTimeout(() => {
        expect(screen.getByTestId("sentinelStart")).not.toBeInTheDocument();
    }, 100);
});