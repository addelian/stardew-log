import React from "react";
import { TextField } from "@mui/material";

const Journal = ({ journalText, setJournalText }) => {
    const handleChange = (e) => {
        setJournalText(e.target.value);
    };

    return (
        <TextField
            fullWidth
            id="user-notepad"
            label="Journal"
            multiline
            rows={6}
            value={journalText}
            onChange={handleChange}
        />
    );
};

export default Journal;
