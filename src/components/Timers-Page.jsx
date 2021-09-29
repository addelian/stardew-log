import React from "react";
import { Grid, FormControl, FormGroup, FormControlLabel, Checkbox, Typography, TextField } from "@mui/material";
import ArtisanTimer from "./Artisan-Timer";
import HarvestTimer from "./Harvest-Timer";
import CurrentTimers from "./Current-Timers";

const TimersPage = ({
    currentDate,
    date,
    currentTimers,
    artisanTimers,
    harvestTimers,
    handleCheck,
    mobile,
    day,
    error,
    setError,
    timers,
    setTimers,
    hasHoney,
    setHasHoney,
    hasFruitTrees,
    setHasFruitTrees,
    journal,
    setJournal
}) => {

    const handleChange = e => {
        setJournal(e.target.value);
    }

    return (
        <>
            <Grid item sx={{mx: "auto"}}>
                <FormControl component="fieldset">
                    <FormGroup aria-label="Choose which timers to display" row>
                        <FormControlLabel
                            control={
                                <Checkbox size="small" checked={date} onChange={handleCheck} name="date" />
                            }
                            label="Show date"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox size="small" checked={currentTimers} onChange={handleCheck} name="currentTimers" />
                            }
                            label="Show current timers"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox size="small" checked={harvestTimers} onChange={handleCheck} name="harvestTimers" />
                            }
                            label="Show harvest timer builder"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox size="small" checked={artisanTimers} onChange={handleCheck} name="artisanTimers" />
                            }
                            label="Show artisan timer builder"
                        />
                    </FormGroup>
                </FormControl>
            </Grid>
            <Grid item>
                <Grid container spacing={3} direction="column" justifyContent="space-around" alignItems="center">
                    {date && (
                        <Grid item>
                            {mobile ? 
                                <Typography variant="h2">{currentDate}</Typography> 
                                : <Typography variant="h1" component="h2">
                                    {currentDate}
                                </Typography>
                            }
                        </Grid>
                    )}
                    {currentTimers && (
                        <Grid item justifyContent="center" xs={12} style={{textAlign: "center", marginTop: 25, marginBottom: 25}}>
                            <Typography variant="h4">
                                Current timers:
                            </Typography>
                            <CurrentTimers
                                day={day}
                                error={error}
                                timers={timers}
                                setTimers={setTimers}
                                hasHoney={hasHoney}
                                setHasHoney={setHasHoney}
                                hasFruitTrees={hasFruitTrees}
                                setHasFruitTrees={setHasFruitTrees}
                            />
                        </Grid>
                    )}
                    <Grid item>
                        <Grid container direction="row" spacing={4} justifyContent="space-around" alignItems="center">
                            {artisanTimers && (
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
                            )}
                            {harvestTimers && (
                                <Grid item md={6} style={{marginTop: 25, marginBottom: 50}}>
                                    <HarvestTimer
                                        day={day}
                                        timers={timers}
                                        setTimers={setTimers}
                                        />
                                </Grid>
                            )}
                            {(!date && !currentTimers && !harvestTimers && !artisanTimers) && (
                                <Grid item md={6}>
                                    <Typography variant="subtitle2" sx={{textAlign: "center", pt:10, pb: 10}}>
                                        <em>There wasn't anybody else there, or anything.
                                        There was just violet light -- and a hum.</em>
                                    </Typography>
                                </Grid>
                            )}
                            <TextField
                                id="user-notepad"
                                label="Journal"
                                multiline
                                rows={6}
                                value={journal}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default TimersPage;