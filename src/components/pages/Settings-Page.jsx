import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const SettingsPage = ({
    mobile,
    setDay,
    setTimers,
    setShowState,
    setJournalText,
    setSkipTreeWarning,
    setShowSettingsPage,
    setShowLogPage,
}) => {
    const [resetOpen, setResetOpen] = useState(false);

    const handleResetOpen = () => {
        setResetOpen(true);
    };

    const handleResetClose = () => {
        setResetOpen(false);
    };

    const resetAll = () => {
        setDay(0);
        setTimers([]);
        setShowState({
            date: true,
            artisanTimers: true,
            currentTimers: true,
            harvestTimers: true,
            fixtureTimers: true,
            journal: true,
            customTimers: false,
        });
        setJournalText(
            "Hi there! Use me to take any notes you'd like. My value will persist between page loads as long as you don't clear your cache."
        );
        setSkipTreeWarning(false);
        setResetOpen(false);
        setShowSettingsPage(false);
        setShowLogPage(true);
    };

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="space-between"
            sx={{ px: 5, py: 5 }}
        >
            <Grid item>
                <Typography
                    variant="body1"
                    sx={{ textDecorationLine: "underline" }}
                >
                    Dev tools
                </Typography>
                <List
                    sx={{
                        fontStyle: "italic",
                        paddingTop: 0,
                        paddingLeft: 0,
                    }}
                >
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2">
                                Reset the app. Use with caution!&nbsp;
                                {!mobile ? (
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleResetOpen()}
                                    >
                                        <FontAwesomeIcon icon={faFire} /> &nbsp;
                                        Reset all
                                    </Button>
                                ) : (
                                    <IconButton
                                        variant="contained"
                                        sx={{ pr: 2 }}
                                        color="error"
                                        onClick={() => handleResetOpen()}
                                    >
                                        <FontAwesomeIcon icon={faFire} />
                                    </IconButton>
                                )}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item>
                <Typography
                    variant="body1"
                    sx={{ textDecorationLine: "underline" }}
                >
                    Planned features
                </Typography>
                <List
                    sx={{
                        fontStyle: "italic",
                        paddingTop: 0,
                        paddingLeft: 0,
                    }}
                >
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2">
                                Light/dark mode
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2">
                                Ability to save and load different accounts
                                and/or farms
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2">
                                Jump to any day of your choosing without having
                                to click through
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2">
                                Budget calculator / planner tool
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Grid>

            <Dialog
                open={resetOpen}
                onClose={handleResetClose}
                aria-labelledby="reset-dialog"
            >
                <DialogTitle id="reset-dialog">
                    Are you sure you wish to reset?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You will lose all of your timers, as well as the
                        contents of your journal, and be sent back to Spring 1
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => handleResetClose()}
                        color="primary"
                    >
                        No
                    </Button>
                    <Button onClick={() => resetAll()} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default SettingsPage;
