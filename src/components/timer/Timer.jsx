import React, { useState } from "react";
import {
    Grid,
    Button,
    Checkbox,
    Select,
    FormGroup,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import TimerSelection from "./Timer-Selection";
import TimerButtons from "./Timer-Buttons";

const Timer = ({ label, list, type, timers, setTimers, skipTreeWarning, setSkipTreeWarning }) => {
    const [selected, setSelected] = useState("");

    const handleChange = (e) => {
        if (e.target.value !== "") {
            const selectedOption = list.find(
                (item) => item.id === e.target.value
            );
            setSelected(selectedOption);
        }
    };

    return (
        // Selection component to pass stuff from data folder? This will be different for custom, at least...
        // Buttons component for Plant it / keg or jar it / add it / create it (if want to do custom here too)
        // Clear button separate component? probably could leave it at this level since it's consistent
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <TimerSelection
                selectionLabel={label}
                selectionList={list}
                type={type}
                handleChange={handleChange}
                selected={selected}
                setSelected={setSelected}
            />
            <TimerButtons type={type} timers={timers} setTimers={setTimers} selected={selected} setSelected={setSelected} skipTreeWarning={skipTreeWarning} setSkipTreeWarning={setSkipTreeWarning} />
        </Grid>
    );
};

export default Timer;
