import React, { useState } from "react";
import { Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TimerSelection = ({
    selectionLabel,
    selectionList,
    type,
    handleChange,
    selected,
    setSelected,
}) => {
    const renderOptions = (list) => {
        // Alphabetical order
        const sortedList = list.sort((a, b) => a.name.localeCompare(b.name));

        return sortedList.map((item) => (
            <MenuItem key={`${item.id}-${type}-option`} value={item.id}>
                {item.name}
            </MenuItem>
        ));
    };
    return (
        <Grid item>
            <FormControl sx={{ minWidth: 95 }}>
                <InputLabel id={`${type}-select-label`}>
                    {selectionLabel}
                </InputLabel>
                <Select
                    labelId={`${type}-select-label`}
                    id={`${type}-select`}
                    label={selectionLabel}
                    value={selected ? selected.id : ""}
                    onChange={handleChange}
                >
                    {renderOptions(selectionList)}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default TimerSelection;
