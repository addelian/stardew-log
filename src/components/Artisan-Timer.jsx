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
    DialogActions 
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle, faFan, faUtensilSpoon, faTimes, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";

const ArtisanTimer = ({timers, setTimers, day, hasHoney, setHasHoney, hasFruitTrees, setHasFruitTrees, skipTreeWarning, setSkipTreeWarning}) => {

    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = e => {
        if (e.target.value !== '') {
            const selectedOption = CROPS.find(crop => crop.id === e.target.value);
            setSelected(selectedOption);
        }
    }

    const handleClickOpen = () => {
        if (!hasFruitTrees && !skipTreeWarning) {
            setOpen(true);
            return;
        }
        handleFruitTrees();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCheck = e => {
        setSkipTreeWarning(e.target.checked);
    };

    const removeSingleTimer = (allTimers, toBeDeleted) => {
        const updatedTimers = allTimers.filter(timer => timer.id !== toBeDeleted.id);
        if (toBeDeleted.name === "Fruit Trees") { setHasFruitTrees(false) }
        if (toBeDeleted.name === "Honey") { setHasHoney(false) }
        return updatedTimers;
    }

    const handleFruitTrees = () => {
        if (open) {
            handleClose();
        }
        if (!hasFruitTrees) {
            const product = CROPS.find(crop => crop.name === "Fruit Trees");
            setHasFruitTrees(true);
            setTimers([ ...timers, { 
                ...product, 
                countdown: 2, 
                firstHarvest: true,
                timerType: "harvest",
                timerFor: "Fruit Trees" 
            }]);
            return;
        }
        setHasFruitTrees(false);
        const productTimer = timers.find(timer => timer.name === "Fruit Trees");
        setTimers(removeSingleTimer(timers, productTimer));
        return productTimer;
    }

    const handleHoney = (() => {
        if (!hasHoney) {
            const product = CROPS.find(crop => crop.name === "Honey");
            setHasHoney(true);
            setTimers([ ...timers, { 
                ...product, 
                countdown: product.growTime, 
                timerFor: "Honey", 
                timerType: "harvest", 
                firstHarvest: true 
            }]);
            return;
        }
        setHasHoney(false);
        const productTimer = timers.find(timer => timer.name === "Honey");
        setTimers(removeSingleTimer(timers, productTimer));
        return productTimer;
    })

    const createKegTimer = selectedOption => {
        setTimers([ ...timers, {
            ...selectedOption, 
            id: `${selectedOption.name}-${selectedOption.kegProduct}`,
            countdown: selectedOption.kegDuration, 
            timerFor: selectedOption.kegProduct, 
            timerType: "keg" 
        }]);
        setSelected('')
    }

    const createJarTimer = selectedOption => {
        setTimers([ ...timers, {
            ...selectedOption, 
            id: `${selectedOption.name}-${selectedOption.jarProduct}`,
            countdown: selectedOption.name === "Caviar" ? 3 : 4, 
            timerFor: selectedOption.jarProduct, 
            timerType: "jar" 
        }]);
        setSelected('');
    }

    const clearTimer = selectedOption => {
        if (selectedOption !== '') {
            setSelected('')
        }
    }

    const buttonStyling = (selectedOption, parentButton) => {
        if (timers.some(timer => timer.name === selected.name)) return {};
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

        const cropsToSort = crops.filter(crop => (crop.kegProduct !== undefined || crop.jarProduct !== undefined));

        // ES6 alphabetical order
        const cropsEligibleForArtisanProducts = cropsToSort.sort((a, b) => a.name.localeCompare(b.name));
        
        return cropsEligibleForArtisanProducts.map(crop => 
            <MenuItem key={`${crop.id}-artisan-option`} value={crop.id}>{crop.name}</MenuItem>
        );
    }

    return(
        <>
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
                    disabled={
                        selected === '' 
                        || ["Ginger", "Roe", "Sturgeon Roe"].includes(selected.name)
                        || timers.some(timer => selected.name === timer.name && timer.timerType === "keg")
                        }
                    onClick={() => createKegTimer(selected)}
                >
                    <FontAwesomeIcon icon={faWineBottle} />&nbsp;Keg it
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    style={buttonStyling(selected, "jar")}
                    disabled={
                        selected === '' 
                        || ["Coffee Bean", "Honey"].includes(selected.name)
                        || timers.some(timer => selected.name === timer.name && timer.timerType === "jar")
                        }
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
        </Grid>
        <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{pt: 1}}>
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
                    aria-labelledby="tree-timer-dialog"
                >
                    <DialogTitle id="tree-timer-dialog">
                        Heads up!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This timer assumes that you already have fully matured fruit trees 
                            and just need to keep track of their fruit growth. If you need to track
                            a fruit tree sapling, please build a custom timer that lasts 28 days. Do you wish to proceed?
                        </DialogContentText>
                        <FormControl component="fieldset">
                            <FormGroup aria-label="Don't show this reminder again" row>
                                <FormControlLabel
                                    control={
                                        <Checkbox size="small" checked={skipTreeWarning} onChange={handleCheck} name="skipTreeWarning" />
                                    }
                                    label="Don't show this dialog again"
                                />
                            </FormGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => handleClose()} color="primary">
                            No
                        </Button>
                        <Button onClick={() => handleFruitTrees()} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
        </>
    )
}

export default ArtisanTimer;