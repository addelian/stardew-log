import React, { useState } from "react";
import { Grid, Button, Input, Alert, AlertTitle, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const CustomTimer = ({ timers, setTimers }) => {
    
    const [timerName, setTimerName] = useState('');
    const [timerLength, setTimerLength] = useState('');
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleNameChange = e => {
        setTimerName(e.target.value);
    }

    const handleTimeChange = e => {
        if (validation()) {
            setHasError(true);
            return;
        }
        setHasError(false);
        setTimerLength(Number(e.target.value));
    }

    const regex = /\d/

    const clearTimer = () => {
        setTimerLength('');
        setTimerName('');
    }

    const createCustomTimer = () => {
        setTimers([ ...timers, { id: `${timerName}-custom-timer`, name: timerName, countdown: timerLength, timerType: "custom" }]);
        setTimerName('');
        setTimerLength('')
        return;
    }

    const validation = () => {
        if (timerLength && (!regex.test(timerLength) 
            || timerLength < 0 
            || (timerLength && (timerLength.includes("+") || timerLength.includes("-") || timerLength.includes("."))))) {
            setError("Timer length may only use positive whole numbers.")
            return true;
        }
    }
    
    return(
        <>
            {hasError && (
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item>
                    <Alert severity="error">
                        <AlertTitle><Typography variant="body1">Custom timer error</Typography></AlertTitle>
                        <Typography variant="body2">
                        <em>{error}</em>
                        </Typography>
                    </Alert>
                </Grid>
            </Grid>
            )}
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item>
                    <Input placeholder="Timer Name" value={timerName} onChange={handleNameChange} />
                </Grid>
                <Grid item>
                    <Input 
                        type="number"
                        error={hasError}
                        placeholder="Length (days)" 
                        onChange={handleTimeChange} 
                        value={timerLength}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{py: 1}}>
                <Grid item>
                    <Button 
                        variant="contained"
                        style={timerName && (timerLength && regex.test(timerLength)) ? {"backgroundColor": "green", "color" : "white"} : {}}
                        disabled={timerName === '' || !timerLength || (timerLength && !regex.test(timerLength))}
                        onClick={() => createCustomTimer()}
                        >
                        <FontAwesomeIcon icon={hasError ? faTimes : faCheck} /> &nbsp; Create it
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained"
                        color="warning"
                        disabled={timerName === '' || timerLength === null}
                        onClick={() => clearTimer()}
                        >
                        <FontAwesomeIcon icon={faTimes} />&nbsp;Clear it
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default CustomTimer;