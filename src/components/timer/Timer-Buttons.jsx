import React, { useState } from "react";
import { Button, Grid, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, FormControlLabel, Checkbox, InputLabel, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWineBottle,
    faUtensilSpoon,
    faTimes,
    faLeaf,
    faCarrot
} from "@fortawesome/free-solid-svg-icons";

const TimerButtons = ({
    type,
    selected,
    setSelected,
    timers,
    setTimers,
    skipTreeWarning,
    setSkipTreeWarning
}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        if (!skipTreeWarning) {
            setOpen(true);
            return;
        }
        if (open) {
            handleClose();
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelected("");
    };

    const handleFruitTrees = (selectedOption) => {
        setTimers([
            ...timers,
            {
                ...selectedOption,
                id: `${selectedOption.name}-${selectedOption.product}`,
                countdown: 2,
                timerType: "fixture",
                firstTime: true,
                repeats: true,
                repeatLength: selectedOption.time
            }
        ]);
        handleClose();
    }

    const handleCheck = (e) => {
        setSkipTreeWarning(e.target.checked);
    };

    const buttonStyling = (selectedOption, parentButton) => {
        if (timers.some((timer) => timer.name === selected.name)) return {};
        if (selectedOption !== "" && selectedOption.preferred !== undefined) {
            if (parentButton === "keg" && selectedOption.preferred === "keg") {
                return { backgroundColor: "green", color: "white" };
            }
            if (parentButton === "jar" && selectedOption.preferred === "jar") {
                return { backgroundColor: "green", color: "white" };
            }
            return { backgroundColor: "red", color: "white" };
        }
        return {};
    };

    const clearTimer = (selectedOption) => {
        if (selectedOption !== "") {
            setSelected("");
        }
    };

    const createHarvestTimer = (selectedOption) => {
        if (selectedOption.repeats) {
            setTimers([
                ...timers,
                {
                    ...selectedOption,
                    countdown: selectedOption.growTime,
                    timerType: "harvest",
                    firstTime: true
                }
            ]);
            setSelected("");
            return;
        }
        setTimers([
            ...timers,
            {
                ...selectedOption,
                countdown: selectedOption.growTime,
                timerType: "harvest",
                firstTime: false,
                repeatLength: selectedOption.growTime
            }
        ]);
        setSelected("");
        return;
    };


    const createKegTimer = (selectedOption) => {
        setTimers([
            ...timers,
            {
                ...selectedOption,
                id: `${selectedOption.name}-${selectedOption.kegProduct}`,
                countdown: selectedOption.kegDuration,
                timerFor: selectedOption.kegProduct,
                timerType: "keg",
                repeats: false
            },
        ]);
        setSelected("");
    };

    const createJarTimer = (selectedOption) => {
        setTimers([
            ...timers,
            {
                ...selectedOption,
                id: `${selectedOption.name}-${selectedOption.jarProduct}`,
                countdown: selectedOption.name === "Sturgeon Roe" ? 3 : 4,
                timerFor: selectedOption.jarProduct,
                timerType: "jar",
                repeats: false
            },
        ]);
        setSelected("");
    };

    const createFixtureTimer = (selectedOption) => {
        if (selectedOption.name === "Fruit Trees" && !skipTreeWarning) {
            handleClickOpen();
            return;
        }
        setTimers([
            ...timers,
            {
                ...selectedOption,
                id: `${selectedOption.name}-${selectedOption.product}`,
                countdown: selectedOption.name === "Fruit Trees" ? 2 : selectedOption.time,
                timerType: "fixture",
                firstTime: true,
                repeats: true,
                repeatLength: selectedOption.time
            }
        ]);
        setSelected("");
    }

    return (
        <>
            {type === "harvest" && (
                <Grid item>
                    <Button
                        variant="contained"
                        style={
                            selected !== ""
                                ? { backgroundColor: "green", color: "white" }
                                : {}
                        }
                        disabled={selected === ""}
                        onClick={() => createHarvestTimer(selected)}
                    >
                        <FontAwesomeIcon icon={faCarrot} />
                        &nbsp;Plant it
                    </Button>
                </Grid>
            )}
            {type === "artisan" && (
                <>
                    <Grid item>
                        <Button
                            variant="contained"
                            style={buttonStyling(selected, "keg")}
                            disabled={
                                selected === "" ||
                                ["Ginger", "Roe", "Sturgeon Roe"].includes(
                                    selected.name
                                ) ||
                                timers.some(
                                    (timer) =>
                                        selected.name === timer.name &&
                                        timer.timerType === "keg"
                                )
                            }
                            onClick={() => createKegTimer(selected)}
                        >
                            <FontAwesomeIcon icon={faWineBottle} />
                            &nbsp;Keg it
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            style={buttonStyling(selected, "jar")}
                            disabled={
                                selected === "" ||
                                ["Coffee Bean", "Honey"].includes(selected.name) ||
                                timers.some(
                                    (timer) =>
                                        selected.name === timer.name &&
                                        timer.timerType === "jar"
                                )
                            }
                            onClick={() => createJarTimer(selected)}
                        >
                            <FontAwesomeIcon icon={faUtensilSpoon} />
                            &nbsp;Jar it
                        </Button>
                    </Grid>
                </>
            )}
            {type === "fixture" && (
                <Grid item>
                    <Button
                        variant="contained"
                        style={
                            selected !== ""
                                ? { backgroundColor: "green", color: "white" }
                                : {}
                        }
                        disabled={selected === ""}
                        onClick={() => createFixtureTimer(selected)}
                    >
                        <FontAwesomeIcon icon={faLeaf} />
                        &nbsp;Add it
                    </Button>
                </Grid>
            )}
            <Grid item>
                <Button
                    variant="contained"
                    color="warning"
                    disabled={selected === ""}
                    onClick={() => clearTimer(selected)}
                >
                    <FontAwesomeIcon icon={faTimes} />
                    &nbsp;Clear it
                </Button>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="tree-timer-dialog"
            >
                <DialogTitle id="tree-timer-dialog">
                    Heads up!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This timer assumes that you already have fully
                        matured fruit trees and just need to keep track
                        of their fruit growth. If you need to track a
                        fruit tree sapling, please build a custom timer
                        that lasts 28 days. Do you wish to proceed?
                    </DialogContentText>
                    <FormControl component="fieldset">
                        <FormGroup
                            aria-label="Don't show this reminder again"
                            row
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={skipTreeWarning}
                                        onChange={handleCheck}
                                        name="skipTreeWarning"
                                    />
                                }
                                label="Don't show this reminder again"
                            />
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => handleClose()}
                        color="primary"
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => handleFruitTrees(selected)}
                        color="primary"
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            {type === undefined && ""}
        </>
    )
};

export default TimerButtons;
