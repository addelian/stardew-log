import React, { useState } from "react";
import { Button, Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWineBottle,
    faFan,
    faUtensilSpoon,
    faTimes,
    faLeaf,
    faCarrot
} from "@fortawesome/free-solid-svg-icons";

const TimerButtons = ({
    type,
    selected,
    timers
}) => {

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

    const createKegTimer = (selectedOption) => {
        setTimers([
            ...timers,
            {
                ...selectedOption,
                id: `${selectedOption.name}-${selectedOption.kegProduct}`,
                countdown: selectedOption.kegDuration,
                timerFor: selectedOption.kegProduct,
                timerType: "keg",
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
                countdown: selectedOption.name === "Caviar" ? 3 : 4,
                timerFor: selectedOption.jarProduct,
                timerType: "jar",
            },
        ]);
        setSelected("");
    };

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
            {type === undefined && ""}
        </>
    )
};

export default TimerButtons;
