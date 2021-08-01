import React, { useState } from "react";
import { Select, Button, Row, Col, Space } from "antd";
import { lowerCase } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";
import readDate from "../helpers/Read-Date";

const HarvestTimer = ({ day, timers, setTimers }) => {

    // this timer will hopefully be a lot less complicated.
    // should really just need a dropdown of all crops that can be planted
    // and then have a "Plant it" button.
    // biggest difference will be addition of regrow logic,
    // but I should be able to handle that in Counter page
    // if I pass the whole object over there in the timers array.

    // I think I can continue to use the same timers state??
    
    const [selected, setSelected] = useState(undefined);

    const { Option } = Select;
    
    const renderOptions = crops => {
        
        const currentSeason = (lowerCase(readDate(day).split(" ")[0]));
        const cropsInSeason = crops.filter(crop => crop.season.includes(currentSeason));
        const cropsToSort = cropsInSeason.filter(crop => crop.growTime !== undefined);

        // ES6 alphabetical order
        const cropsEligibleForHarvestTimer = cropsToSort.sort((a, b) => a.name.localeCompare(b.name));
        
        return cropsEligibleForHarvestTimer.map(crop => 
            <Option key={`${crop.id}-harvest-option`} value={crop.id}>{crop.name}</Option>
        )
    }

    const handleChange = value => {
        if (value !== undefined) {
            const selectedOption = CROPS.find(crop => crop.id === value);
            setSelected(selectedOption);
        }
    }

    const clearTimer = selectedOption => {
        if (selectedOption !== undefined) {
            setSelected(undefined);
        }
    }

    const createHarvestTimer = selectedOption => {
        setTimers([ ...timers, {...selectedOption, countdown: selectedOption.growTime, timerType: "harvest"}]);
        setSelected(undefined);
    }
    
    return(
        <>
            <Space direction="vertical">
                <Row>
                    <Col>
                        <Space>
                            <Select 
                                style={{ width:'120px' }}
                                value={selected !== undefined ? selected.id : undefined}
                                placeholder="Choose..."
                                onChange={handleChange}
                                >
                                {renderOptions(CROPS)}
                            </Select>
                            <Button 
                                type="default"
                                // style={buttonStyling(selected, "keg")}
                                disabled={selected === undefined}
                                onClick={() => createHarvestTimer(selected)}
                                >
                                <FontAwesomeIcon icon={faSeedling} />&nbsp;Plant it
                            </Button>
                            <Button 
                                type="default"
                                style={selected !== undefined? {color: "red"} : {}}
                                disabled={selected === undefined}
                                onClick={() => clearTimer(selected)}
                                >
                                <FontAwesomeIcon icon={faTimes} />&nbsp;Clear it
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Space>
        </>
    )
}

export default HarvestTimer;