import React, { useState } from "react";
import { Select, Alert, Button, List, Row, Col, Space, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle, faAppleAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";

const ArtisanTimer = ({timers, setTimers, day, error, hasHoney, setHasHoney, hasFruitTrees, setHasFruitTrees}) => {

    // I should probably do it in its own component, but here's an idea for harvest timers.
    // when you select a crop, you could have an optional checkbox for initial harvest
    // or repeat harvest. Eh, it's against the spirit of the simplicity.
    // Likely better to have a second step in there for regrows, maybe have it be a 
    // unique function that pulls from the same list. 

    const [selected, setSelected] = useState(undefined);

    const { Option } = Select;
    const { Paragraph } = Typography;

    const handleChange = value => {
        if (value !== undefined) {
            const selectedOption = CROPS.find(crop => crop.id === value);
            setSelected(selectedOption);
        }
    }

    const handleBeesAndTrees = (hasProduct, setHasProduct, selectedProduct, productCountdown, productTimerFor) => {
        if (!hasProduct) {
            const product = CROPS.find(crop => crop.name === selectedProduct);
            setHasProduct(true);
            setTimers([ ...timers, { ...product, countdown: productCountdown, timerFor: productTimerFor }]);
            return;
        }
        setHasProduct(false);
        const productTimer = timers.findIndex(timer => timer.name === selectedProduct);
        const reducedTimers = timers.splice(productTimer, 1);
        setTimers(timers);
        return reducedTimers;
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
                return {"backgroundColor": "green", "color" : "white"};
            }
            if (parentButton === "jar" && selectedOption.preferred === "jar") {
                return {"backgroundColor": "green", "color" : "white"};
            }
            return {"backgroundColor": "red", "color" : "white"};
        }
        return {};
    }

    const createErrorList = fullError => fullError.triggers.map(error => {
        if (error.name === "Fruit Trees") {
            return "Fruit from fruit trees";
        }
        return renderProductName(error);
    });

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

        if ((productInTimer.timerType === "keg" && !["wine", "juice"].includes(productInTimer.timerFor))
            || ["Honey", "Fruit Trees"].includes(productInTimer.timerFor)
        ) {
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
        if (productInTimer.name === "Fruit Trees") {
            if ([3,0].includes(productInTimer.countdown)) {
                return ` are full (3 fruit each). Pick them today!`;
            }
            if (productInTimer.countdown === 2) {
                return `: 1 fruit each`;
            }
            return `: 2 fruit each`;
        }
        return `${productInTimer.countdown > 0 ? `: ${productInTimer.countdown} ${productInTimer.countdown > 1 ? "days" : "day"} left`: `${productInTimer.timerFor === "pickles" ? ` are` : ` is`} ready today`}`;
    }

    const renderTimers = activeTimers => activeTimers.map((timer, index) => {
        return <li key={`${index}-${timer.id}-day-${day}`}>{renderProductName(timer)}{renderCountdown(timer)}</li>
    });

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

                <Row >
                    <Space>
                        <Col>
                            <Button 
                                type="default"
                                disabled={day > 83} 
                                onClick={() => handleBeesAndTrees(hasHoney, setHasHoney, "Honey", 4, "Honey" )}>
                                {hasHoney ? "Remove honey timer" : "Add honey timer"}
                            </Button>
                        </Col>
                        <Col>
                            <Button 
                                type="default"
                                disabled={day > 83} 
                                onClick={() => handleBeesAndTrees(hasFruitTrees, setHasFruitTrees, "Fruit Trees", 3, "Fruit Trees" )}>
                                {hasFruitTrees ? "Remove fruit tree timer" : "Add fruit tree timer"}
                            </Button>
                        </Col>
                    </Space>
                </Row>

                <Row>
                    <Col>
                        Current timers:
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {error.exists && (
                            <Alert
                            message={error.message}
                            description={renderTimerErrorBlock(error)}
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
                                {timers.length === 0 && (!hasHoney && !hasFruitTrees) && (
                                    <p>None. Enjoy yer day</p>
                                    )}
                            </ul>
                        </Paragraph>
                    </Col>
                </Row>
            </Space>
        </>
    )
}

export default ArtisanTimer;