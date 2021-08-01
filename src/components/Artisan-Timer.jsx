import React, { useState } from "react";
import { Select, Button, Row, Col, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle, faAppleAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CROPS } from "../data/crops";

const ArtisanTimer = ({timers, setTimers, day, error, hasHoney, setHasHoney, hasFruitTrees, setHasFruitTrees}) => {

    const [selected, setSelected] = useState(undefined);

    const { Option } = Select;

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

    const renderOptions = crops => {

        const cropsToSort = crops.filter(crop => crop.kegProduct !== undefined || crop.jarProduct !== undefined);

        // ES6 alphabetical order
        const cropsEligibleForArtisanProducts = cropsToSort.sort((a, b) => a.name.localeCompare(b.name));
        
        return cropsEligibleForArtisanProducts.map(crop => 
            <Option key={`${crop.id}-artisan-option`} value={crop.id}>{crop.name}</Option>
        )
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
            </Space>
        </>
    )
}

export default ArtisanTimer;