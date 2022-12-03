import * as React from "react";
import {
    Grid
} from "@mui/material";
import TimerSelection from "./Timer-Selection";
import TimerButtons from "./Timer-Buttons";
import { CropType, FixtureType, TimerType } from "../../helpers/types";

type TimerProps = {
    label: string,
    list: CropType[] | FixtureType[],
    type: string,
    timers: TimerType[],
    setTimers: (timers: TimerType[]) => void,
    skipTreeWarning: boolean,
    setSkipTreeWarning: (skip: boolean) => void
}

const Timer: React.FC<TimerProps> = ({ label, list, type, timers, setTimers, skipTreeWarning, setSkipTreeWarning }) => {
    const [selected, setSelected] = React.useState<CropType | FixtureType | undefined>(undefined);

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
