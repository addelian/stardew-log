import * as React from "react";
import { Button, Grid, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, FormControlLabel, Checkbox, InputLabel, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWineBottle,
    faUtensilSpoon,
    faTimes,
    faLeaf,
    faCarrot
} from "@fortawesome/free-solid-svg-icons";
import { CropType, FixtureType, TimerType } from "../../helpers/types";

type TimerButtonsProps = {
    type: string,
    selected: CropType | FixtureType | string,
    setSelected: (s: CropType | FixtureType | string) => void,
    timers: TimerType[];
    setTimers: (timers: TimerType[]) => void,
    skipTreeWarning: boolean,
    setSkipTreeWarning: (skip: boolean) => void
}

const TimerButtons: React.FC<TimerButtonsProps> = ({
    type,
    selected,
    setSelected,
    timers,
    setTimers,
    skipTreeWarning,
    setSkipTreeWarning
}) => {

    const [open, setOpen] = React.useState(false);

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

    const handleFruitTrees = (selectedOption: CropType | FixtureType | string) => {
        if (typeof selectedOption !== "string") {
            setTimers([
                ...timers,
                {
                    ...selectedOption,
                    id: `${selectedOption.name}-timer`,
                    countdown: 2,
                    timerType: "fixture",
                    firstTime: true,
                    repeats: true,
                    repeatLength: 3
                }
            ]);
            handleClose();
        }
        return;
    }

    const handleCheck = (e: any) => {
        setSkipTreeWarning(e.target.checked);
    };

    const buttonStyling = (selectedOption: CropType | FixtureType | string, parentButton: string) => {
        if (timers.some((timer) => typeof selected !== "string" && timer.name === selected.name)) return {};
        if (typeof selectedOption !== "string" && typeof selectedOption.preferred !== "undefined") {
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

    const clearTimer = (selectedOption: CropType | FixtureType | string) => {
        if (typeof selectedOption !== "string") {
            setSelected("");
        }
    };

    const createHarvestTimer = (selectedOption: CropType | FixtureType | string) => {
        if (typeof selectedOption !== "string") {
            if (selectedOption.repeats) {
                setTimers([
                    ...timers,
                    {
                        ...selectedOption,
                        countdown: typeof selectedOption.growTime !== "undefined" ? selectedOption.growTime : 0,
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
                    countdown: typeof selectedOption.growTime !== "undefined" ? selectedOption.growTime : 0,
                    timerType: "harvest",
                    firstTime: false,
                    repeatLength: selectedOption.growTime
                }
            ]);
            setSelected("");
            return;
        }
        return;
    };


    const createKegTimer = (selectedOption: CropType | FixtureType | string) => {
        if (typeof selectedOption !== "string") {
            setTimers([
                ...timers,
                {
                    ...selectedOption,
                    id: `${selectedOption.name}-${selectedOption.kegProduct}`,
                    countdown: typeof selectedOption.kegDuration !== "undefined" ? selectedOption.kegDuration : 0,
                    timerFor: selectedOption.kegProduct,
                    timerType: "keg",
                    repeats: false
                },
            ]);
            setSelected("");
        }
        return;
    };

    const createJarTimer = (selectedOption: CropType | FixtureType | string) => {
        if (typeof selectedOption !== "string") {
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
        }
        return;
    };

    const createFixtureTimer = (selectedOption: FixtureType | CropType | string) => {
        if (typeof selectedOption !== "string") {

            if (selectedOption.name === "Fruit Trees" && !skipTreeWarning) {
                handleClickOpen();
                return;
            }
            setTimers([
                ...timers,
                {
                    ...selectedOption,
                    id: `${selectedOption.name}-${selectedOption.product}`,
                    countdown: selectedOption.name === "Fruit Trees" ? 2 : typeof selectedOption.time !== "undefined" ? selectedOption.time : 0,
                    timerType: "fixture",
                    firstTime: true,
                    repeats: true,
                    repeatLength: selectedOption.time
                }
            ]);
            setSelected("");
        }
        return;
    }

    return (
        <>
            {type === "harvest" && (
                <Grid item>
                    <Button
                        variant="contained"
                        style={
                            typeof selected !== "string"
                                ? { backgroundColor: "green", color: "white" }
                                : {}
                        }
                        disabled={typeof selected === "string"}
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
                                typeof selected === "string" ||
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
                                typeof selected === "string" ||
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
                            typeof selected !== "string"
                                ? { backgroundColor: "green", color: "white" }
                                : {}
                        }
                        disabled={typeof selected === "string"}
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
                    disabled={typeof selected === "string"}
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
