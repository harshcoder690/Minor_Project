import React, { useEffect, useState } from "react";
import './Whiteboard.css';
import axios from "axios";

const Whiteboard = ({ setModal, setIndex, modal }) => {

    let canvas;
    let ctx;

    const [pallette, setPallette] = useState(false);

    useEffect(() => {

        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');

        canvas.style.cursor = `url("./images/white-chalk-cursor.png") 0 50, auto`;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        console.log(canvas)

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishPosition);
        canvas.addEventListener('mouseout', finishPosition);
        canvas.addEventListener('mousemove', draw);

        // document.getElementById('pencil-width').addEventListener('change', changePencilWidth);
        // document.getElementById('color-pallette').addEventListener('change', changeColorFromPallette);
        document.getElementById('delete-canvas').addEventListener('click', deleteCanvas);
        document.getElementById('search-canvas').addEventListener('click', searchCanvas);
    }, [modal]);

    let pencilColor = 'whitesmoke';
    let pencilWidth = 5;

    let painting = false;
    let lastX = 0;
    let lastY = 0;

    const startPosition = (e) => {
        painting = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    }

    const finishPosition = (e) => {
        painting = false;
    }

    const changeColor = (color) => {

        pencilColor = color;

        if (color === '#3f3f3f') {
            pencilWidth = 15;
            canvas.style.cursor = `url("./images/eraser-cursor.png") 0 50, auto`;
        } else {
            pencilWidth = 5;
            if (color === 'whitesmoke') canvas.style.cursor = `url("./images/white-chalk-cursor.png") 0 50, auto`;
            else if (color === '#fecd1a') canvas.style.cursor = `url("./images/yellow-chalk-cursor.png") 5 45, auto`;
            else canvas.style.cursor = `url("./images/blue-chalk-cursor.png") 5 45, auto`;
        }
    }

    const draw = (e) => {

        if (!painting) return;

        ctx.strokeStyle = pencilColor;
        ctx.lineWidth = pencilWidth;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }

    const deleteCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const searchCanvas = () => {

        ctx.globalCompositeOperation = 'difference';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // const im = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        // var link = document.createElement('a');
        // link.download = "my-image.png";
        // link.href = im;
        // link.click();

        const image = canvas.toDataURL();
        setModal(true);

        axios.post("http://localhost:5000/api/doodle/", {image}).then((res) => {
            const myObject = JSON.parse(res.data);
            console.log(myObject);

            let ans = 0;

            myObject.forEach((obj, index) => {
                if (obj > myObject[ans]) {
                    ans = index;
                }
            });

            setIndex(ans);
        }).catch((error) => {
            console.log(error);
            setModal(false);
        });
    }

    const togglePallette = () => {
        setPallette(!pallette);
    }

    return (
        <div>
            <canvas id='canvas'></canvas>

            <div className="white-board-icons d-flex flex-row flex-wrap justify-content-around">

                <img srcSet="./images/white-chalk.png" alt="" onClick={() => changeColor('whitesmoke')} />
                <img srcSet="./images/yellow-chalk.png" alt="" onClick={() => changeColor('#fecd1a')} />
                <img srcSet="./images/blue-chalk.png" alt="" onClick={() => changeColor('#6ed1d3')} />
                {/* <img srcSet="./images/brush.png" alt="" id="color-canvas" onClick={togglePallette} /> */}
                <img srcSet="./images/eraser.png" alt="" onClick={() => changeColor('#3f3f3f')} />
                <img srcSet="./images/dustbin.png" alt="" id="delete-canvas" />
                <img srcSet="./images/search.png" alt="" id="search-canvas" />

            </div>

            {/* {
                pallette &&  */}

            {/* <div className="colors-pallette flex-row flex-wrap justify-content-center" style={{display:pallette?"flex":"none"}}>
                    {
                        colors.map((color,index) => (
                            <div  key={index} className="color" style={{backgroundColor: color}} id={color} onClick={() => changeColor(color)}></div>
                        ))
                    }
                </div> */}
            {/* } */}
        </div>
    );
};

export default Whiteboard;