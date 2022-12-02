import React from "react";
import { Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TimerSelection = ({
    selectionLabel,
    selectionList,
    type,
    selected,
    setSelected,
}) => {

    const handleChange = (e) => {
        if (e.target.value !== "") {
            const selectedOption = selectionList.find(
                (item) => item.id === e.target.value
            );
            setSelected(selectedOption);
        }
    };

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
            <FormControl sx={{ minWidth: selectionLabel === "Farm Fixtures" ? 145 : 95, maxWidth: 200 }}>
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
