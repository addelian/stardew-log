import React, { useState, useEffect } from "react";
import { Box, Grid, AppBar, Toolbar } from "@material-ui/core";
import Counter from "./Counter";
import ArtisanTimer from "./Artisan-Timer";
import FooterComponent from "./FooterComponent";
import HarvestTimer from "./Harvest-Timer";
import CurrentTimers from "./Current-Timers";

const Home = () => {

    // TODO: "Create Custom Timer" component? Might be nice as a catch-all instead of building out 
    // a bunch of exceptions for things like growing fruit trees for the first time. Just have to
    // pass along all of the required parameters in inputs. Definitely want to hide this when not in use, 
    // will contribute to a ton of clutter down the road if not

    // TODO: Just a notepad of some sort, some sort of always-visible bulletin board
    // to remind myself of things. Especially nice for how many seeds are planted.

    // TODO: make page responsive. V strongly considering switch to Material-UI, which ought to be a new feature branch
    
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

    return (
        // <Box maxWidth="100%">
        <Grid container direction="column" justifyContent="space-between">

        
            <AppBar color="default" position="static">
                <Toolbar>
                    <Counter 
                        day={day}
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
            <Grid container spacing={3} direction="column" justifyContent="space-around" alignItems="center">
                <Grid container direction="row" spacing={4} justifyContent="space-around">
                    <Grid item md={5} style={{paddingTop: 50, paddingLeft: 20}}>
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
                    <Grid item md={5} style={{paddingTop: 50, paddingRight: 20}}>
                        <HarvestTimer
                            day={day}
                            timers={timers}
                            setTimers={setTimers}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <h2>Current timers:</h2>
                    <CurrentTimers
                        day={day}
                        error={error}
                        timers={timers}
                        hasHoney={hasHoney}
                        hasFruitTrees={hasFruitTrees}
                        />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-around">
                <Grid item xs={11}>
                    <FooterComponent />
                </Grid>
            </Grid>
            </Grid>
        // </Box>
    )
}

export default Home;