import * as React from "react";
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
import { removeSingleTimer } from "../../helpers/common";
import { ErrorType, TimerType } from "../../helpers/types";

type CurrentTimersProps = {
    day: number,
    error: ErrorType,
    timers: TimerType[],
    setTimers: (timers: TimerType[]) => void
}

const CurrentTimers: React.FC<CurrentTimersProps> = ({
    day,
    error,
    timers,
    setTimers
}) => {
    const [activeTimers, setActiveTimers] = React.useState<TimerType[] | []>([]);
    const [completedTimers, setCompletedTimers] = React.useState<TimerType[] | []>([]);
    const [hasActiveTimers, setHasActiveTimers] = React.useState(false);
    const [hasCompletedTimers, setHasCompletedTimers] = React.useState(false);

    React.useEffect(() => {
        const updatedActiveTimers = timers.filter(
            (timer) =>
                timer.countdown !== 0 &&
                !(
                    timer.repeats &&
                    (timer.countdown === timer.repeatLength &&
                        timer.firstTime === false)
                ));
        const sortedActiveTimers = updatedActiveTimers.sort((a, b) =>
            a.countdown > b.countdown ? 1 : -1
        );
        setActiveTimers(sortedActiveTimers);
        const updatedCompletedTimers = timers.filter(
            (timer) =>
                timer.countdown === 0 ||
                (timer.repeats &&
                    timer.firstTime === false &&
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

    const renderProductName = (productInTimer: TimerType) => {
        if (productInTimer.timerType === "harvest") {
            if (productInTimer.name.includes("Seeds")) {
                return productInTimer.product;
            }
            return productInTimer.name;
        }
        if (
            (productInTimer.timerType === "keg" && typeof productInTimer.timerFor !== "undefined" &&
                !["wine", "juice"].includes(productInTimer.timerFor))
        ) {
            return productInTimer.timerFor;
        }
        if (
            productInTimer.timerType === "jar" && typeof productInTimer.timerFor !== "undefined" &&
            !["jelly", "pickles"].includes(productInTimer.timerFor)
        ) {
            if (productInTimer.timerFor === "Aged Roe") {
                return productInTimer.timerFor;
            }
            return "Caviar";
        }
        if (productInTimer.timerType === "fixture") {
            return productInTimer.product;
        }
        if (productInTimer.timerType === "custom") {
            return productInTimer.name;
        }
        return `${productInTimer.name} ${productInTimer.timerFor}`;
    };

    const createErrorList = (fullError: ErrorType) =>
        fullError.triggers.map((error) => {
            return (
                <ListItem key={`error-for-${error.id}`}>
                    <ListItemText primary={renderProductName(error)} />
                </ListItem>
            );
        });

    const renderTimerErrorBlock = (fullError: ErrorType) => (
        <List dense>{createErrorList(fullError)}</List>
    );

    const handlePlurals = (name: string) => {
        if (name.slice(-1) === "s" && name !== "Bee Houses") {
            return ` are`;
        }
        return ` is`;
    };

    const renderCountdown = (productInTimer: TimerType) => {
        if (productInTimer.name === "Fruit Trees") {
            if (productInTimer.firstTime) {
                return productInTimer.countdown === 2 ? ": 1 fruit each" : ": 2 fruit each";
            }
            if ([3, 0].includes(productInTimer.countdown)) {
                return ` are full (3 fruit each). Pick them today!`;
            }
            if (productInTimer.countdown === 2) {
                return `: 1 fruit each`;
            }
            return `: 2 fruit each`;
        }
        if (
            productInTimer.repeats &&
            productInTimer.firstTime === false &&
            productInTimer.countdown === productInTimer.repeatLength
        ) {
            return `${handlePlurals(
                productInTimer.name
            )} ready today. Next harvest in ${productInTimer.countdown} days`;
        }
        if (productInTimer.timerType === "custom") {
            if (
                productInTimer.repeats &&
                productInTimer.countdown === productInTimer.repeatLength
            ) {
                return `: timer completed. Next up in ${productInTimer.countdown} days`;
            }
            return `${productInTimer.countdown > 0
                ? `: ${productInTimer.countdown} ${productInTimer.countdown > 1 ? "days" : "day"
                } left`
                : ": timer completed"
                }`;
        }
        return `${productInTimer.countdown > 0
            ? `: ${productInTimer.countdown} ${productInTimer.countdown > 1 ? "days" : "day"
            } left`
            : `${handlePlurals(
                productInTimer.timerFor !== undefined
                    ? productInTimer.timerFor
                    : productInTimer.product !== undefined
                        ? productInTimer.product
                        : productInTimer.name
            )} ready today`
            }`;
    };

    const renderCompletedTimers = (allTimers: TimerType[], timersToRender: TimerType[]) =>
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
                                            timer
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

    const renderTimers = (allTimers: TimerType[], timersToRender: TimerType[]) =>
        timersToRender.map((timer) => {
            return (
                <ListItem
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
                                            timer
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
            {timers.length === 0
                ? (
                    <Grid item sx={{ padding: 2 }}>
                        <Typography variant="body2">None. Enjoy yer day</Typography>
                    </Grid>
                ) : null}
        </Grid>
    );
};

export default CurrentTimers;
