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
        // if (validation()) {
        //     setHasError(true);
        //     return;
        // }
        // setHasError(false);
        setTimerLength(e.target.value);
    }

    const regex = /\d/

    const clearTimer = () => {
        setTimerLength('');
        setTimerName('');
        setHasError(false);
        setError('');
    }

    const createCustomTimer = () => {
        setTimers([ ...timers, { id: `${timerName}-custom-timer`, name: timerName, countdown: Math.round(Number(timerLength)), timerType: "custom" }]);
        setTimerName('');
        setTimerLength('');
        setHasError(false);
        setError('');
        return;
    }

    const validation = () => {
        if (timerName === '' || Number(timerLength) === NaN || timerExists(timerName) || timerLength === '' || Number(timerLength) > 112) {
            return true;
        }
        if (timers.some(timer => timer.name === timerName)) {
            return true;
        }
        return false;
    }

    const timerExists = name => {
        if (timers.some(timer => timer.name === name)) {
            return true;
        }
        return false;
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
                        style={ !validation() ? {"backgroundColor": "green", "color" : "white"} : {} }
                        disabled={validation()}
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