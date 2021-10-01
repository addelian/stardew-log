import React, { useState } from "react";
import { Grid, Button, Input } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faTimes } from "@fortawesome/free-solid-svg-icons";

const CustomTimer = ({ timers, setTimers }) => {
    
    const [timerName, setTimerName] = useState('');
    const [timerLength, setTimerLength] = useState('');

    const handleNameChange = e => {
        setTimerName(e.target.value);
    }

    const handleTimeChange = e => {
        setTimerLength(e.target.value);
    }

    const regex = /^\d+$/

    const clearTimer = () => {
        setTimerName('');
        setTimerLength('');
    }

    const createCustomTimer = () => {
        setTimers([ ...timers, { name: timerName, countdown: timerLength, timerType: "custom" }]);
        setTimerName('');
        setTimerLength('')
        return;
    }
    
    return(
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item>
                <Input placeholder="Timer Name" onChange={handleNameChange} />
            </Grid>
            <Grid item>
                <Input 
                    error={timerLength !== '' && !regex.test(timerLength)} 
                    type="number" 
                    placeholder="Length (days)" 
                    onChange={handleTimeChange} 
                    helperText="Numbers only!"
                />
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    style={timerName !== '' && timerLength !== null && regex.test(timerLength) ? {"backgroundColor": "green", "color" : "white"} : {}}
                    disabled={timerName === '' || timerLength === null || !regex.test(timerLength)}
                    onClick={() => createCustomTimer()}
                    >
                    <FontAwesomeIcon icon={faCarrot} />&nbsp;{(![null, '', undefined].includes(timerLength)) && !regex.test(timerLength) ? "Positive integers only!" : "Create it" }
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
    )
}

export default CustomTimer;