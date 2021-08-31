import React, { useState } from "react";
import { Row, Col, Space } from "antd";
import { Button, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { lowerCase } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";
import readDate from "../helpers/Read-Date";

const HarvestTimer = ({ day, timers, setTimers }) => {
    
    const [selected, setSelected] = useState('');
    
    const renderOptions = crops => {
        
        const currentSeason = (lowerCase(readDate(day).split(" ")[0]));
        const cropsInSeason = crops.filter(crop => crop.season.includes(currentSeason));
        const cropsToSort = cropsInSeason.filter(crop => crop.growTime !== undefined);

        // ES6 alphabetical order
        const cropsEligibleForHarvestTimer = cropsToSort.sort((a, b) => a.name.localeCompare(b.name));
        
        return cropsEligibleForHarvestTimer.map(crop => 
            <MenuItem key={`${crop.id}-harvest-option`} value={crop.id}>{crop.name}</MenuItem>
        )
    }

    const handleChange = e => {
        if (e.target.value !== '') {
            const selectedOption = CROPS.find(crop => crop.id === e.target.value);
            setSelected(selectedOption);
        }
    }

    const clearTimer = selectedOption => {
        if (selectedOption !== '') {
            setSelected('');
        }
    }

    const createHarvestTimer = selectedOption => {
        if (selectedOption.regrow) {
            setTimers([ ...timers, {...selectedOption, countdown: selectedOption.growTime, timerType: "harvest", firstHarvest: true }]);
            setSelected('');
            return;
        }
        setTimers([ ...timers, {...selectedOption, countdown: selectedOption.growTime, timerType: "harvest" }]);
        setSelected('');
        return;
    }
    
    return(
        <>
            <Space direction="vertical">
                <Row>
                    <Col>
                        <Space>
                            <FormControl>
                                <InputLabel>Crop</InputLabel>
                                <Select 
                                    style={{minWidth: 65}}
                                    value={selected !== '' ? selected.id : ''}
                                    onChange={handleChange}
                                    >
                                    {renderOptions(CROPS)}
                                </Select>
                            </FormControl>
                            <Button 
                                variant="contained"
                                style={selected !== '' ? {"background-color": "green", "color" : "white"} : {}}
                                disabled={selected === ''}
                                onClick={() => createHarvestTimer(selected)}
                                >
                                <FontAwesomeIcon icon={faSeedling} />&nbsp;Plant it
                            </Button>
                            <Button 
                                variant="contained"
                                style={selected !== '' ? {color: "red"} : {}}
                                disabled={selected === ''}
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