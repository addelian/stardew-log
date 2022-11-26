import React, { useState } from "react";
import {
    Grid
} from "@mui/material";
import TimerSelection from "./Timer-Selection";
import TimerButtons from "./Timer-Buttons";

const Timer = ({ label, list, type, timers, setTimers, skipTreeWarning, setSkipTreeWarning }) => {
    const [selected, setSelected] = useState("");

    return (
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <TimerSelection
                selectionLabel={label}
                selectionList={list}
                type={type}
                selected={selected}
                setSelected={setSelected}
            />
            <TimerButtons type={type} timers={timers} setTimers={setTimers} selected={selected} setSelected={setSelected} skipTreeWarning={skipTreeWarning} setSkipTreeWarning={setSkipTreeWarning} />
        </Grid>
    );
};

export default Timer;
