import React, { useState } from "react";
import { Row, Col } from "antd";
import Counter from "./Counter";
import KegTimer from "./Artisan-Timer";

const Home = () => {

    const [day, setDay] = useState(0);
    const [timers, setTimers] = useState([]);
    const [timerError, setTimerError] = useState({exists: false, message: "Oh no!", description: "", triggers: []});

    return (
        <>
            <KegTimer day={day} timers={timers} setTimers={setTimers} timerError={timerError} setTimerError={setTimerError}/>
            <Row>
                <Counter day={day} setDay={setDay} timers={timers} setTimers={setTimers} setTimerError={setTimerError}/>
            </Row>
        </>
    )
}

export default Home;