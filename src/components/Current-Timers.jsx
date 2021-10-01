import React, { useState, useEffect } from "react";
import { Box, IconButton, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Alert, AlertTitle } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CurrentTimers = ({ error, timers, setTimers, hasHoney, setHasHoney, hasFruitTrees, setHasFruitTrees }) => {

    const [activeTimers, setActiveTimers] = useState([]);
    const [completedTimers, setCompletedTimers] = useState([]);
    const [hasActiveTimers, setHasActiveTimers] = useState(false);
    const [hasCompletedTimers, setHasCompletedTimers] = useState(false);

    useEffect(() => {
        const updatedActiveTimers = timers.filter(timer => ((timer.countdown !== 0 
            && !(timer.regrow 
            && timer.countdown === timer.regrowTime 
            && timer.firstHarvest === false))))
        setActiveTimers(updatedActiveTimers);
        const updatedCompletedTimers = timers.filter(timer => timer.countdown === 0 
            || (timer.regrow 
            && timer.firstHarvest === false 
            && timer.countdown === timer.regrowTime))
        setCompletedTimers(updatedCompletedTimers);
        if (updatedActiveTimers.length > 0) {
            setHasActiveTimers(true);
        } else setHasActiveTimers(false);
        if (updatedCompletedTimers.length > 0) {
            setHasCompletedTimers(true);
        } else setHasCompletedTimers(false); 
    }, [timers]);

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

    const removeSingleTimer = (allTimers, toBeDeleted) => {
        const updatedTimers = allTimers.filter(timer => timer.id !== toBeDeleted.id);
        if (toBeDeleted.name === "Fruit Trees") { setHasFruitTrees(false) }
        if (toBeDeleted.name === "Honey") { setHasHoney(false) }
        return updatedTimers;
    }

    const renderCompletedTimers = (allTimers, timersToRender) => timersToRender.map((timer) => {

        return (
            <ListItem key={`${timer.id}-${timer.timerFor}`} style={{textAlign: "center"}} sx={{py: 0}}>
                <ListItemText>
                    <Typography>
                        <strong>
                            {renderProductName(timer)}{renderCountdown(timer)} &nbsp;
                        </strong>
                        <IconButton color="error" size="small" onClick={() => {
                            setTimers(removeSingleTimer(allTimers, timer));
                            if (completedTimers.length === 0) {
                                setHasCompletedTimers(false);
                                return;
                            }
                            setHasCompletedTimers(true);
                        }}>
                            <FontAwesomeIcon icon={faTimes} />
                        </IconButton>
                    </Typography>
                </ListItemText>
            </ListItem>
    )});

    const renderTimers = (allTimers, timersToRender) => timersToRender.map((timer) => {
        
        return (
            <ListItem size="small" key={`${timer.id}-${timer.timerFor}`} style={{textAlign: "center"}} sx={{py: 0}}>
                <ListItemText>
                    <Typography >
                        {renderProductName(timer)}{renderCountdown(timer)} &nbsp;
                        <IconButton color="error" size="small" sx={{pb: 1}} onClick={() => {
                            setTimers(removeSingleTimer(allTimers, timer));
                            if (activeTimers.length === 0) {
                                setHasActiveTimers(false);
                                return;
                            }
                            setHasActiveTimers(true);
                        }}>
                            <FontAwesomeIcon icon={faTimes} />
                        </IconButton>
                    </Typography>
                </ListItemText>
            </ListItem>
    )});

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
                    {hasCompletedTimers && (
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

                            {renderCompletedTimers(timers, completedTimers)}
                        </List>
                    )}
                    {hasActiveTimers && (
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
                            {renderTimers(timers, activeTimers)}
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