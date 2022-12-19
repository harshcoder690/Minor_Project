import React from "react";
import Background from "./Background";
import './Home.css';
import Title from "./Title";

const Home = () => {
    return (
        <div id="home">
            <div className="d-flex">
                <Background />
                <Title />
            </div>
        </div>
    );
};

export default Home;