import React, { useState } from "react";
import { Select, Alert, Button, message, List } from "antd";
import { CROPS } from "../data/crops";

const KegTimer = ({timers, setTimers, day, timerError}) => {

    const [selected, setSelected] = useState(undefined);

    const { Option } = Select;

    const handleChange = value => {
        if (value !== undefined) {
            const selectedOption = CROPS.find(crop => crop.id === value);
            setSelected(selectedOption);
        }
    }

    const createKegTimer = selectedOption => {
        if (selectedOption !== undefined) {
            setTimers([ ...timers, {...selectedOption, countdown: selectedOption.kegDuration, timerFor: selectedOption.kegProduct, timerType: "keg"} ])
            setSelected(undefined);
            return;
        }
        message.error("Select a crop first, doofus!");
    }

    const createJarTimer = selectedOption => {
        if (selectedOption !== undefined) {
            setTimers([ ...timers, {...selectedOption, countdown: 3, timerFor: selectedOption.jarProduct, timerType: "jar"} ])
            setSelected(undefined);
            return;
        }
        message.error("Select a crop first, doofus!");
    }

    const createErrorList = fullError => fullError.triggers.map(error => `${error.name} ${error.timerFor}`);

    const renderTimerErrorBlock = fullError => 
            <List
                    size="small"
                    header={<div>{fullError.description}</div>}
                    bordered
                    dataSource={createErrorList(fullError)}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />

    const renderOptions = crops => {
        
        return crops.map(crop => 
            <Option key={crop.id} value={crop.id}>{crop.name}</Option>
        )
    }

    const renderTimers = activeTimers => activeTimers.map((timer, index) => {
        return <li key={`${index}-${timer.id}-day-${day}`}>{timer.name} {timer.timerFor}{timer.countdown > 0 ? `: ${timer.countdown} ${timer.countdown > 1 ? "days" : "day"} left`: " is ready today"}</li>
    });

    return(
        <>
            <Select style={{ width:120 }} value={selected !== undefined ? selected.id : undefined} placeholder="Choose..." allowClear onChange={handleChange}>
                {renderOptions(CROPS)}
            </Select>
            <Button type="default" onClick={() => createKegTimer(selected)}>Keg it</Button>
            <Button type="default" onClick={() => createJarTimer(selected)}>Jar it</Button>

            <div>
                Current timers:
                {timerError.exists && (
                    <Alert
                        message={timerError.message}
                        description={renderTimerErrorBlock(timerError)}
                        type="error"
                    />
                )}
                {timers.length > 0 && renderTimers(timers)}
                {timers.length === 0 && (
                    <p>
                        None. Enjoy yer day
                    </p>
                )}
            </div>
        </>
    )
}

export default KegTimer;