import React, { useState } from "react";
import { Layout } from "antd";
import Counter from "./Counter";
import ArtisanTimer from "./Artisan-Timer";
import FooterComponent from "./FooterComponent";

const Home = () => {

    const { Header, Footer, Content } = Layout;

    const [day, setDay] = useState(0);
    const [timers, setTimers] = useState([]);
    const [error, setError] = useState({exists: false, message: "Oh no!", description: "", triggers: []});
    const [hasHoney, setHasHoney] = useState(false);
    const [hasFruitTrees, setHasFruitTrees] = useState(false);

    return (
        <Layout>
            <Header>
                <Counter 
                    day={day}
                    setDay={setDay}
                    timers={timers}
                    setTimers={setTimers}
                    setError={setError}
                    setHasHoney={setHasHoney}
                    setHasFruitTrees={setHasFruitTrees}
                />
            </Header>
            <Content style={{padding: "30px 30px"}}>
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
            </Content>
            <Footer>
                <FooterComponent />
            </Footer>
        </Layout>
    )
}

export default Home;