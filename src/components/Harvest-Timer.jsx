import React, { useState } from "react";
import { Grid, Button, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { lowerCase } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";
import readDate from "../helpers/Read-Date";

const HarvestTimer = ({ day, timers, setTimers }) => {
    
    const [selected, setSelected] = useState('');
    
    const renderOptions = crops => {
        
        const currentSeason = (lowerCase(readDate(day).split(" ")[0]));
        const cropsInSeason = crops.filter(crop => crop.season.includes(currentSeason));
        const cropsToSort = cropsInSeason.filter(crop => crop.growTime !== undefined 
            && !(crop.name.includes("Honey") || crop.name.includes("Fruit Trees"))
            && !(timers.some(timer => timer.name === crop.name)));

        // ES6 alphabetical order
        const cropsEligibleForHarvestTimer = cropsToSort.sort((a, b) => a.name.localeCompare(b.name));
        
        return cropsEligibleForHarvestTimer.map(crop => 
            <MenuItem key={`${crop.id}-harvest-option`} value={crop.id}>{crop.name}</MenuItem>
        )
    }

    const handleChange = e => {
        if (e.target.value !== '') {
            const selectedOption = CROPS.find(crop => crop.id === e.target.value);
            setSelected(selectedOption);
        }
    }

    const clearTimer = selectedOption => {
        if (selectedOption !== '') {
            setSelected('');
        }
    }

    const createHarvestTimer = selectedOption => {
        if (selectedOption.regrow) {
            setTimers([ ...timers, {...selectedOption, countdown: selectedOption.growTime, timerType: "harvest", firstHarvest: true }]);
            setSelected('');
            return;
        }
        setTimers([ ...timers, {...selectedOption, countdown: selectedOption.growTime, timerType: "harvest" }]);
        setSelected('');
        return;
    }
    
    return(
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item>
                <FormControl sx={{minWidth: 80}}>
                    <InputLabel id="crop-select-label">Crop</InputLabel>
                    <Select 
                        labelId="crop-select-label"
                        id="crop-select"
                        label="Crop"
                        value={selected !== '' ? selected.id : ''}
                        onChange={handleChange}
                        >
                        {renderOptions(CROPS)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    style={selected !== '' ? {"backgroundColor": "green", "color" : "white"} : {}}
                    disabled={selected === ''}
                    onClick={() => createHarvestTimer(selected)}
                    >
                    <FontAwesomeIcon icon={faCarrot} />&nbsp;Plant it
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    color="warning"
                    disabled={selected === ''}
                    onClick={() => clearTimer(selected)}
                    >
                    <FontAwesomeIcon icon={faTimes} />&nbsp;Clear it
                </Button>
            </Grid>
        </Grid>
    )
}

export default HarvestTimer;