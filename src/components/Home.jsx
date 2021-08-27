import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import Counter from "./Counter";
import ArtisanTimer from "./Artisan-Timer";
import FooterComponent from "./FooterComponent";
import HarvestTimer from "./Harvest-Timer";
import CurrentTimers from "./Current-Timers";

const Home = () => {

    // TODO: "Create Custom Timer" component? Might be nice as a catch-all instead of building out 
    // a bunch of exceptions for things like growing fruit trees for the first time. Just have to
    // pass along all of the required parameters in inputs. Definitely want to hide this when not in use, 
    // will contribute to a ton of clutter down the road if not

    const { Header, Footer, Content } = Layout;

    const [day, setDay] = useState(0);
    const [timers, setTimers] = useState([]);
    const [error, setError] = useState({exists: false, message: "Oh no!", description: "", triggers: []});
    const [hasHoney, setHasHoney] = useState(false);
    const [hasFruitTrees, setHasFruitTrees] = useState(false);

    // Loads local storage on componentDidMount
    useEffect(() => {
        setDay(JSON.parse(window.localStorage.getItem('day')));
        setTimers(JSON.parse(window.localStorage.getItem('timers')));
        setHasHoney(JSON.parse(window.localStorage.getItem('hasHoney')));
        setHasFruitTrees(JSON.parse(window.localStorage.getItem('hasFruitTrees')));
    }, []);

    // Basic save functionality
    useEffect(() => {
        window.localStorage.setItem('day', day);
    }, [day]);
    useEffect(() => {
        window.localStorage.setItem('timers', JSON.stringify(timers));
    }, [timers]);
    useEffect(() => {
        window.localStorage.setItem('hasHoney', hasHoney);
    }, [hasHoney]);
    useEffect(() => {
        window.localStorage.setItem('hasFruitTrees', hasFruitTrees);
    }, [hasFruitTrees]);

    return (
        <Layout>
            <Header>
                <Counter 
                    day={day}
                    setDay={setDay}
                    timers={timers}
                    setTimers={setTimers}
                    setError={setError}
                    hasHoney={hasHoney}
                    setHasHoney={setHasHoney}
                    hasFruitTrees={hasFruitTrees}
                    setHasFruitTrees={setHasFruitTrees}
                />
            </Header>
            <Content style={{padding: "30px 30px"}}>
                <Row justify="space-around">
                    <Col>
                        <ArtisanTimer 
                            day={day}
                            timers={timers}
                            setTimers={setTimers}
                            error={error}
                            setError={setError}
                            hasHoney={hasHoney}
                            setHasHoney={setHasHoney}
                            hasFruitTrees={hasFruitTrees}
                            setHasFruitTrees={setHasFruitTrees}
                            />
                    </Col>
                    <Col>
                        <HarvestTimer
                            day={day}
                            timers={timers}
                            setTimers={setTimers}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <h2>Current timers:</h2>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <CurrentTimers
                            day={day}
                            error={error}
                            timers={timers}
                            hasHoney={hasHoney}
                            hasFruitTrees={hasFruitTrees}
                        />
                    </Col>
                </Row>
            </Content>
            <Footer>
                <FooterComponent />
            </Footer>
        </Layout>
    )
}

export default Home;