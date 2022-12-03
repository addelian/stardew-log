import * as React from "react";
import {
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FARM_FIXTURES } from "../../data/farm-fixtures";
import { ErrorType, TimerType } from "../../helpers/types";

type CounterProps = {
    day: number,
    setDay: (day: number) => void,
    mobile: boolean,
    timers: TimerType[];
    setTimers: (timers: TimerType[]) => void,
    error: ErrorType,
    setError: (error: ErrorType) => void
}

const Counter: React.FC<CounterProps> = ({
    day,
    setDay,
    mobile,
    timers,
    setTimers,
    error,
    setError
}) => {
    const [spring1Reminder, setSpring1Reminder] = React.useState(false);

    const handleSpring1Reminder = () => {
        setSpring1Reminder(true);
    };

    const handleSpring1Close = () => {
        setSpring1Reminder(false);
    };

    const handleError = () => {
        const removeError = () => {
            setError({ ...error, exists: false });
        };
        setTimeout(removeError, 5000);
    };

    const handleSeasonChange = (remainingTimers: TimerType[], season: string) => {
        const toRemove = remainingTimers.filter((timer) => !["jar", "keg"].includes(timer.timerType) && !timer.season.includes(season));
        const clearedTimers = remainingTimers.filter(
            (timer) => !toRemove.includes(timer)
        );
        if (timers.some(timer => timer.name === "Fruit Trees") && season !== "winter") {
            const i = clearedTimers.findIndex(
                (timer) => timer.name === "Fruit Trees"
            );
            const product = FARM_FIXTURES.find((ff) => ff.name === "Fruit Trees");
            if (typeof product !== "undefined") {
                const newSeasonFruitTrees = {
                    ...product,
                    id: `${product.name}-${product.product}`,
                    countdown: 2,
                    firstTime: true,
                    timerType: "fixture",
                    repeats: true,
                    repeatLength: product.time
                };
                clearedTimers.splice(i, 1, newSeasonFruitTrees);
            }
        }
        setTimers(clearedTimers);
        if (toRemove.length > 0) {
            setError({
                exists: true,
                message: `Welcome to ${season}!`,
                description: `The following items cannot be harvested during ${season}, and thus, their timers were removed:`,
                triggers: toRemove,
            });
            handleError();
            return;
        }
        return;
    };

    const advanceDay = (activeTimers: TimerType[]) => {
        day < 111 ? setDay(day + 1) : setDay(0);
        const timersCountingDown = activeTimers.map((timer) => {
            return { ...timer, countdown: timer.countdown - 1 };
        });
        setTimers(timersCountingDown);
        const timersToRemove = timersCountingDown.filter((timer) => timer.countdown < 0 && !timer.repeats);
        const timersToKeep = timersCountingDown.filter((timer) => timer.countdown >= 0 || timer.repeats);
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            console.log("Completed timer(s) removed: ", timersToRemove);
        }
        timersToKeep.forEach((timer) => {
            if (timer.countdown === 0 && timer.repeats) {
                if (timer.firstTime) {
                    timer.firstTime = false;
                }
                timer.countdown =
                    timer.repeatLength
                        ? timer.repeatLength
                        : typeof timer.time !== "undefined"
                            ? timer.time
                            : 0
            }
        });
        if (day === 111) {
            handleSeasonChange(timersToKeep, "spring");
            handleSpring1Reminder();
        }
        if (day === 27) {
            handleSeasonChange(timersToKeep, "summer");
        }
        if (day === 55) {
            handleSeasonChange(timersToKeep, "fall");
        }
        if (day === 83) {
            handleSeasonChange(timersToKeep, "winter");
        }
    };

    const revertDay = (activeTimers: TimerType[]) => {
        day > 0 ? setDay(day - 1) : setDay(111);
        const timersCountingUp = activeTimers.map(
            (timer) => (timer = { ...timer, countdown: timer.countdown + 1 })
        );
        setTimers(timersCountingUp);
        const timersToRemove: TimerType[] = [];
        const timersToKeep: TimerType[] = [];
        const checkRemainingTimers = (revertedTimers: TimerType[], timersFrom: string, toDo: string) => {
            if (timersFrom === "artisan") {
                if (toDo === "remove") {
                    const artisansToRemove = revertedTimers.filter(
                        (timer) =>
                            ["keg", "jar"].includes(timer.timerType) &&
                            (timer.timerType === "keg" && typeof timer.kegDuration !== "undefined"
                                ? timer.countdown > timer.kegDuration
                                : timer.name === "Sturgeon Roe" ? timer.countdown > 3 : timer.countdown > 4)
                    );
                    // if (artisansToRemove.length > 0) {
                    //     return artisansToRemove;
                    // }
                    // return;
                    if (artisansToRemove.length > 0) {
                        artisansToRemove.forEach(timer => {
                            timersToRemove.push(timer);
                        })
                    }
                    return;
                }
                if (toDo === "keep") {
                    const artisansToKeep = revertedTimers.filter(
                        (timer) =>
                            ["keg", "jar"].includes(timer.timerType) &&
                            (timer.timerType === "keg" && typeof timer.kegDuration !== "undefined"
                                ? timer.countdown <= timer.kegDuration
                                : timer.name === "Sturgeon Roe" ? timer.countdown <= 3 : timer.countdown <= 4)
                    );
                    // if (artisansToKeep.length > 0) {
                    //     return artisansToKeep;
                    // }
                    // return;
                    if (artisansToKeep.length > 0) {
                        artisansToKeep.forEach(timer => {
                            timersToKeep.push(timer);
                        })
                    }
                    return;
                }
            }
            if (timersFrom === "harvest") {
                if (toDo === "remove") {
                    const harvestsToRemove = revertedTimers.filter(
                        (timer) => timer.timerType === "harvest" &&
                            typeof timer.growTime !== "undefined" &&
                            typeof timer.repeatLength !== "undefined" &&
                            ((timer.firstTime && timer.countdown > timer.growTime) ||
                                (!timer.firstTime && timer.countdown > timer.repeatLength))
                    );
                    // if (harvestsToRemove.length > 0) {
                    //     return harvestsToRemove;
                    // }
                    // return;
                    if (harvestsToRemove.length > 0) {
                        harvestsToRemove.forEach(timer => {
                            timersToRemove.push(timer);
                        })
                    }
                    return;
                }
                if (toDo === "keep") {
                    const harvestsToKeep = revertedTimers.filter(
                        (timer) =>
                            timer.timerType === "harvest" &&
                            typeof timer.growTime !== "undefined" &&
                            typeof timer.repeatLength !== "undefined" &&
                            ((timer.firstTime &&
                                timer.countdown <= timer.growTime) ||
                                (!timer.firstTime &&
                                    timer.countdown <= timer.repeatLength))
                    );
                    // if (harvestsToKeep.length > 0) {
                    //     return harvestsToKeep;
                    // }
                    // return;
                    if (harvestsToKeep.length > 0) {
                        harvestsToKeep.forEach(timer => {
                            timersToKeep.push(timer);
                        })
                    }
                    return;
                }
            }
            if (timersFrom === "fixture") {
                if (toDo === "remove") {
                    const fixturesToRemove = revertedTimers.filter((timer: TimerType) => timer.timerType === "fixture" && typeof timer.time !== "undefined" && timer.countdown > timer.time);
                    // if (fixturesToRemove.length > 0) {
                    //     return fixturesToRemove;
                    // }
                    // return;
                    if (fixturesToRemove.length > 0) {
                        fixturesToRemove.forEach(timer => {
                            timersToRemove.push(timer);
                        })
                    }
                    return;
                }
                if (toDo === "keep") {
                    const fixturesToKeep = revertedTimers.filter((timer: TimerType) => timer.timerType === "fixture" && typeof timer.growTime !== "undefined" && timer.countdown <= timer.growTime);
                    // if (fixturesToKeep.length > 0) {
                    //     return fixturesToKeep;
                    // }
                    // return;
                    if (fixturesToKeep.length > 0) {
                        fixturesToKeep.forEach(timer => {
                            timersToKeep.push(timer);
                        })
                    }
                    return;
                }
            }
            return;
        };
        checkRemainingTimers(timersCountingUp, "artisan", "remove");
        checkRemainingTimers(timersCountingUp, "harvest", "remove");
        checkRemainingTimers(timersCountingUp, "fixture", "remove");
        checkRemainingTimers(timersCountingUp, "artisan", "keep");
        checkRemainingTimers(timersCountingUp, "harvest", "keep");
        checkRemainingTimers(timersCountingUp, "fixture", "keep");
        // checkRemainingTimers(timersCountingUp, "artisan", "remove") !==
        //     undefined
        //     ? timersToRemove.push(
        //         ...checkRemainingTimers(timersCountingUp, "artisan", "remove")
        //     )
        //     : null;
        // checkRemainingTimers(timersCountingUp, "harvest", "remove") !==
        //     undefined
        //     ? timersToRemove.push(
        //         ...checkRemainingTimers(timersCountingUp, "harvest", "remove")
        //     )
        //     : null;
        // checkRemainingTimers(timersCountingUp, "fixture", "remove") !==
        //     undefined
        //     ? timersToRemove.push(
        //         ...checkRemainingTimers(timersCountingUp, "fixture", "remove")
        //     )
        //     : null;
        // checkRemainingTimers(timersCountingUp, "artisan", "keep") !== undefined
        //     ? timersToKeep.push(
        //         ...checkRemainingTimers(timersCountingUp, "artisan", "keep")
        //     )
        //     : null;
        // checkRemainingTimers(timersCountingUp, "harvest", "keep") !== undefined
        //     ? timersToKeep.push(
        //         ...checkRemainingTimers(timersCountingUp, "harvest", "keep")
        //     )
        //     : null;
        // checkRemainingTimers(timersCountingUp, "fixture", "keep") !== undefined
        //     ? timersToKeep.push(
        //         ...checkRemainingTimers(timersCountingUp, "fixture", "keep")
        //     )
        //     : null;
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            setError({
                exists: true,
                message: "Invalid Timer",
                description: "The timers for the following items were removed:",
                triggers: timersToRemove,
            });
            handleError();
        }
    };

    return (
        <>
            <Dialog
                open={spring1Reminder}
                onClose={handleSpring1Close}
                aria-labelledby="spring-1-dialog"
            >
                <DialogTitle id="spring-1-dialog">
                    Spring has sprung again!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you have bee houses and mature fruit trees on your
                        farm, you'll want to reactivate those timers today!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => handleSpring1Close()}
                        color="primary"
                    >
                        Got it
                    </Button>
                </DialogActions>
            </Dialog>
            {!mobile ? (
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => revertDay(timers)}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    &nbsp;&nbsp;Revert Day
                </Button>
            ) : (
                <IconButton
                    color="secondary"
                    sx={{ px: 2 }}
                    onClick={() => revertDay(timers)}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </IconButton>
            )}
            {!mobile ? (
                <Button
                    color="success"
                    size="small"
                    variant="contained"
                    onClick={() => advanceDay(timers)}
                >
                    Advance Day&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            ) : (
                <IconButton
                    sx={{ color: "white", pl: 2 }}
                    onClick={() => advanceDay(timers)}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </IconButton>
            )}
        </>
    );
};

export default Counter;
