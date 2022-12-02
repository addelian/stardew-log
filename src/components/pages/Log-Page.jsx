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
import { lowerCase } from "lodash";
import { readDate } from "../../helpers/common";
import Timer from "../timer/Timer";
import CurrentTimers from "../log-items/Current-Timers";
import CustomTimer from "../log-items/Custom-Timer";
import Journal from "../log-items/Journal";
import { CROPS } from "../../data/crops";
import { FARM_FIXTURES } from "../../data/farm-fixtures";

const LogPage = ({
    currentDate,
    showState,
    handleCheck,
    mobile,
    day,
    error,
    timers,
    setTimers,
    journalText,
    setJournalText,
    skipTreeWarning,
    setSkipTreeWarning,
}) => {
    const {
        date,
        artisanTimers,
        harvestTimers,
        fixtureTimers,
        currentTimers,
        journal,
        customTimers,
    } = showState;

    const setHarvestList = (crops) => {
        const currentSeason = lowerCase(readDate(day).split(" ")[0]);
        const cropsInSeason = crops.filter((crop) =>
            crop.season.includes(currentSeason)
        );
        const cropsToSort = cropsInSeason.filter(
            (crop) =>
                crop.growTime !== undefined && !timers.some((timer) => timer.name === crop.name)
        );
        return cropsToSort;
    };

    const setArtisanList = (products) => {
        return products.filter(
            (product) =>
                product.kegProduct !== undefined || product.jarProduct !== undefined
        );
    }

    const setFixtureList = (products) => {
        const currentSeason = lowerCase(readDate(day).split(" ")[0]);
        return products.filter((fixture) =>
            fixture.season.includes(currentSeason)
        );
    }

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
                                            checked={fixtureTimers}
                                            onChange={handleCheck}
                                            name="fixtureTimers"
                                        />
                                    }
                                    label="Show farm fixture timer builder"
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
                                    <Timer
                                        label="Crops"
                                        list={setHarvestList(CROPS)}
                                        type="harvest"
                                        timers={timers}
                                        setTimers={setTimers}
                                    />
                                </Grid>
                            )}
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
                                >
                                    <Timer
                                        label="Starter"
                                        list={setArtisanList(CROPS)}
                                        type="artisan"
                                        timers={timers}
                                        setTimers={setTimers}
                                    />
                                </Grid>
                            )}
                            {fixtureTimers && (
                                <Grid
                                    item
                                    md={6}
                                    style={{
                                        marginLeft: 15,
                                        marginRight: 15,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                    }}
                                >
                                    <Timer
                                        label="Farm Fixtures"
                                        list={setFixtureList(FARM_FIXTURES)}
                                        type="fixture"
                                        timers={timers}
                                        setTimers={setTimers}
                                        skipTreeWarning={skipTreeWarning}
                                        setSkipTreeWarning={setSkipTreeWarning}
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
