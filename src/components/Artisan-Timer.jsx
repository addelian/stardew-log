import React, { useState } from "react";
import { Select, Alert, Button, List, Row, Col, Space, Checkbox, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle, faAppleAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";

const ArtisanTimer = ({timers, setTimers, day, timerError}) => {

    // I should probably do it in its own component, but here's an idea for harvest timers.
    // when you select a crop, you could have an optional checkbox for initial harvest
    // or repeat harvest. Eh, it's against the spirit of the simplicity.
    // Likely better to have a second step in there for regrows, maybe have it be a 
    // unique function that pulls from the same list. 

    // TODO: add honey timer. just a checkbox that user checks
    // either when they build house or when they harvest it.
    // just a repeated counter that says it's ready every 4 days

    const [selected, setSelected] = useState(undefined);
    const [hasHoney, setHasHoney] = useState(false);

    const { Option } = Select;
    const { Paragraph } = Typography;

    const handleChange = value => {
        if (value !== undefined) {
            const selectedOption = CROPS.find(crop => crop.id === value);
            setSelected(selectedOption);
        }
    }

    const handleHoneyChange = () => {
        if (day <= 83) {
            const honey = CROPS.find(crop => crop.name === "Honey");
            setHasHoney(true);
            setTimers([ ...timers, {...honey, countdown: 4, timerFor: "Honey", timerType: "beehouse" }]);
        }
        setHasHoney(false);
    }

    const createKegTimer = selectedOption => {
        setTimers([ ...timers, {...selectedOption, countdown: selectedOption.kegDuration, timerFor: selectedOption.kegProduct, timerType: "keg"} ])
        setSelected(undefined);
    }

    const createJarTimer = selectedOption => {
        setTimers([ ...timers, {...selectedOption, countdown: selectedOption.name === "Caviar" ? 3 : 4, timerFor: selectedOption.jarProduct, timerType: "jar"} ])
        setSelected(undefined);
    }

    const clearTimer = selectedOption => {
        if (selectedOption !== undefined) {
            setSelected(undefined);
        }
    }

    const buttonStyling = (selectedOption, parentButton) => {
        if (selectedOption !== undefined && selectedOption.preferred !== undefined) {
            if (parentButton === "keg" && selectedOption.preferred === "keg") {
                return {"background-color": "green", "color" : "white"};
            }
            if (parentButton === "jar" && selectedOption.preferred === "jar") {
                return {"background-color": "green", "color" : "white"};
            }
            return {"background-color": "red", "color" : "white"};
        }
        return {};
    }

    const createErrorList = fullError => fullError.triggers.map(error => renderProductName(error));

    const renderTimerErrorBlock = fullError => 
            <List
                    size="small"
                    header={<div>{fullError.description}</div>}
                    bordered
                    dataSource={createErrorList(fullError)}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />

    const renderOptions = crops => {

        const cropsToSort = crops.filter(crop => crop.kegProduct !== undefined || crop.jarProduct !== undefined);

        // ES6 alphabetical order
        const cropsEligibleForArtisanProducts = cropsToSort.sort((a, b) => a.name.localeCompare(b.name));
        
        return cropsEligibleForArtisanProducts.map(crop => 
            <Option key={crop.id} value={crop.id}>{crop.name}</Option>
        )
    }

    const renderProductName = productInTimer => {

        if ((productInTimer.timerType === "keg" && !["wine", "juice"].includes(productInTimer.timerFor)) || productInTimer.timerType === "beehouse") {
            return `${productInTimer.timerFor}`;
        }
        if (productInTimer.timerType === "jar" && !["jelly", "pickles"].includes(productInTimer.timerFor)) {
            if (productInTimer.timerFor === "Aged Roe") {
                return `${productInTimer.timerFor}`;
            }
            return "Caviar";
        }
        return `${productInTimer.name} ${productInTimer.timerFor}`;
    }

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
        return `${productInTimer.countdown > 0 ? `: ${productInTimer.countdown} ${productInTimer.countdown > 1 ? "days" : "day"} left`: `${productInTimer.timerFor === "pickles" ? ` are` : ` is`} ready today`}`;
    }

    const renderFruitTreeTimer = () => {
        // AW NUTS, I FORGOT ABOUT FRUIT TREES
        // similar to above, user needs to click checkbox either on (Season) 1 or after picking fruits.
        // will also need to kill this at winter 1, but ALSO need to reset it at Summer & Fall 1
    }


    const renderTimers = activeTimers => activeTimers.map((timer, index) => {
        return <li key={`${index}-${timer.id}-day-${day}`}>{renderProductName(timer)}{renderCountdown(timer)}</li>
    });

    return(
        <>
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
                            style={buttonStyling(selected, "keg")}
                            disabled={selected === undefined || ["Ginger", "Roe", "Sturgeon Roe"].includes(selected.name)}
                            onClick={() => createKegTimer(selected)}
                            >
                            <FontAwesomeIcon icon={faWineBottle} />&nbsp;Keg it
                        </Button>
                        <Button 
                            type="default"
                            style={buttonStyling(selected, "jar")}
                            disabled={selected === undefined || ["Coffee Bean", "Honey"].includes(selected.name)}
                            onClick={() => createJarTimer(selected)}
                            >
                            <FontAwesomeIcon icon={faAppleAlt} />&nbsp;Jar it
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

            <Row>
                <Col>
                    <Button 
                        type="default"
                        disabled={day > 83} 
                        onClick={() => handleHoneyChange()}>
                        Add a honey timer
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    Current timers:
                </Col>
            </Row>
            <Row>
                <Col>
                    {timerError.exists && (
                        <Alert
                        message={timerError.message}
                        description={renderTimerErrorBlock(timerError)}
                        type="error"
                        />
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Paragraph>
                        <ul>
                            {timers.length > 0 && renderTimers(timers)}
                            {timers.length === 0 && !hasHoney && (
                                <p>None. Enjoy yer day</p>
                            )}
                        </ul>
                    </Paragraph>
                </Col>
            </Row>
        </>
    )
}

export default ArtisanTimer;