import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import Counter from "./Counter";
import ArtisanTimer from "./Artisan-Timer";
import FooterComponent from "./FooterComponent";

const Home = () => {

    const { Header, Footer, Content } = Layout;

    const [day, setDay] = useState(0);
    const [timers, setTimers] = useState([]);
    const [timerError, setTimerError] = useState({exists: false, message: "Oh no!", description: "", triggers: []});

    return (
        <Layout>
            <Header>
                <Counter day={day} setDay={setDay} timers={timers} setTimers={setTimers} setTimerError={setTimerError}/>
            </Header>
            <Content style={{padding: "30px 30px"}}>
                <ArtisanTimer day={day} timers={timers} setTimers={setTimers} timerError={timerError} setTimerError={setTimerError}/>
            </Content>
            <Footer>
                <FooterComponent />
            </Footer>
        </Layout>
    )
}

export default Home;