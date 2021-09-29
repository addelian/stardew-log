import React, { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Grid, AppBar, Toolbar, Typography, IconButton, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
import TimersPage from "./Timers-Page";
import Counter from "./Counter";
import FooterComponent from "./FooterComponent";
import readDate from "../helpers/Read-Date";

const Home = () => {
    
    // TODO: Decide where I want the journal to live, and move it / update props accordingly
    
    // TODO: "Create Custom Timer" component? Might be nice as a catch-all instead of building out 
    // a bunch of exceptions for things like growing fruit trees for the first time. Just have to
    // pass along all of the required parameters in inputs. Definitely want to hide this when not in use, 
    // will contribute to a ton of clutter down the road if not

    // TODO: update renderTimers to check last letter of product name. If it's an "s", 
    // handle updated from "is" to "are". Can recycle that function in several spots
    
    const [mobile, setMobile] = useState(false);
    const [day, setDay] = useState(0);
    const [timers, setTimers] = useState([]);
    const [error, setError] = useState({exists: false, message: "Oh no!", description: "", triggers: []});
    const [hasHoney, setHasHoney] = useState(false);
    const [hasFruitTrees, setHasFruitTrees] = useState(false);
    const [showTimersPage, setShowTimersPage] = useState(true);
    const [showSettingsPage, setShowSettingsPage] = useState(false);
    const [showAboutPage, setShowAboutPage] = useState(false);
    const [journal, setJournal] = useState(
        "Hi there! Use me to take any notes you'd like. My value will persist between page loads as long as you don't clear your cache."
    );
    const [showState, setShowState] = useState({
        date: true,
        artisanTimers: true,
        harvestTimers: true,
        currentTimers: true
    })

    const { date, artisanTimers, harvestTimers, currentTimers } = showState;

    const currentDate = readDate(day);

    // Loads local storage on componentDidMount
    useEffect(() => {
        setDay(JSON.parse(window.localStorage.getItem("day")));
        setTimers(JSON.parse(window.localStorage.getItem("timers")));
        setHasHoney(JSON.parse(window.localStorage.getItem("hasHoney")));
        setHasFruitTrees(JSON.parse(window.localStorage.getItem("hasFruitTrees")));
        setShowState(JSON.parse(window.localStorage.getItem("showState")));
        setJournal(JSON.parse(window.localStorage.getItem("journal")));
    }, []);

    // Basic save functionality
    useEffect(() => {
        window.localStorage.setItem('day', day);
    }, [day]);
    useEffect(() => {
        window.localStorage.setItem('timers', JSON.stringify(timers));
    }, [timers]);
    useEffect(() => {
        window.localStorage.setItem('hasHoney', hasHoney);
    }, [hasHoney]);
    useEffect(() => {
        window.localStorage.setItem('hasFruitTrees', hasFruitTrees);
    }, [hasFruitTrees]);
    useEffect(() => {
        window.localStorage.setItem('showState', JSON.stringify(showState));
    }, [showState]);
    useEffect(() => {
        window.localStorage.setItem('journal', JSON.stringify(journal));
    }, [journal]);

    const [menuOpen, setMenuOpen] = useState(null);
    const open = Boolean(menuOpen);
    const handleClick = (event) => {
        setMenuOpen(event.currentTarget);
    };

    const handleCheck = e => {
        setShowState({
            ...showState,
            [e.target.name]: e.target.checked
        });
    };

    const handleClose = () => {
        setMenuOpen(null);
    };

    return (
        <Grid container spacing={4} direction="column" justifyContent="space-between" alignItems="space-between">
            <Grid item>
                <AppBar position="static">
                    <Toolbar>
                        <Button
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={mobile ? {flexGrow: 1, justifyContent: "start", color: "white"} : { mr: 2, color: "white" }}
                            >
                            <FontAwesomeIcon icon={faBars} />
                        </IconButton>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={menuOpen}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => {
                                setShowSettingsPage(false);
                                setShowAboutPage(false);
                                setShowTimersPage(true);
                                handleClose();
                            }}>
                                {showTimersPage && <><FontAwesomeIcon icon={faCheck} />&nbsp;</>}Timers
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setShowTimersPage(false);
                                setShowAboutPage(false);
                                setShowSettingsPage(true);
                                handleClose();
                            }}>
                                {showSettingsPage && <><FontAwesomeIcon icon={faCheck} />&nbsp;</>}Settings
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setShowTimersPage(false);
                                setShowSettingsPage(false);
                                setShowAboutPage(true);
                                handleClose();
                            }}>
                                {showAboutPage && <><FontAwesomeIcon icon={faCheck} />&nbsp;</>}About
                            </MenuItem>                       
                        </Menu>
                        {!mobile && <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                            Stardew Log
                        </Typography>}
                        <Counter 
                            day={day}
                            mobile={mobile}
                            setMobile={setMobile}
                            setDay={setDay}
                            timers={timers}
                            setTimers={setTimers}
                            setError={setError}
                            hasHoney={hasHoney}
                            setHasHoney={setHasHoney}
                            hasFruitTrees={hasFruitTrees}
                            setHasFruitTrees={setHasFruitTrees}
                            setShowState={setShowState}
                            setJournal={setJournal}
                            />
                    </Toolbar>
                </AppBar>
            </Grid>
            {showTimersPage && (
                <TimersPage 
                    date={date}
                    currentTimers={currentTimers}
                    harvestTimers={harvestTimers}
                    artisanTimers={artisanTimers}
                    currentDate={currentDate}
                    mobile={mobile}
                    handleCheck={handleCheck}
                    day={day}
                    error={error}
                    setError={setError}
                    timers={timers}
                    setTimers={setTimers}
                    hasHoney={hasHoney}
                    setHasHoney={setHasHoney}
                    hasFruitTrees={hasFruitTrees}
                    setHasFruitTrees={setHasFruitTrees}
                    journal={journal}
                    setJournal={setJournal}
                />
            )}
            {showSettingsPage && (
                <Grid container justifyContent="space-around">
                    <Grid item>
                        <Typography>This will be the settings page</Typography>
                    </Grid>
                </Grid>
            )}
            {showAboutPage && (
                <Grid container justifyContent="space-around">
                    <Grid item>
                        <Typography>This will be the about page</Typography>
                    </Grid>
                </Grid>
            )}
            <Grid item>
                <Grid container justifyContent="space-around">
                    <Grid item xs={11}>
                        <FooterComponent />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;