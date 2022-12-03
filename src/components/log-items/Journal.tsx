import * as React from "react";
import { TextField } from "@mui/material";

type JournalProps = {
    journalText: string,
    setJournalText: (text: string) => void
}

const Journal: React.FC<JournalProps> = ({ journalText, setJournalText }) => {
    const handleChange = (e: any) => {
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
