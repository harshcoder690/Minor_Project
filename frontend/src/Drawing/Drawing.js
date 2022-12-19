import React, { useState } from "react";
import ResultModal from "./ResultModal";
import Whiteboard from "./Whiteboard";
import "./Drawing.css";

const Drawing = () => {

    const [modal, setModal] = useState(false);
    const [index, setIndex] = useState(-1);

    return (
        <div className="drawing-page">
            {modal && <div className="overlay"></div>}
            {/* <h1>Drawing</h1> */}
            <Whiteboard setModal={setModal} setIndex={setIndex} modal={modal} />
            {modal && <ResultModal setModal={setModal} index={index} />}
        </div>
    );
};

export default Drawing;