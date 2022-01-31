import React, { useState } from "react";
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
import { CROPS } from "../data/crops";

const Counter = ({
    day,
    setDay,
    mobile,
    timers,
    setTimers,
    setError,
    setHasHoney,
    hasFruitTrees,
    setHasFruitTrees,
}) => {
    const [spring1Reminder, setSpring1Reminder] = useState(false);

    const handleSpring1Reminder = () => {
        setSpring1Reminder(true);
    };

    const handleSpring1Close = () => {
        setSpring1Reminder(false);
    };

    const handleError = () => {
        const removeError = () => {
            setError({ exists: false });
        };
        setTimeout(removeError, 5000);
    };

    const handleSeasonChange = (remainingTimers, season) => {
        const toRemove = remainingTimers.filter(
            (timer) =>
                timer.timerType === "harvest" && !timer.season.includes(season)
        );
        const clearedTimers = remainingTimers.filter(
            (timer) => !toRemove.includes(timer)
        );
        if (hasFruitTrees && season !== "winter") {
            const i = clearedTimers.findIndex(
                (timer) => timer.name === "Fruit Trees"
            );
            const product = CROPS.find((crop) => crop.name === "Fruit Trees");
            const newSeasonFruitTrees = {
                ...product,
                countdown: 2,
                firstHarvest: true,
                timerType: "harvest",
                timerFor: "Fruit Trees",
            };
            clearedTimers.splice(i, 1, newSeasonFruitTrees);
        }
        setTimers(clearedTimers);
        if (season === "winter") {
            setHasFruitTrees(false);
            setHasHoney(false);
        }
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

    const advanceDay = (activeTimers) => {
        day < 111 ? setDay(day + 1) : setDay(0);
        const timersCountingDown = activeTimers.map((timer) => {
            return { ...timer, countdown: timer.countdown - 1 };
        });
        setTimers(timersCountingDown);
        const timersToRemove = timersCountingDown.filter(
            (timer) =>
                timer.countdown < 0 &&
                !(
                    (timer.timerType === "harvest" && timer.regrow) ||
                    (timer.timerType === "custom" && timer.repeat)
                )
        );
        const timersToKeep = timersCountingDown.filter(
            (timer) =>
                timer.countdown >= 0 ||
                (timer.timerType === "harvest" && timer.regrow) ||
                (timer.timerType === "custom" && timer.repeat)
        );
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            console.log("Completed timer(s) removed: ", timersToRemove);
        }
        timersToKeep.forEach((timer) => {
            if (
                timer.countdown === 0 &&
                (timer.timerType === "harvest" ||
                    timer.timerType === "custom") &&
                (timer.regrow || timer.repeat)
            ) {
                if (timer.firstHarvest) {
                    timer.firstHarvest = false;
                }
                timer.countdown =
                    timer.timerType === "harvest"
                        ? timer.regrowTime
                        : timer.repeatLength;
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

    const revertDay = (activeTimers) => {
        day > 0 ? setDay(day - 1) : setDay(111);
        const timersCountingUp = activeTimers.map(
            (timer) => (timer = { ...timer, countdown: timer.countdown + 1 })
        );
        setTimers(timersCountingUp);
        const timersToRemove = [];
        const timersToKeep = [];
        const checkRemainingTimers = (revertedTimers, timersFrom, toDo) => {
            if (timersFrom === "artisan") {
                if (toDo === "remove") {
                    const artisansToRemove = revertedTimers.filter(
                        (timer) =>
                            ["keg", "jar"].includes(timer.timerType) &&
                            (timer.timerType === "keg"
                                ? timer.countdown > timer.kegDuration
                                : timer.countdown > 3)
                    );
                    if (artisansToRemove.length > 0) {
                        return artisansToRemove;
                    }
                    return;
                }
                if (toDo === "keep") {
                    const artisansToKeep = revertedTimers.filter(
                        (timer) =>
                            ["keg", "jar"].includes(timer.timerType) &&
                            (timer.timerType === "keg"
                                ? timer.countdown <= timer.kegDuration
                                : timer.countdown <= 3)
                    );
                    if (artisansToKeep.length > 0) {
                        return artisansToKeep;
                    }
                    return;
                }
            }
            if (timersFrom === "harvest") {
                if (toDo === "remove") {
                    const harvestsToRemove = revertedTimers.filter(
                        (timer) =>
                            timer.timerType === "harvest" &&
                            ((timer.firstHarvest &&
                                timer.countdown > timer.growTime) ||
                                (!timer.firstHarvest &&
                                    timer.countdown > timer.regrowTime))
                    );
                    if (harvestsToRemove.length > 0) {
                        return harvestsToRemove;
                    }
                    return;
                }
                if (toDo === "keep") {
                    const harvestsToKeep = revertedTimers.filter(
                        (timer) =>
                            timer.timerType === "harvest" &&
                            ((timer.firstHarvest &&
                                timer.countdown <= timer.growTime) ||
                                (!timer.firstHarvest &&
                                    timer.countdown <= timer.regrowTime))
                    );
                    if (harvestsToKeep.length > 0) {
                        return harvestsToKeep;
                    }
                    return;
                }
            }
            return;
        };
        checkRemainingTimers(timersCountingUp, "artisan", "remove") !==
        undefined
            ? timersToRemove.push(
                  ...checkRemainingTimers(timersCountingUp, "artisan", "remove")
              )
            : null;
        checkRemainingTimers(timersCountingUp, "harvest", "remove") !==
        undefined
            ? timersToRemove.push(
                  ...checkRemainingTimers(timersCountingUp, "harvest", "remove")
              )
            : null;
        checkRemainingTimers(timersCountingUp, "artisan", "keep") !== undefined
            ? timersToKeep.push(
                  ...checkRemainingTimers(timersCountingUp, "artisan", "keep")
              )
            : null;
        checkRemainingTimers(timersCountingUp, "harvest", "keep") !== undefined
            ? timersToKeep.push(
                  ...checkRemainingTimers(timersCountingUp, "harvest", "keep")
              )
            : null;
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            setError({
                exists: true,
                message: "Invalid Timer",
                description: "The timers for the following items were removed:",
                triggers: timersToRemove,
            });
            console.log("Invalid timer(s) removed: ", timersToRemove);
            if (timersToRemove.some((timer) => timer.name === "Honey")) {
                setHasHoney(false);
            }
            if (timersToRemove.some((timer) => timer.name === "Fruit Trees")) {
                setHasFruitTrees(false);
            }
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
                    Advance day&nbsp;&nbsp;
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
