import React, { useState, useEffect } from "react";
import { Grid, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Counter from "./Counter";
import ArtisanTimer from "./Artisan-Timer";
import FooterComponent from "./FooterComponent";
import HarvestTimer from "./Harvest-Timer";
import CurrentTimers from "./Current-Timers";
import readDate from "../helpers/Read-Date";

const Home = () => {

    // TODO: Navigation overhaul - menu button will drop down a few checkboxes - 
    // "show timers", "show notes", "show custom timers", etc... 

    // TODO: handleSummer1, handleFall1, handleSpring1
    // perhaps update handleWinter1 to "handleSeasonChange" and add exceptions as needed?
    // spring 1 should pop a reminder modal to start your honey and fruit trees timer again
    
    // TODO: "Create Custom Timer" component? Might be nice as a catch-all instead of building out 
    // a bunch of exceptions for things like growing fruit trees for the first time. Just have to
    // pass along all of the required parameters in inputs. Definitely want to hide this when not in use, 
    // will contribute to a ton of clutter down the road if not

    // TODO: Just a notepad of some sort, some sort of always-visible bulletin board
    // to remind myself of things. Especially nice for how many seeds are planted.

    // TODO: update renderTimers to check last letter of product name. If it's an "s", 
    // handle updated from "is" to "are". Can recycle that function in several spots
    
    const [mobile, setMobile] = useState(false);
    const [day, setDay] = useState(0);
    const [timers, setTimers] = useState([]);
    const [error, setError] = useState({exists: false, message: "Oh no!", description: "", triggers: []});
    const [hasHoney, setHasHoney] = useState(false);
    const [hasFruitTrees, setHasFruitTrees] = useState(false);

    // Loads local storage on componentDidMount
    useEffect(() => {
        setDay(JSON.parse(window.localStorage.getItem('day')));
        setTimers(JSON.parse(window.localStorage.getItem('timers')));
        setHasHoney(JSON.parse(window.localStorage.getItem('hasHoney')));
        setHasFruitTrees(JSON.parse(window.localStorage.getItem('hasFruitTrees')));
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

    const date = readDate(day);

    return (
        <Grid container spacing={4} direction="column" justifyContent="space-between" alignItems="space-between">
            <Grid item>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={mobile ? {flexGrow: 1, justifyContent: "start"} : { mr: 2 }}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </IconButton>
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
                            />
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item>
                <Grid container spacing={3} direction="column" justifyContent="space-around" alignItems="center">
                    <Grid item>
                        {mobile ? 
                            <Typography variant="h2">{date}</Typography> 
                            : <Typography variant="h1" component="h2">
                                {date}
                            </Typography>
                        }
                    </Grid>
                    <Grid item justifyContent="center" xs={12} style={{textAlign: "center", marginTop: 25, marginBottom: 25}}>
                        <Typography variant="h4">
                            Current timers:
                        </Typography>
                        <CurrentTimers
                            day={day}
                            error={error}
                            timers={timers}
                            hasHoney={hasHoney}
                            hasFruitTrees={hasFruitTrees}
                            />
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={4} justifyContent="space-around" alignItems="center">
                            <Grid item md={6} style={{marginTop: 25, marginBottom: 50}}>
                                <ArtisanTimer 
                                    day={day}
                                    timers={timers}
                                    setTimers={setTimers}
                                    error={error}
                                    setError={setError}
                                    hasHoney={hasHoney}
                                    setHasHoney={setHasHoney}
                                    hasFruitTrees={hasFruitTrees}
                                    setHasFruitTrees={setHasFruitTrees}
                                    />
                            </Grid>
                            <Grid item md={6} style={{marginTop: 25, marginBottom: 50}}>
                                <HarvestTimer
                                    day={day}
                                    timers={timers}
                                    setTimers={setTimers}
                                    />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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