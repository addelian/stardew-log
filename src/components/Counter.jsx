import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faFire } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";

const Counter = ({ 
    day, 
    setDay, 
    mobile, 
    setMobile, 
    timers, 
    setTimers, 
    setError, 
    setHasHoney, 
    hasFruitTrees, 
    setHasFruitTrees,
    setShowState,
    setJournalText
    }) => {

    // add a confirmation when going to switch day "Are you sure??"

    useEffect(() => {
        const setResponsiveness = () => {
            if (window.innerWidth < 500) {
                setMobile(true);
            }
            else (setMobile(false));
        }

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        }
    }, [])

    const [resetOpen, setResetOpen] = useState(false);
    const [spring1Reminder, setSpring1Reminder] = useState(false);

    const handleResetOpen = () => {
        setResetOpen(true);
    }

    const handleResetClose = () => {
        setResetOpen(false);
    }

    const handleSpring1Reminder = () => {
        setSpring1Reminder(true);
    }

    const handleSpring1Close = () => {
        setSpring1Reminder(false);
    }

    const handleError = () => {
        const removeError = () => {
        setError({exists: false});
        };
        setTimeout(removeError, 5000);
    }   

    const handleSeasonChange = (remainingTimers, season) => {

        const toRemove = remainingTimers.filter(timer => !timer.season.includes(season) && timer.timerType === "harvest");
        const clearedTimers = remainingTimers.filter(timer => !toRemove.includes(timer));
        if (hasFruitTrees && season !== "winter") {
            const i = clearedTimers.findIndex(timer => timer.name === "Fruit Trees");
            const product = CROPS.find(crop => crop.name === "Fruit Trees");
            const newSeasonFruitTrees = { 
                ...product, 
                countdown: 2, 
                firstHarvest: true, 
                initialCycle: false,
                timerType: "harvest",
                timerFor: "Fruit Trees" 
            }
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
                triggers: toRemove
            });
            handleError();
            return;
        }
        return;
    }

    const advanceDay = activeTimers => {
        day < 111 ? setDay(day + 1) : setDay(0);
        const timersCountingDown = activeTimers.map(timer => {
            return {...timer, countdown: timer.countdown - 1}
        })
        setTimers(timersCountingDown);
        const timersToRemove = timersCountingDown.filter(timer => timer.countdown < 0 && !timer.regrow);
        const timersToKeep = timersCountingDown.filter(timer => timer.countdown >= 0 || timer.regrow);
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            console.log("Completed timer(s) removed: ", timersToRemove);
        }
        timersToKeep.forEach(timer => {
            if (timer.countdown === 0 && timer.regrow) {
                if (!timer.firstHarvest) {
                    if (timer.initialCycle) {
                        timer.initialCycle = false;
                    }
                }
                if (timer.firstHarvest) {
                    timer.firstHarvest = false;
                }
                timer.countdown = timer.regrowTime;
            }
        })
        // Spring 1 is 0
        // Summer 1 is 28
        // Fall 1 is 56
        // Winter 1 is 83
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
    }

    const revertDay = activeTimers => {
        day > 0 ? setDay(day -1) : setDay(111);
        const timersCountingUp = activeTimers.map(timer => timer = {...timer, countdown: timer.countdown + 1});
        setTimers(timersCountingUp);
        const timersToRemove = timersCountingUp.filter(timer => timer.timerType === "keg" ? timer.countdown > timer.kegDuration : timer.countdown > 3);
        const timersToKeep = timersCountingUp.filter(timer => timer.timerType === "keg" ? timer.countdown <= timer.kegDuration : timer.countdown <= 3);
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            setError({
                exists: true, 
                message: "Invalid Timer", 
                description: "The timers for the following items were removed:",
                triggers: timersToRemove
            });
            console.log("Invalid timer(s) removed: ", timersToRemove);
            if (timersToRemove.some(timer => timer.name === "Honey")) {
                setHasHoney(false);
            }
            if (timersToRemove.some(timer => timer.name === "Fruit Trees")) {
                setHasFruitTrees(false);
            }
            handleError();
        }
    }

    const resetAll = () => {
        // TODO: Put this behind a menu at some point, don't leave it out in the open.
        // As it exists, it's really only good for dev purposes
        setDay(0);
        setTimers([]);
        setHasHoney(false);
        setHasFruitTrees(false);
        setShowState({
            date: true,
            artisanTimers: true,
            currentTimers: true,
            harvestTimers: true,
            journal: true
        });
        setJournalText(
            "Hi there! Use me to take any notes you'd like. My value will persist between page loads as long as you don't clear your cache."
        );
        setResetOpen(false);
    }

    return (
        <>
            {!mobile ? <Button size="small" variant="contained" color="error" onClick={() => handleResetOpen()}>Reset all</Button>
                : <Button variant="contained" color="error" onClick={() => handleResetOpen()}><FontAwesomeIcon icon={faFire} /></Button>}
            <Dialog
                open={resetOpen}
                onClose={handleResetClose}
                aria-labelledby="reset-dialog"
            >
                <DialogTitle id="reset-dialog">
                    Are you sure you wish to reset?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You will lose all of your timers, as well as the contents of your journal, and be sent back to Spring 1
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleResetClose()} color="primary">
                        No
                    </Button>
                    <Button onClick={() => resetAll()} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
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
                        If you have bee houses and mature fruit trees on your farm,
                        you'll want to reactivate those timers today!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleSpring1Close()} color="primary">
                        Got it
                    </Button>
                </DialogActions>
            </Dialog>
            {!mobile ? <Button size="small" variant="contained" color="secondary" onClick={() => revertDay(timers)}><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;Revert Day</Button>
                : <Button variant="contained" color="secondary" onClick={() => revertDay(timers)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
            }
            {!mobile ? <Button color="success" size="small" variant="contained" onClick={() => advanceDay(timers)}>Advance day&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowRight} /></Button>
                : <Button color="success" variant="contained" onClick={() => advanceDay(timers)}><FontAwesomeIcon icon={faArrowRight} /></Button>
            }
        </>
    );
}

export default Counter;