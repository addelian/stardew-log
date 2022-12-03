import React from "react";
import { Grid, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CropType, FixtureType } from "../../helpers/types";

type TimerSelectionProps = {
    selectionLabel: string,
    selectionList: Array<CropType | FixtureType>,
    type: string,
    selected: CropType | FixtureType | undefined,
    setSelected: (item: CropType | FixtureType | undefined) => void
}

const TimerSelection: React.FC<TimerSelectionProps> = ({
    selectionLabel,
    selectionList,
    type,
    selected,
    setSelected,
}) => {

    const handleChange = (e: any) => {
        if (e.target.value !== "") {
            const selectedOption = selectionList.find(
                (item) => item.id === e.target.value
            );
            const selection = typeof selectedOption !== "undefined" ? selectedOption : undefined;
            setSelected(selection);
        }
    };

    const renderOptions = (list: Array<CropType | FixtureType>) => {
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
                    value={typeof selected !== "undefined" ? selected.id : undefined}
                    onChange={handleChange}
                >
                    {renderOptions(selectionList)}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default TimerSelection;
