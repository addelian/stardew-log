import React, { useState, useEffect } from "react";
import { Row, Col, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { QUOTES } from "../data/quotes";

const FooterComponent = () => {

    const [quote, setQuote] = useState("");

    useEffect(() => {
        const quoteDuJour = renderQuote(QUOTES);
        setQuote(quoteDuJour);
    }, [])


    const renderQuote = quotes => {
        const getQuote = amountOfQuotes => {
            return Math.floor(Math.random() * amountOfQuotes);
        }
        return quotes[(getQuote(quotes.length))];
    }

    return (
        <Row justify="space-between">
            <Col>
                <Space>
                    Stardew Log created by Nic Addelia
                    <FontAwesomeIcon icon={faGithub} />
                    <a href="https://github.com/addelian" >@addelian</a>
                </Space>
            </Col>
            <Col>
                <em>{quote}</em>
            </Col>
        </Row>
    )
}

export default FooterComponent;