import React, { useEffect, useState } from "react";
import { results } from "../data/results";
import "./ResultModal.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ResultModal = ({setModal, index}) => {

    const [ result, setResult ] = useState(undefined);
    const [ error, setError ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500
      };

    const words = ["apple", "bicycle", "bird", "car", "cat", "crocodile", "elephant", "fish", "flower", "ice cream"]

    const fetchData = () => {

        // setTimeout(() => {

            console.log(index,words[index]);

            const word="cat";

            const data = results.find((result) => word.toLowerCase()===result.title.toLowerCase());

            setLoading(false);
            
            console.log(data);
            setResult(data);
            
        // }, 5000);
    }

    useEffect(() => {
        if (index > -1) {
            fetchData();
        } 
    }, [index]);

    const closeModal = () => {
        setModal(false);
    }

    const voicer = () => {
        const audio=document.getElementById("audio")
        audio.setAttribute('src', `http://api.voicerss.org/?key=${process.env.REACT_APP_VOICER_API_KEY}&hl=en-us&src=${result.description}`);
        audio.play();
    }

    
    return (
        <div className="result-modal">

            <img src="./images/close.png" className="close-button" onClick={closeModal} />

            {loading && <img srcSet="./images/loading-results.gif" className="loading-result d-block mx-auto" />}
            {
                result && 
                <div className="results d-flex flex-column justify-content-center text-center align-items-center">
                    
                    <h1 className="result-title">{result.title}</h1>
                    <h3 className="result-type">{result.type}</h3>

                    <img srcSet="./images/audio.png" className="audio-icon" onClick={voicer} />

                    <audio id="audio" src="" controls hidden></audio>

                    <p className="result-description">
                        {result.description}
                    </p>

                    <div className="result-images">

                    <Slider {...settings}>

                        {
                            result.headerImages.map((image, index) => (
                                <img key={index} srcSet={image.image} alt="" />
                            ))
                        }

                    </Slider>

                    </div>

                    <a href={result.google} target="_blank" rel="noopener noreferrer" className="read-more">Read More &#8594;</a>
                </div>
            }
        </div>
    );
};

export default ResultModal;