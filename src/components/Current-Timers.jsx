import React, { useState, useEffect } from "react";
import {
    Box,
    IconButton,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { removeSingleTimer } from "../helpers/common";

const CurrentTimers = ({
    day,
    error,
    timers,
    setTimers,
    hasHoney,
    hasFruitTrees,
}) => {
    const [activeTimers, setActiveTimers] = useState([]);
    const [completedTimers, setCompletedTimers] = useState([]);
    const [hasActiveTimers, setHasActiveTimers] = useState(false);
    const [hasCompletedTimers, setHasCompletedTimers] = useState(false);

    useEffect(() => {
        const updatedActiveTimers = timers.filter(
            (timer) =>
                timer.countdown !== 0 &&
                !(
                    timer.regrow &&
                    timer.countdown === timer.regrowTime &&
                    timer.firstHarvest === false
                ) &&
                !(
                    timer.repeat &&
                    timer.firstHarvest === false &&
                    timer.countdown === timer.repeatLength
                )
        );
        if (
            !hasHoney &&
            updatedActiveTimers.some((timer) => timer.name === "Honey")
        ) {
            updatedActiveTimers.splice(
                updatedActiveTimers.findIndex(
                    (timer) => timer.name === "Honey"
                ),
                1
            );
        }
        const sortedActiveTimers = updatedActiveTimers.sort((a, b) =>
            a.countdown > b.countdown ? 1 : -1
        );
        setActiveTimers(sortedActiveTimers);
        const updatedCompletedTimers = timers.filter(
            (timer) =>
                timer.countdown === 0 ||
                (timer.regrow &&
                    timer.firstHarvest === false &&
                    timer.countdown === timer.regrowTime) ||
                (timer.repeat &&
                    timer.firstHarvest === false &&
                    timer.countdown === timer.repeatLength)
        );
        const sortedCompletedTimers = updatedCompletedTimers.sort((a, b) =>
            a.countdown > b.countdown ? 1 : -1
        );
        setCompletedTimers(sortedCompletedTimers);
        if (updatedActiveTimers.length > 0) {
            setHasActiveTimers(true);
        } else setHasActiveTimers(false);
        if (updatedCompletedTimers.length > 0) {
            setHasCompletedTimers(true);
        } else setHasCompletedTimers(false);
    }, [timers]);

    const renderProductName = (productInTimer) => {
        if (productInTimer.timerType === "harvest") {
            if (productInTimer.name.includes("Seeds")) {
                return productInTimer.product;
            }
            return productInTimer.name;
        }
        if (
            (productInTimer.timerType === "keg" &&
                !["wine", "juice"].includes(productInTimer.timerFor)) ||
            ["Honey", "Fruit Trees"].includes(productInTimer.timerFor)
        ) {
            return productInTimer.timerFor;
        }
        if (
            productInTimer.timerType === "jar" &&
            !["jelly", "pickles"].includes(productInTimer.timerFor)
        ) {
            if (productInTimer.timerFor === "Aged Roe") {
                return productInTimer.timerFor;
            }
            return "Caviar";
        }
        if (productInTimer.timerType === "custom") {
            return productInTimer.name;
        }
        return `${productInTimer.name} ${productInTimer.timerFor}`;
    };

    const createErrorList = (fullError) =>
        fullError.triggers.map((error) => {
            return (
                <ListItem key={`error-for-${error.id}`}>
                    {error.name === "Fruit Trees" ? (
                        <ListItemText primary="Fruit from fruit trees" />
                    ) : (
                        <ListItemText primary={renderProductName(error)} />
                    )}
                </ListItem>
            );
        });

    const renderTimerErrorBlock = (fullError) => (
        <List dense>{createErrorList(fullError)}</List>
    );

    const handlePlurals = (name) => {
        if (name.slice(-1) === "s") {
            return ` are`;
        }
        return ` is`;
    };

    const renderCountdown = (productInTimer) => {
        if (productInTimer.name === "Fruit Trees") {
            if ([3, 0].includes(productInTimer.countdown)) {
                return ` are full (3 fruit each). Pick them today!`;
            }
            if (productInTimer.countdown === 2) {
                return `: 1 fruit each`;
            }
            return `: 2 fruit each`;
        }
        if (
            productInTimer.regrow &&
            productInTimer.firstHarvest === false &&
            productInTimer.countdown === productInTimer.regrowTime
        ) {
            return `${handlePlurals(
                productInTimer.name
            )} ready today. Next harvest in ${productInTimer.countdown} days`;
        }
        if (productInTimer.timerType === "custom") {
            if (
                productInTimer.repeat &&
                productInTimer.countdown === productInTimer.repeatLength
            ) {
                return `: timer completed. Next up in ${productInTimer.countdown} days`;
            }
            return `${
                productInTimer.countdown > 0
                    ? `: ${productInTimer.countdown} ${
                          productInTimer.countdown > 1 ? "days" : "day"
                      } left`
                    : ": timer completed"
            }`;
        }
        return `${
            productInTimer.countdown > 0
                ? `: ${productInTimer.countdown} ${
                      productInTimer.countdown > 1 ? "days" : "day"
                  } left`
                : `${handlePlurals(
                      productInTimer.timerFor !== undefined
                          ? productInTimer.timerFor
                          : productInTimer.name
                  )} ready today`
        }`;
    };

    const renderCompletedTimers = (allTimers, timersToRender) =>
        timersToRender.map((timer) => {
            return (
                <ListItem
                    key={`${timer.id}-${timer.timerFor}-day-${day}-completed`}
                    style={{ textAlign: "center" }}
                    sx={{ py: 0 }}
                >
                    <ListItemText>
                        <Typography>
                            <strong>
                                {renderProductName(timer)}
                                {renderCountdown(timer)} &nbsp;
                            </strong>
                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => {
                                    setTimers(
                                        removeSingleTimer(
                                            allTimers,
                                            timer,
                                            "product"
                                        )
                                    );
                                    if (completedTimers.length === 0) {
                                        setHasCompletedTimers(false);
                                        return;
                                    }
                                    setHasCompletedTimers(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </IconButton>
                        </Typography>
                    </ListItemText>
                </ListItem>
            );
        });

    const renderTimers = (allTimers, timersToRender) =>
        timersToRender.map((timer) => {
            return (
                <ListItem
                    size="small"
                    key={`${timer.id}-${timer.timerFor}-day-${day}`}
                    style={{ textAlign: "center" }}
                    sx={{ py: 0 }}
                >
                    <ListItemText>
                        <Typography>
                            {renderProductName(timer)}
                            {renderCountdown(timer)} &nbsp;
                            <IconButton
                                color="error"
                                size="small"
                                sx={{ pb: 1 }}
                                onClick={() => {
                                    setTimers(
                                        removeSingleTimer(
                                            allTimers,
                                            timer,
                                            "product"
                                        )
                                    );
                                    if (activeTimers.length === 0) {
                                        setHasActiveTimers(false);
                                        return;
                                    }
                                    setHasActiveTimers(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </IconButton>
                        </Typography>
                    </ListItemText>
                </ListItem>
            );
        });

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                {error.exists && (
                    <Alert severity="error">
                        <AlertTitle>
                            <Typography variant="body1">
                                {error.message}
                            </Typography>
                        </AlertTitle>
                        <em>{error.description}</em>
                        <Typography variant="body2">
                            {renderTimerErrorBlock(error)}
                        </Typography>
                    </Alert>
                )}
            </Grid>
            <Grid item>
                <Box sx={{ borderRadius: 1 }}>
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
                                    "& ul": { padding: 0 },
                                }}
                                style={{ backgroundColor: "#EFF7EE" }}
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
                                    width: "100%",
                                    maxWidth: 450,
                                    position: "relative",
                                    overflow: "scroll",
                                    maxHeight: 88,
                                    "& ul": { padding: 0 },
                                }}
                                style={{ backgroundColor: "#DCDCDC" }}
                            >
                                {renderTimers(timers, activeTimers)}
                            </List>
                        )}
                    </Typography>
                </Box>
            </Grid>
            {timers.length === 0 && !hasHoney && !hasFruitTrees ? (
                <Grid item sx={{ padding: 2 }}>
                    <Typography variant="body2">None. Enjoy yer day</Typography>
                </Grid>
            ) : null}
        </Grid>
    );
};

export default CurrentTimers;
