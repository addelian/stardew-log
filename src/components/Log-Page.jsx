import React from "react";
import {
    Grid,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    Box,
} from "@mui/material";
import ArtisanTimer from "./Artisan-Timer";
import HarvestTimer from "./Harvest-Timer";
import CurrentTimers from "./Current-Timers";
import CustomTimer from "./Custom-Timer";
import Journal from "./Journal";

const LogPage = ({
    currentDate,
    showState,
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
    journalText,
    setJournalText,
    skipTreeWarning,
    setSkipTreeWarning,
}) => {
    const {
        date,
        artisanTimers,
        harvestTimers,
        currentTimers,
        journal,
        customTimers,
    } = showState;

    return (
        <>
            <Grid item>
                <Box
                    component="div"
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <FormControl component="fieldset">
                        <FormGroup
                            aria-label="Choose which timers to display"
                            row
                        >
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={date}
                                            onChange={handleCheck}
                                            name="date"
                                        />
                                    }
                                    label="Show date"
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={currentTimers}
                                            onChange={handleCheck}
                                            name="currentTimers"
                                        />
                                    }
                                    label="Show current timers"
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={harvestTimers}
                                            onChange={handleCheck}
                                            name="harvestTimers"
                                        />
                                    }
                                    label="Show harvest timer builder"
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={artisanTimers}
                                            onChange={handleCheck}
                                            name="artisanTimers"
                                        />
                                    }
                                    label="Show artisan timer builder"
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={journal}
                                            onChange={handleCheck}
                                            name="journal"
                                        />
                                    }
                                    label="Show journal"
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={customTimers}
                                            onChange={handleCheck}
                                            name="customTimers"
                                        />
                                    }
                                    label="Show custom timer builder"
                                />
                            </Grid>
                        </FormGroup>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item>
                <Grid container spacing={3} justifyContent="space-around">
                    <Grid item style={{ paddingTop: 0 }}>
                        {date && (
                            <Grid
                                item
                                justifyContent="center"
                                xs={12}
                                style={{ textAlign: "center" }}
                            >
                                {mobile ? (
                                    <Typography variant="h2">
                                        {currentDate}
                                    </Typography>
                                ) : (
                                    <Typography variant="h1" component="h2">
                                        {currentDate}
                                    </Typography>
                                )}
                            </Grid>
                        )}
                        {currentTimers && (
                            <Grid
                                item
                                justifyContent="center"
                                xs={12}
                                style={{ textAlign: "center" }}
                            >
                                <Typography variant="h4" sx={{ pt: 2 }}>
                                    Current timers:
                                </Typography>
                                <CurrentTimers
                                    day={day}
                                    error={error}
                                    timers={timers}
                                    setTimers={setTimers}
                                    hasHoney={hasHoney}
                                    hasFruitTrees={hasFruitTrees}
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            spacing={4}
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            {artisanTimers && (
                                <Grid
                                    item
                                    md={6}
                                    style={{
                                        marginLeft: 15,
                                        marginRight: 15,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                    }}
                                    justifyContent="center"
                                >
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
                                        skipTreeWarning={skipTreeWarning}
                                        setSkipTreeWarning={setSkipTreeWarning}
                                    />
                                </Grid>
                            )}
                            {harvestTimers && (
                                <Grid
                                    item
                                    md={6}
                                    sx={{ my: 2 }}
                                    style={{
                                        marginLeft: 15,
                                        marginRight: 15,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                    }}
                                >
                                    <HarvestTimer
                                        day={day}
                                        timers={timers}
                                        setTimers={setTimers}
                                    />
                                </Grid>
                            )}
                            {customTimers && (
                                <Grid
                                    item
                                    md={6}
                                    sx={{ my: 2 }}
                                    style={{
                                        marginLeft: 15,
                                        marginRight: 15,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                    }}
                                >
                                    <CustomTimer
                                        timers={timers}
                                        setTimers={setTimers}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    {!date &&
                        !currentTimers &&
                        !harvestTimers &&
                        !artisanTimers &&
                        !journal &&
                        !customTimers && (
                            <Grid item xs={12}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        textAlign: "center",
                                        pt: 10,
                                        pb: 10,
                                    }}
                                >
                                    <em>
                                        There wasn't anybody else there, or
                                        anything. There was just violet light --
                                        and a hum.
                                    </em>
                                </Typography>
                            </Grid>
                        )}
                    {journal && (
                        <Grid container justifyContent="center">
                            <Grid item xs={10} sx={{ mx: "auto", pt: 5 }}>
                                <Journal
                                    journalText={journalText}
                                    setJournalText={setJournalText}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default LogPage;