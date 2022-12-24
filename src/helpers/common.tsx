import { TimerType } from "./types";

export const readDate = (day: number) => {
    if (0 <= day && day <= 27) {
        return `Spring ${day + 1}`;
    }
    if (28 <= day && day <= 55) {
        return `Summer ${day - 27}`;
    }
    if (56 <= day && day <= 83) {
        return `Fall ${day - 55}`;
    }
    return `Winter ${day - 83}`;
};

export const removeSingleTimer = (allTimers: TimerType[], toBeDeleted: TimerType) => {
    const updatedTimers = allTimers.filter(
        (timer) => timer.id !== toBeDeleted.id
    );
    return updatedTimers;
};