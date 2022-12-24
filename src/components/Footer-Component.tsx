import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { QUOTES } from "../data/quotes";

const FooterComponent = () => {
    const [quote, setQuote] = React.useState("");

    React.useEffect(() => {
        const quoteDuJour = renderQuote(QUOTES);
        setQuote(quoteDuJour);
    }, []);

    const renderQuote = (quotes: string[]) => {
        const getQuote = (amountOfQuotes: number) => {
            return Math.floor(Math.random() * amountOfQuotes);
        };
        return quotes[getQuote(quotes.length)];
    };

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Grid container spacing={1} justifyContent="space-between">
                    <Grid item>
                        <Typography variant="subtitle1">
                            Stardew Valley © ConcernedApe LLC.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            <em>{quote}</em>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FooterComponent;
