import React, { useState } from "react";
import Counter from "./Counter";
import KegTimer from "./Timer";

const Home = () => {

    const [day, setDay] = useState(0);
    const [timers, setTimers] = useState([]);
    const [timerError, setTimerError] = useState({exists: false, message: "Oh no!", description: "", triggers: []});

    return (
        <div>
            <Counter day={day} setDay={setDay} timers={timers} setTimers={setTimers} setTimerError={setTimerError}/>
            <KegTimer day={day} timers={timers} setTimers={setTimers} timerError={timerError} setTimerError={setTimerError}/>
        </div>
    )
}

export default Home;