import React, { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Grid, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import LogPage from "./Log-Page";
import Counter from "./Counter";
import FooterComponent from "./FooterComponent";
import readDate from "../helpers/Read-Date";

const Home = () => {
   
    // TODO: handling custom timer:
    // - move error handling into its own function, it's getting really messy
    // - add more error handling for maxAmount of 112 (or so, w/e)
    // - decide where it should live
    // - General cleanup, it's all higgledy piggledy
    
    // TODO: Move reset button to settings page
    
    // TODO: Decide what else I want on settings page!
    
    // TODO: update renderTimers to check last letter of product name. If it's an "s", 
    // handle updated from "is" to "are". Can recycle that function in several spots

    // Stuff I should mention in an FAQ / About:
    // - Decision to only handle mature fruit trees
    // - Decision to not allow multiple harvest timers of same fruit at once
    // - Decision to not allow multiple artisan timers of the same specific product (i.e. blueberry wine)
    // - Capping custom timer length at 112 days (bc it seems reasonable I guess?)
    
    // TODO: Figure out why Lists aren't using key prop correctly

    // TODO: Add a confirmation when moving from day to day. Probably one of the 
    // very last things I should do before considering v1 done
    
    const [mobile, setMobile] = useState(false);
    const [day, setDay] = useState(0);
    const [timers, setTimers] = useState([]);
    const [error, setError] = useState({exists: false, message: "Oh no!", description: "", triggers: []});
    const [hasHoney, setHasHoney] = useState(false);
    const [hasFruitTrees, setHasFruitTrees] = useState(false);
    const [showLogPage, setShowLogPage] = useState(true);
    const [showSettingsPage, setShowSettingsPage] = useState(false);
    const [showAboutPage, setShowAboutPage] = useState(false);
    const [journalText, setJournalText] = useState(
        "Hi there! Use me to take any notes you'd like. My value will persist between page loads as long as you don't clear your cache."
    );
    const [skipTreeWarning, setSkipTreeWarning] = useState(false);
    const [showState, setShowState] = useState({
        date: true,
        artisanTimers: true,
        harvestTimers: true,
        currentTimers: true,
        journal: true,
    })

    const { date, artisanTimers, harvestTimers, currentTimers, journal } = showState;
    
    const currentDate = readDate(day);

    // Loads local storage on componentDidMount
    useEffect(() => {
        setDay(JSON.parse(window.localStorage.getItem("day")));
        setTimers(JSON.parse(window.localStorage.getItem("timers")));
        setHasHoney(JSON.parse(window.localStorage.getItem("hasHoney")));
        setHasFruitTrees(JSON.parse(window.localStorage.getItem("hasFruitTrees")));
        setShowState(JSON.parse(window.localStorage.getItem("showState")));
        setJournalText(JSON.parse(window.localStorage.getItem("journalText")));
        setSkipTreeWarning(JSON.parse(window.localStorage.getItem("skipTreeWarning")));
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
        window.localStorage.setItem('journalText', JSON.stringify(journalText));
    }, [journalText]);
    useEffect(() => {
        window.localStorage.setItem('skipTreeWarning', skipTreeWarning);
    }, [skipTreeWarning]);

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
                                setShowLogPage(true);
                                handleClose();
                            }}>
                                {showLogPage && <><FontAwesomeIcon icon={faCheck} />&nbsp;</>}Log
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setShowLogPage(false);
                                setShowAboutPage(false);
                                setShowSettingsPage(true);
                                handleClose();
                            }}>
                                {showSettingsPage && <><FontAwesomeIcon icon={faCheck} />&nbsp;</>}Settings
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setShowLogPage(false);
                                setShowSettingsPage(false);
                                setShowAboutPage(true);
                                handleClose();
                            }}>
                                {showAboutPage && <><FontAwesomeIcon icon={faCheck} />&nbsp;</>}About
                            </MenuItem>                       
                        </Menu>
                        {mobile ? 
                            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                                S.L.
                            </Typography> :
                            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                                Stardew Log
                            </Typography>
                        }
                        <Counter 
                            day={day}
                            mobile={mobile}
                            handleCheck={handleCheck}
                            date={date}
                            artisanTimers={artisanTimers}
                            currentTimers={currentTimers}
                            harvestTimers={harvestTimers}
                            journal={journal}
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
                            setJournalText={setJournalText}
                            setSkipTreeWarning={setSkipTreeWarning}
                            />
                    </Toolbar>
                </AppBar>
            </Grid>
            {showLogPage && (
                <LogPage 
                    date={date}
                    currentTimers={currentTimers}
                    harvestTimers={harvestTimers}
                    artisanTimers={artisanTimers}
                    journal={journal}
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
                    journalText={journalText}
                    setJournalText={setJournalText}
                    skipTreeWarning={skipTreeWarning}
                    setSkipTreeWarning={setSkipTreeWarning}
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
                        <Typography variant="subtitle1">
                            Stardew Log created by Nic Addelia
                            &nbsp; <FontAwesomeIcon icon={faGithub} />
                            &nbsp; <a href="https://github.com/addelian">@addelian</a>
                        </Typography>
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