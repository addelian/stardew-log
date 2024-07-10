import * as React from "react";
import { render, screen } from '@testing-library/react';
import LogPage from "./Log-Page";
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
        const [journalText, setJournalText] = React.useState(
            "Hi there! Use me to take any notes you'd like. My value will persist between page loads as long as you don't clear your cache. 😎"
        );
        const [skipTreeWarning, setSkipTreeWarning] = React.useState(false);
        const [showState, setShowState] = React.useState({
            date: true,
            artisanTimers: true,
            harvestTimers: true,
            fixtureTimers: true,
            currentTimers: true,
            journal: true,
            customTimers: false,
        });
        const [mobile, setMobile] = React.useState(false);
        const handleCheck = (e: any) => {
            setShowState({
                ...showState,
                [e.target.name]: e.target.checked,
            });
        };
        return <LogPage
            showState={showState}
            mobile={mobile}
            handleCheck={handleCheck}
            day={day}
            error={error}
            timers={timers}
            setTimers={setTimers}
            journalText={journalText}
            setJournalText={setJournalText}
            skipTreeWarning={skipTreeWarning}
            setSkipTreeWarning={setSkipTreeWarning}
    />
    }
    render(<Wrapper />);
})

test("initial conditions of show ___ checkboxes and date", () => {
    const defaultShowCheckboxes = [screen.getByRole("checkbox", { name: "Show date" }), 
        screen.getByRole("checkbox", { name: "Show current timers" }),
        screen.getByRole("checkbox", { name: "Show harvest timer builder" }),
        screen.getByRole("checkbox", { name: "Show artisan timer builder" }),
        screen.getByRole("checkbox", { name: "Show farm fixture timer builder" }),
        screen.getByRole("checkbox", { name: "Show journal" })];
        defaultShowCheckboxes.forEach(box => expect(box).toBeChecked());
    const showCustomCheckbox = screen.getByRole("checkbox", { name: "Show custom timer builder" });
    expect(showCustomCheckbox).not.toBeChecked();
    const date = screen.getByText("Spring 1");
    expect(date).toBeInTheDocument();
});

describe("harvest timer functionality", () => {
    
});