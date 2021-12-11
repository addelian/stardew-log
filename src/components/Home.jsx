import React, { useState, useEffect } from "react";
import {
    Button,
    Menu,
    MenuItem,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
import LogPage from "./Log-Page";
import AboutPage from "./About-Page";
import SettingsPage from "./Settings-Page";
import Counter from "./Counter";
import FooterComponent from "./FooterComponent";
import { readDate } from "../helpers/common";

const Home = () => {
    const [mobile, setMobile] = useState(false);
    const [day, setDay] = useState(0);
    const [timers, setTimers] = useState([]);
    const [error, setError] = useState({
        exists: false,
        message: "Oh no!",
        description: "",
        triggers: [],
    });
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
        customTimers: false,
    });

    const {
        date,
        artisanTimers,
        harvestTimers,
        currentTimers,
        journal,
        customTimers,
    } = showState;

    const currentDate = readDate(day);

    // Loads local storage on componentDidMount
    useEffect(() => {
        setDay(JSON.parse(window.localStorage.getItem("day")));
        setTimers(JSON.parse(window.localStorage.getItem("timers")));
        setHasHoney(JSON.parse(window.localStorage.getItem("hasHoney")));
        setHasFruitTrees(
            JSON.parse(window.localStorage.getItem("hasFruitTrees"))
        );
        setShowState(JSON.parse(window.localStorage.getItem("showState")));
        setJournalText(JSON.parse(window.localStorage.getItem("journalText")));
        setSkipTreeWarning(
            JSON.parse(window.localStorage.getItem("skipTreeWarning"))
        );
    }, []);

    // Basic save functionality
    useEffect(() => {
        window.localStorage.setItem("day", day);
    }, [day]);
    useEffect(() => {
        window.localStorage.setItem("timers", JSON.stringify(timers));
    }, [timers]);
    useEffect(() => {
        window.localStorage.setItem("hasHoney", hasHoney);
    }, [hasHoney]);
    useEffect(() => {
        window.localStorage.setItem("hasFruitTrees", hasFruitTrees);
    }, [hasFruitTrees]);
    useEffect(() => {
        window.localStorage.setItem("showState", JSON.stringify(showState));
    }, [showState]);
    useEffect(() => {
        window.localStorage.setItem("journalText", JSON.stringify(journalText));
    }, [journalText]);
    useEffect(() => {
        window.localStorage.setItem("skipTreeWarning", skipTreeWarning);
    }, [skipTreeWarning]);

    useEffect(() => {
        const setResponsiveness = () => {
            if (window.innerWidth < 500) {
                setMobile(true);
            } else setMobile(false);
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        };
    }, []);

    const [menuOpen, setMenuOpen] = useState(null);
    const open = Boolean(menuOpen);
    const handleClick = (event) => {
        setMenuOpen(event.currentTarget);
    };

    const handleCheck = (e) => {
        setShowState({
            ...showState,
            [e.target.name]: e.target.checked,
        });
    };

    const handleClose = () => {
        setMenuOpen(null);
    };

    return (
        <Grid
            container
            spacing={4}
            direction="column"
            justifyContent="space-between"
            alignItems="space-between"
        >
            <Grid item>
                <AppBar position="static">
                    <Toolbar>
                        <Button
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="menu"
                                sx={
                                    mobile
                                        ? {
                                              flexGrow: 1,
                                              justifyContent: "start",
                                              color: "white",
                                          }
                                        : { mr: 2, color: "white" }
                                }
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
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    setShowSettingsPage(false);
                                    setShowAboutPage(false);
                                    setShowLogPage(true);
                                    handleClose();
                                }}
                            >
                                {showLogPage && (
                                    <>
                                        <FontAwesomeIcon icon={faCheck} />
                                        &nbsp;
                                    </>
                                )}
                                Log
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setShowLogPage(false);
                                    setShowAboutPage(false);
                                    setShowSettingsPage(true);
                                    handleClose();
                                }}
                            >
                                {showSettingsPage && (
                                    <>
                                        <FontAwesomeIcon icon={faCheck} />
                                        &nbsp;
                                    </>
                                )}
                                Settings
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setShowLogPage(false);
                                    setShowSettingsPage(false);
                                    setShowAboutPage(true);
                                    handleClose();
                                }}
                            >
                                {showAboutPage && (
                                    <>
                                        <FontAwesomeIcon icon={faCheck} />
                                        &nbsp;
                                    </>
                                )}
                                About
                            </MenuItem>
                        </Menu>
                        {mobile ? (
                            <Typography
                                variant="h6"
                                component="h1"
                                sx={{ flexGrow: 1 }}
                            >
                                S.L.
                            </Typography>
                        ) : (
                            <Typography
                                variant="h6"
                                component="h1"
                                sx={{ flexGrow: 1 }}
                            >
                                Stardew Log
                            </Typography>
                        )}
                        {showLogPage && (
                            <Counter
                                day={day}
                                mobile={mobile}
                                handleCheck={handleCheck}
                                date={date}
                                artisanTimers={artisanTimers}
                                currentTimers={currentTimers}
                                harvestTimers={harvestTimers}
                                customTimers={customTimers}
                                journal={journal}
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
                        )}
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
                    customTimers={customTimers}
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
                        <SettingsPage
                            mobile={mobile}
                            setDay={setDay}
                            setTimers={setTimers}
                            setHasHoney={setHasHoney}
                            setHasFruitTrees={setHasFruitTrees}
                            setShowState={setShowState}
                            setJournalText={setJournalText}
                            setSkipTreeWarning={setSkipTreeWarning}
                            setShowSettingsPage={setShowSettingsPage}
                            setShowLogPage={setShowLogPage}
                        />
                    </Grid>
                </Grid>
            )}
            {showAboutPage && (
                <Grid item>
                    <AboutPage />
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
    );
};

export default Home;
