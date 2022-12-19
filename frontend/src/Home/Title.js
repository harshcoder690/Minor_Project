import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Title.css';

const Title = () => {

    const divColor = ["#3f59a8dd","#f03e32dd","#4fdd76dd","#ffd657dd"];
    const shadow = ["#3f59a8","#f03e32","#4fdd76","#ffd657"];

    const [color, setColor] =  useState(0);
    const [flag, setFlag] = useState(true);
    const [buttonColor, setButtonColor] = useState("white");
    let variable=true;

    setInterval(() => {
        func();
        console.log(variable)
    },4000);

    const func = () => {
        if (variable) {
            variable=false;
            setFlag(!flag);
        }
    }

    useEffect(() => {
        setColor((color+1)%4);
        
    }, [flag]);

    useEffect(()=>{
        variable=true;
    },[color]);

    const navigate=useNavigate();

    return (
        <div className="title" style={{
            backgroundColor:divColor[color],
            boxShadow:`0 0 15px 5px ${shadow[color]}`
        }}>

            <div className="title-text text-center">
                <h1>Tinker Hunt</h1>

                <p>
                    Want to make your kid's learning exciting?
                    <br />
                    Pick a pencil and let them draw.
                </p>
                
                <button 
                    className="start-btn" 
                    onClick={() => {
                        navigate('/drawing');
                    }}
                    style={{color:buttonColor}}
                    onMouseOver={() => setButtonColor(shadow[color])}
                    onMouseOut={() => setButtonColor("white")}
                 >Get Started</button>
                
            </div>
        </div>
    );
};

export default Title;