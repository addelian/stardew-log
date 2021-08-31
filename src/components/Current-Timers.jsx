import React from "react";
import { Row, Col, Typography } from "antd";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const CurrentTimers = ({ day, error, timers, hasHoney, hasFruitTrees }) => {

    const { Paragraph } = Typography;

    const renderProductName = productInTimer => {

        if (productInTimer.timerType === "harvest") {
            if (productInTimer.name.includes("Seeds")) {
                return productInTimer.product;
            }
            return productInTimer.name;
        }
        if ((productInTimer.timerType === "keg" && !["wine", "juice"].includes(productInTimer.timerFor))
            || ["Honey", "Fruit Trees"].includes(productInTimer.timerFor)
        ) {
            return productInTimer.timerFor;
        }
        if (productInTimer.timerType === "jar" && !["jelly", "pickles"].includes(productInTimer.timerFor)) {
            if (productInTimer.timerFor === "Aged Roe") {
                return productInTimer.timerFor;
            }
            return "Caviar";
        }
        return `${productInTimer.name} ${productInTimer.timerFor}`;
    }

    const createErrorList = fullError => fullError.triggers.map(error => {
        if (error.name === "Fruit Trees") {
            return (<ListItem><ListItemText primary="Fruit from fruit trees" /></ListItem>);
        }
        return (
            <ListItem>
                <ListItemText primary={renderProductName(error)} />
            </ListItem>
        );
    });

    const renderTimerErrorBlock = fullError => 
            <List dense>
                {createErrorList(fullError)}
            </List>
    
    const renderCountdown = productInTimer => {
        if (productInTimer.name === "Honey") {
            if ([4, 0].includes(productInTimer.countdown)) {
                return ` is ready. Next harvest ready in 4 days`;
            }
            if (productInTimer.countdown === 1) {
                return `: 1 day`;
            }
            return `: ${productInTimer.countdown} days`;
        }
        if (productInTimer.name === "Fruit Trees") {
            if ([3,0].includes(productInTimer.countdown)) {
                return ` are full (3 fruit each). Pick them today!`;
            }
            if (productInTimer.countdown === 2) {
                return `: 1 fruit each`;
            }
            return `: 2 fruit each`;
        }
        if (productInTimer.regrow && productInTimer.firstHarvest === false && productInTimer.countdown === productInTimer.regrowTime) {
            return ` is ready today. Next harvest in ${productInTimer.countdown} days`;
        }
        return `${productInTimer.countdown > 0 ? `: ${productInTimer.countdown} ${productInTimer.countdown > 1 ? "days" : "day"} left`: `${(productInTimer.timerFor === "pickles" || productInTimer.name.includes("Seeds")) ? ` are` : ` is`} ready today`}`;
    }

    const renderTimers = activeTimers => activeTimers.map((timer, index) => {
        return <li key={`${index}-${timer.id}-day-${day}`}>{renderProductName(timer)}{renderCountdown(timer)}</li>
    });

    console.log(error);

    return (
        <>
            <Row>
                <Col>
                    {error.exists && (
                        <Alert severity="error">
                            <AlertTitle>{error.message}</AlertTitle>
                            <em>{error.description}</em>
                            {renderTimerErrorBlock(error)}
                        </Alert>
                        )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Paragraph>
                        <ul>
                            {timers.length > 0 && renderTimers(timers)}
                            {timers.length === 0 && (!hasHoney && !hasFruitTrees) && (
                                <p>None. Enjoy yer day</p>
                                )}
                        </ul>
                    </Paragraph>
                </Col>
            </Row>
        </>
    )
}

export default CurrentTimers;