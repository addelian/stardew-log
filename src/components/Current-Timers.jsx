import React from "react";
import { Box, IconButton, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Alert, AlertTitle } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CurrentTimers = ({ day, error, timers, setTimers, hasHoney, setHasHoney, hasFruitTrees, setHasFruitTrees }) => {

    const renderProductName = productInTimer => {

        if (productInTimer.timerType === "harvest") {
            if (productInTimer.name.includes("Seeds")) {
                return productInTimer.product;
            }
            return productInTimer.name;
        }
        if ((productInTimer.timerType === "keg" && !["wine", "juice"].includes(productInTimer.timerFor))
            || ["Honey", "Fruit Trees"].includes(productInTimer.timerFor)
        ) {
            return productInTimer.timerFor;
        }
        if (productInTimer.timerType === "jar" && !["jelly", "pickles"].includes(productInTimer.timerFor)) {
            if (productInTimer.timerFor === "Aged Roe") {
                return productInTimer.timerFor;
            }
            return "Caviar";
        }
        if (productInTimer.timerType === "custom") {
            return productInTimer.name;
        }
        return `${productInTimer.name} ${productInTimer.timerFor}`;
    }

    const createErrorList = fullError => fullError.triggers.map(error => {
        return (
            <ListItem key={`error-for-${error.id}`}>
                {error.name === "Fruit Trees" ?
                    <ListItemText primary="Fruit from fruit trees" /> :
                    <ListItemText primary={renderProductName(error)} />
                }
            </ListItem>
        );
    });

    const renderTimerErrorBlock = fullError => 
            <List dense>
                {createErrorList(fullError)}
            </List>
    
    const renderCountdown = productInTimer => {
        if (productInTimer.name === "Fruit Trees") {
            if ([3, 0].includes(productInTimer.countdown)) {
                return ` are full (3 fruit each). Pick them today!`;
            }
            if (productInTimer.countdown === 2) {
                return `: 1 fruit each`;
            }
            return `: 2 fruit each`;
        }
        if (productInTimer.regrow && productInTimer.firstHarvest === false && productInTimer.countdown === productInTimer.regrowTime) {
            return `${productInTimer.name === "Hops" ? ` are` : ` is`} ready today. Next harvest in ${productInTimer.countdown} days`;
        }
        if (productInTimer.timerType === "custom") {
            return `${productInTimer.countdown > 0 ? 
                `: ${productInTimer.countdown} ${productInTimer.countdown > 1 ? 
                "days" : "day"} left`: ": timer completed"}`;
        }
        return `${productInTimer.countdown > 0 ? 
            `: ${productInTimer.countdown} ${productInTimer.countdown > 1 ? 
            "days" : "day"} left`: `${(productInTimer.timerFor === "pickles" 
            || productInTimer.name.includes("Seeds" || "Trees")) ? 
            ` are` : ` is`} ready today`}`;
    }
    
    const renderCompletedTimers = completedTimers => completedTimers.map((timer, index) => {
        return (
            <ListItem key={timer.id} style={{textAlign: "center"}} sx={{py: 0}}>
                <ListItemText>
                    <Typography>
                        <strong>
                            {renderProductName(timer)}{renderCountdown(timer)} &nbsp;
                        </strong>
                        <IconButton color="error" size="small" onClick={() => {
                            const deleteIndex = activeTimers.findIndex(toBeDeleted => timer.name === toBeDeleted.name && timer.timerType === toBeDeleted.timerType);
                            activeTimers.splice(deleteIndex, 1);
                            if (timer.name === "Fruit Trees") { setHasFruitTrees(false) }
                            if (timer.name === "Honey") { setHasHoney(false) }
                            setTimers(activeTimers);
                        }}>
                            <FontAwesomeIcon icon={faTimes} />
                        </IconButton>
                    </Typography>
                </ListItemText>
            </ListItem>
    )});

    const renderTimers = activeTimers => activeTimers.map((timer, index) => {
        return (
            <ListItem size="small" key={timer.id} style={{textAlign: "center"}} sx={{py: 0}}>
                <ListItemText>
                    <Typography >
                        {renderProductName(timer)}{renderCountdown(timer)} &nbsp;
                        <IconButton color="error" size="small" sx={{pb: 1}} onClick={() => {
                            const deleteIndex = activeTimers.findIndex(toBeDeleted => timer.name === toBeDeleted.name && timer.timerType === toBeDeleted.timerType);
                            activeTimers.splice(deleteIndex, 1);
                            if (timer.name === "Fruit Trees") { setHasFruitTrees(false) }
                            if (timer.name === "Honey") { setHasHoney(false) }
                            setTimers(activeTimers);
                        }}>
                            <FontAwesomeIcon icon={faTimes} />
                        </IconButton>
                    </Typography>
                </ListItemText>
            </ListItem>
    )});

    const hasCompletedTimers = activeTimers => {
        if (activeTimers.filter(timer => timer.countdown === 0 
            || (timer.regrow 
            && timer.firstHarvest === false 
            && timer.countdown === timer.regrowTime)).length > 0) { return true };
        return false;
    }
    
    const hasTimers = activeTimers => {
        if (activeTimers.filter(timer => ((timer.countdown !== 0 
            && !(timer.regrow 
                && timer.countdown === timer.regrowTime 
                && timer.firstHarvest === false))
                )).length > 0) { return true };
                return false;
    }

    return (
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item>
            {error.exists && (
                <Alert severity="error">
                    <AlertTitle><Typography variant="body1">{error.message}</Typography></AlertTitle>
                    <em>{error.description}</em>
                    <Typography variant="body2">
                        {renderTimerErrorBlock(error)}
                    </Typography>
                </Alert>
                )}
            </Grid>
            <Grid item >
                <Box sx={{borderRadius: 1}}>

                
                <Typography variant="body1">
                    {hasCompletedTimers(timers) && (
                        <List
                            dense
                            sx={{
                                borderRadius: 2,
                                px: "auto",
                                mb: 1,
                                width: "100%",
                                maxWidth: 450,
                                position: "relative",
                                overflow: "scroll",
                                maxHeight: 82,
                                "& ul": { padding: 0 }
                            }}
                            style={{backgroundColor: "#EFF7EE"}}
                        >

                            {renderCompletedTimers(timers.filter(timer => timer.countdown === 0 
                                || (timer.regrow 
                                && timer.firstHarvest === false 
                                && timer.countdown === timer.regrowTime
                            )))}
                        </List>
                    )}
                    {hasTimers(timers) && (
                        <List 
                            dense 
                            sx={{
                                borderRadius: 2,
                                px: "auto",
                                width: '100%',
                                maxWidth: 450,
                                position: 'relative',
                                overflow: 'scroll',
                                maxHeight: 88,
                                '& ul': { padding: 0 }
                            }}
                            style={{backgroundColor: "#DCDCDC"}}
                        >
                                {renderTimers(timers.filter(timer => ((timer.countdown !== 0 
                                    && !(timer.regrow 
                                    && timer.countdown === timer.regrowTime 
                                    && timer.firstHarvest === false))
                                )))}
                        </List>
                    )}
                </Typography>
                </Box>
            </Grid>
            {timers.length === 0 && (!hasHoney && !hasFruitTrees) ?
                <Grid item sx={{padding: 2}}>
                    <Typography variant="body2">
                        None. Enjoy yer day
                    </Typography>
                </Grid>
                : null
            }
        </Grid>
    )
}

export default CurrentTimers;