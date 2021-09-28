import React, { useState } from "react";
import { Grid, Button, Select, FormControl, InputLabel, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle, faFan, faUtensilSpoon, faTimes, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";

const ArtisanTimer = ({timers, setTimers, day, error, hasHoney, setHasHoney, hasFruitTrees, setHasFruitTrees}) => {

    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = e => {
        if (e.target.value !== '') {
            const selectedOption = CROPS.find(crop => crop.id === e.target.value);
            setSelected(selectedOption);
        }
    }

    const handleClickOpen = () => {
        if (!hasFruitTrees) {
            setOpen(true);
            return;
        }
        setHasFruitTrees(false);
        const productTimer = timers.findIndex(timer => timer.name === "Fruit Trees");
        const reducedTimers = timers.splice(productTimer, 1);
        setTimers(timers);
        return reducedTimers;
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleFruitTrees = sapling => {
        if (!hasFruitTrees) {
            const product = CROPS.find(crop => crop.name === "Fruit Trees");
            setHasFruitTrees(true);
            setTimers([ ...timers, { 
                ...product, 
                countdown: sapling ? product.growTime : 2, 
                firstHarvest: true, 
                initialCycle: sapling,
                timerFor: "Fruit Trees" 
            }]);
            handleClose();
            return;
        }
    }

    const handleHoney = (() => {
        if (!hasHoney) {
            const product = CROPS.find(crop => crop.name === "Honey");
            setHasHoney(true);
            setTimers([ ...timers, { ...product, countdown: product.growTime, timerFor: "Honey", firstHarvest: true }]);
            return;
        }
        setHasHoney(false);
        const productTimer = timers.findIndex(timer => timer.name === "Honey");
        const reducedTimers = timers.splice(productTimer, 1);
        setTimers(timers);
        return reducedTimers;
    })

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
                <FormControl sx={{minWidth: 95}}>
                    <InputLabel id="starter-select-label">Starter</InputLabel>
                    <Select
                        labelId="starter-select-label"
                        id="starter-select"
                        label="Starter"
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
                    <FontAwesomeIcon icon={faUtensilSpoon} />&nbsp;Jar it
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
            <Grid item>
                <Button 
                    color={hasHoney ? "warning" : "primary" }
                    variant="contained"
                    disabled={day > 83} 
                    onClick={() => handleHoney()}
                >   
                    <FontAwesomeIcon icon={hasHoney ? faTimes : faFan} /> &nbsp;
                    {hasHoney ? "Remove bee house timer" : "Add bee house timer"}
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    color={hasFruitTrees ? "warning" : "primary"}
                    variant="contained"
                    disabled={day > 83} 
                    onClick={() => handleClickOpen()}
                >
                    <FontAwesomeIcon icon={hasFruitTrees ? faTimes : faLeaf} /> &nbsp;
                    {hasFruitTrees ? "Remove fruit tree timer" : "Add fruit tree timer"}
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="dialog-title"
                >
                    <DialogTitle id="dialog-title">
                        Are you planting a fruit tree?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you plant your fruit trees today, or are you restarting your timer on Spring 1?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleFruitTrees(true)} color="primary">
                            Planting them
                        </Button>
                        <Button onClick={() => handleFruitTrees(false)}>
                            Restarting on Spring 1
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    )
}

export default ArtisanTimer;