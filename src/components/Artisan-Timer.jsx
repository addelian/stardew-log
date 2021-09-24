import React, { useState } from "react";
import { Grid, Button, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle, faAppleAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";

const ArtisanTimer = ({timers, setTimers, day, error, hasHoney, setHasHoney, hasFruitTrees, setHasFruitTrees}) => {

    const [selected, setSelected] = useState('');

    const handleChange = e => {
        if (e.target.value !== '') {
            const selectedOption = CROPS.find(crop => crop.id === e.target.value);
            setSelected(selectedOption);
        }
    }

    const handleBeesAndTrees = (hasProduct, setHasProduct, selectedProduct, productCountdown, productTimerFor) => {
        if (!hasProduct) {
            const product = CROPS.find(crop => crop.name === selectedProduct);
            setHasProduct(true);
            setTimers([ ...timers, { ...product, countdown: productCountdown, timerFor: productTimerFor }]);
            return;
        }
        setHasProduct(false);
        const productTimer = timers.findIndex(timer => timer.name === selectedProduct);
        const reducedTimers = timers.splice(productTimer, 1);
        setTimers(timers);
        return reducedTimers;
    }

    const createKegTimer = selectedOption => {
        setTimers([ ...timers, {...selectedOption, countdown: selectedOption.kegDuration, timerFor: selectedOption.kegProduct, timerType: "keg"} ])
        setSelected('')
    }

    const createJarTimer = selectedOption => {
        setTimers([ ...timers, {...selectedOption, countdown: selectedOption.name === "Caviar" ? 3 : 4, timerFor: selectedOption.jarProduct, timerType: "jar"} ])
        setSelected('');
    }

    const clearTimer = selectedOption => {
        if (selectedOption !== '') {
            setSelected('')
        }
    }

    const buttonStyling = (selectedOption, parentButton) => {
        if (selectedOption !== '' && selectedOption.preferred !== undefined) {
            if (parentButton === "keg" && selectedOption.preferred === "keg") {
                return {"backgroundColor": "green", "color" : "white"};
            }
            if (parentButton === "jar" && selectedOption.preferred === "jar") {
                return {"backgroundColor": "green", "color" : "white"};
            }
            return {"backgroundColor": "red", "color" : "white"};
        }
        return {};
    }

    const renderOptions = crops => {

        const cropsToSort = crops.filter(crop => crop.kegProduct !== undefined || crop.jarProduct !== undefined);

        // ES6 alphabetical order
        const cropsEligibleForArtisanProducts = cropsToSort.sort((a, b) => a.name.localeCompare(b.name));
        
        return cropsEligibleForArtisanProducts.map(crop => 
            <MenuItem key={`${crop.id}-artisan-option`} value={crop.id}>{crop.name}</MenuItem>
        );
    }

    return(
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item>
                <FormControl>
                    <InputLabel>Starter</InputLabel>
                    <Select 
                        style={{minWidth: 80, }}
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
                    style={buttonStyling(selected, "keg")}
                    disabled={selected === '' || ["Ginger", "Roe", "Sturgeon Roe"].includes(selected.name)}
                    onClick={() => createKegTimer(selected)}
                    >
                    <FontAwesomeIcon icon={faWineBottle} />&nbsp;Keg it
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    style={buttonStyling(selected, "jar")}
                    disabled={selected === '' || ["Coffee Bean", "Honey"].includes(selected.name)}
                    onClick={() => createJarTimer(selected)}
                    >
                    <FontAwesomeIcon icon={faAppleAlt} />&nbsp;Jar it
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    style={selected !== '' ? {color: "red"} : {}}
                    disabled={selected === ''}
                    onClick={() => clearTimer(selected)}
                    >
                    <FontAwesomeIcon icon={faTimes} />&nbsp;Clear it
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    disabled={day > 83} 
                    onClick={() => handleBeesAndTrees(hasHoney, setHasHoney, "Honey", 4, "Honey" )}>
                    {hasHoney ? "Remove honey timer" : "Add honey timer"}
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    disabled={day > 83} 
                    onClick={() => handleBeesAndTrees(hasFruitTrees, setHasFruitTrees, "Fruit Trees", 3, "Fruit Trees" )}>
                    {hasFruitTrees ? "Remove fruit tree timer" : "Add fruit tree timer"}
                </Button>
            </Grid>
        </Grid>
    )
}

export default ArtisanTimer;