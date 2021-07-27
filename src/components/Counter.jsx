import React from "react";
import { Button, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import readDate from "../helpers/Read-Date";

const Counter = ({ day, setDay, timers, setTimers, setError, setHasHoney, setHasFruitTrees }) => {

    // add a confirmation when going to switch day "Are you sure??"

    const handleError = () => {
        const removeError = () => {
        setError({exists: false});
        };
        setTimeout(removeError, 5000);
    }   

    const handleWinter1 = (remainingTimers, productName, setHasProduct) => {
        const i = remainingTimers.findIndex(timer => timer.name === productName);
        if (i !== -1) {
            const removedProduct = remainingTimers.splice(i, 1)[0];
            setTimers(remainingTimers);
            setHasProduct(false);
            return removedProduct;
        }
        return;
    }

    const advanceDay = activeTimers => {
        day < 111 ? setDay(day + 1) : setDay(0);
        const timersCountingDown = activeTimers.map(timer => {
            if (timer.name === "Honey" || timer.name === "Fruit Trees") {
                if (timer.countdown - 1 === 0) {
                    return {...timer, countdown: (timer.name === "Honey" ? 4 : 3)}
                }
            }
            return {...timer, countdown: timer.countdown - 1}
        })
        setTimers(timersCountingDown);
        const timersToRemove = timersCountingDown.filter(timer => timer.countdown < 0);
        const timersToKeep = timersCountingDown.filter(timer => timer.countdown >= 0);
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            console.log("Completed timer(s) removed: ", timersToRemove);
        }
        // Winter 1
        if (day === 83) {
            const winter1Removals = [];
            winter1Removals.push(handleWinter1(timersToKeep, "Honey", setHasHoney));
            winter1Removals.push(handleWinter1(timersToKeep, "Fruit Trees", setHasFruitTrees));
            setError({
                exists: true,
                message: "Welcome to Winter!",
                description: "The following items cannot be harvested during winter, and thus, their timers were removed:",
                triggers: winter1Removals
            });
            handleError();
        }
    }

    const revertDay = activeTimers => {
        day > 0 ? setDay(day -1) : setDay(111);
        const timersCountingUp = activeTimers.map(timer => timer = {...timer, countdown: timer.countdown + 1});
        setTimers(timersCountingUp);
        const timersToRemove = timersCountingUp.filter(timer => timer.timerType === "keg" ? timer.countdown > timer.kegDuration : timer.countdown > 3);
        const timersToKeep = timersCountingUp.filter(timer => timer.timerType === "keg" ? timer.countdown <= timer.kegDuration : timer.countdown <= 3);
        if (timersToRemove.length > 0) {
            setTimers(timersToKeep);
            setError({
                exists: true, 
                message: "Invalid Timer", 
                description: "The timers for the following items were removed:",
                triggers: timersToRemove
            });
            console.log("Invalid timer(s) removed: ", timersToRemove);
            if (timersToRemove.some(timer => timer.name === "Honey")) {
                setHasHoney(false);
            }
            if (timersToRemove.some(timer => timer.name === "Fruit Trees")) {
                setHasFruitTrees(false);
            }
            handleError();
        }
    }

    const date = readDate(day);

    return (
        <Row>
            <Col flex="auto">
                <h1 style={{color: "white"}}>{date}</h1>
            </Col>
            <Col>
                <Button type="default" onClick={() => revertDay(timers)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
            </Col>
            <Col>
                <Button type="primary" onClick={() => advanceDay(timers)}>Advance day</Button>
            </Col>
        </Row>
    )
}

export default Counter;