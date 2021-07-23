import React from "react";
import { Button } from "antd";
import readDate from "../helpers/Read-Date";

const Counter = ({ day, setDay, timers, setTimers, setTimerError }) => {

    // add a confirmation when going to switch day "Are you sure??"

    const handleError = () => {
        const removeError = () => {
        setTimerError({exists: false});
        };
        setTimeout(removeError, 5000);
    }   

    const advanceDay = activeTimers => {
        day < 111 ? setDay(day + 1) : setDay(0);
        const timersCountingDown = activeTimers.map(timer => timer = {...timer, countdown: timer.countdown - 1})
        setTimers(timersCountingDown);
        const timersToRemove = timersCountingDown.filter(timer => timer.countdown < 0);
        const timersToKeep = timersCountingDown.filter(timer => timer.countdown >= 0);
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            console.log("Completed timer(s) removed: ", timersToRemove);
        }
    }

    const revertDay = activeTimers => {
        day > 0 ? setDay(day -1) : setDay(111);
        const timersCountingUp = activeTimers.map(timer => timer = {...timer, countdown: timer.countdown + 1});
        setTimers(timersCountingUp);
        const timersToRemove = timersCountingUp.filter(timer => timer.timerType === "keg" ? timer.countdown > timer.kegDuration : timer.countdown > 3);
        const timersToKeep = timersCountingUp.filter(timer => timer.timerType === "keg" ? timer.countdown <= timer.kegDuration : timer.countdown <= 3);
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            setTimerError({
                exists: true, 
                message: "Invalid Timer", 
                description: "The timers for the following items were removed:",
                triggers: timersToRemove});
            console.log("Invalid timer(s) removed: ", timersToRemove);
            handleError();
        }
    }

    const date = readDate(day);

    return (
        <>
            <div>Today is {date}</div>
            <div>
            <Button type="default" onClick={() => revertDay(timers)}>{'<'}</Button>
            <Button type="primary" onClick={() => advanceDay(timers)}>Advance day</Button>
            </div>
        </>
    )
}

export default Counter;