import * as React from "react";
import {
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
import LogPage from "./pages/Log-Page";
import AboutPage from "./pages/About-Page";
import SettingsPage from "./pages/Settings-Page";
import Counter from "./log-items/Counter";
import FooterComponent from "./Footer-Component";
import { TimerType, ErrorType } from "../helpers/types";

const Home = () => {
    const [mobile, setMobile] = React.useState(false);
    const [day, setDay] = React.useState(0);
    const [timers, setTimers] = React.useState<TimerType[] | []>([]);
    const [error, setError] = React.useState<ErrorType>({
        exists: false,
        message: "Oh no!",
        description: "",
        triggers: [],
    });
    const [showLogPage, setShowLogPage] = React.useState(true);
    const [showSettingsPage, setShowSettingsPage] = React.useState(false);
    const [showAboutPage, setShowAboutPage] = React.useState(false);
    const [journalText, setJournalText] = React.useState(
        "Hi there! Use me to take any notes you'd like. My value will persist between page loads as long as you don't clear your cache. 😎"
    );
    const [skipTreeWarning, setSkipTreeWarning] = React.useState(false);
    const [showState, setShowState] = React.useState({
        date: true,
        artisanTimers: true,
        harvestTimers: true,
        fixtureTimers: true,
        currentTimers: true,
        journal: true,
        customTimers: false,
    });

    // handling new user with no cache

    const dataExists = window.localStorage.getItem("day") !== null;

    // Loads local storage on componentDidMount
    React.useEffect(() => {
        if (dataExists) {
            setDay(JSON.parse(window.localStorage.getItem("day") || '{}'));
            setTimers(JSON.parse(window.localStorage.getItem("timers") || '{}'));
            setShowState(JSON.parse(window.localStorage.getItem("showState") || '{}'));
            setJournalText(JSON.parse(window.localStorage.getItem("journalText") || '{}'));
            setSkipTreeWarning(JSON.parse(window.localStorage.getItem("skipTreeWarning") || '{}'));
        }
    }, []);

    // Basic save functionality
    React.useEffect(() => {
        window.localStorage.setItem("day", String(day));
    }, [day]);
    React.useEffect(() => {
        window.localStorage.setItem("timers", JSON.stringify(timers));
    }, [timers]);
    React.useEffect(() => {
        window.localStorage.setItem("showState", JSON.stringify(showState));
    }, [showState]);
    React.useEffect(() => {
        window.localStorage.setItem("journalText", JSON.stringify(journalText));
    }, [journalText]);
    React.useEffect(() => {
        window.localStorage.setItem("skipTreeWarning", String(skipTreeWarning));
    }, [skipTreeWarning]);

    React.useEffect(() => {
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

    const [menuOpen, setMenuOpen] = React.useState(null);
    const open = Boolean(menuOpen);
    const handleClick = (e: any) => {
        setMenuOpen(e.currentTarget);
    };

    const handleCheck = (e: any) => {
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
                        <IconButton
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
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
                                setDay={setDay}
                                timers={timers}
                                setTimers={setTimers}
                                error={error}
                                setError={setError}
                            />
                        )}
                    </Toolbar>
                </AppBar>
            </Grid>
            {showLogPage && showState && (
                <>
                    <LogPage
                        showState={showState}
                        mobile={mobile}
                        handleCheck={handleCheck}
                        day={day}
                        error={error}
                        timers={timers}
                        setTimers={setTimers}
                        journalText={journalText}
                        setJournalText={setJournalText}
                        skipTreeWarning={skipTreeWarning}
                        setSkipTreeWarning={setSkipTreeWarning}
                    />
                </>
            )}
            {showSettingsPage && (
                <SettingsPage
                    mobile={mobile}
                    setDay={setDay}
                    setTimers={setTimers}
                    setShowState={setShowState}
                    setJournalText={setJournalText}
                    setSkipTreeWarning={setSkipTreeWarning}
                    setShowSettingsPage={setShowSettingsPage}
                    setShowLogPage={setShowLogPage}
                />
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
