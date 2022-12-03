import * as React from "react";
import {
    Grid,
    Button,
    Input,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { TimerType } from "../../helpers/types";

type CustomTimerProps = {
    timers: TimerType[],
    setTimers: (timers: TimerType[]) => void
}

const CustomTimer: React.FC<CustomTimerProps> = ({ timers, setTimers }) => {
    const [timerName, setTimerName] = React.useState("");
    const [timerLength, setTimerLength] = React.useState(undefined);
    const [timerRepeat, setTimerRepeat] = React.useState(false);
    const [repeatLength, setRepeatLength] = React.useState<number | undefined>(undefined);

    const handleNameChange = (e: any) => {
        setTimerName(e.target.value);
    };

    const handleTimeChange = (e: any) => {
        setTimerLength(e.target.value);
    };

    const handleRepeatLengthChange = (e: any) => {
        setRepeatLength(e.target.value);
    };

    const handleCheck = (e: any) => {
        setTimerRepeat(e.target.checked);
    };

    const clearTimer = () => {
        setTimerLength(undefined);
        setTimerName("");
        setTimerRepeat(false);
        setRepeatLength(undefined);
    };

    const createCustomTimer = () => {
        setTimers([
            ...timers,
            {
                id: `${timerName}-custom-timer`,
                name: timerName,
                countdown: Math.round(Number(timerLength)),
                timerType: "custom",
                repeats: timerRepeat,
                firstTime: true,
                season: ["spring", "summer", "fall", "winter"],
                repeatLength,
            },
        ]);
        setTimerName("");
        setTimerLength(undefined);
        setTimerRepeat(false);
        setRepeatLength(undefined);
        return;
    };

    const timerExists = (name: string) => {
        if (timers.some((timer) => timer.name === name)) {
            return true;
        }
        return false;
    };

    const validation = () => {
        if (
            timerName === "" ||
            timerExists(timerName) ||
            timerLength === "" ||
            Number(timerLength) > 112 ||
            typeof repeatLength !== "undefined"
        ) {
            return true;
        }
        if (timers.some((timer) => timer.name === timerName)) {
            return true;
        }
        return false;
    };

    return (
        <>
            <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Input
                        placeholder="Timer Name"
                        value={timerName}
                        onChange={handleNameChange}
                    />
                </Grid>
                <Grid item>
                    <Input
                        type="number"
                        placeholder="Length (days)"
                        onChange={handleTimeChange}
                        value={timerLength}
                    />
                </Grid>
                <Grid item>
                    <FormControl component="fieldset">
                        <FormGroup
                            aria-label="Set custom timer to repeat itself"
                            row
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={timerRepeat}
                                        onChange={handleCheck}
                                        name="timerRepeat"
                                    />
                                }
                                label="Repeat"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                {timerRepeat && (
                    <Grid item>
                        <Input
                            type="number"
                            placeholder="Length (days)"
                            onChange={handleRepeatLengthChange}
                            value={repeatLength}
                        />
                    </Grid>
                )}
            </Grid>
            <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{ py: 1 }}
            >
                <Grid item>
                    <Button
                        variant="contained"
                        style={
                            !validation()
                                ? { backgroundColor: "green", color: "white" }
                                : {}
                        }
                        disabled={validation()}
                        onClick={() => createCustomTimer()}
                    >
                        <FontAwesomeIcon icon={faCheck} /> &nbsp; Create it
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="warning"
                        disabled={timerName === "" || timerLength === null}
                        onClick={() => clearTimer()}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                        &nbsp;Clear it
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default CustomTimer;
