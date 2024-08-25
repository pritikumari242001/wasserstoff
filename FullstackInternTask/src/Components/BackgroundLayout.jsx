import React, { useEffect, useState } from "react";

// Importing weather background images
import Clear from "../assets/images/Clear.jpg";
import Fog from "../assets/images/fog.png";
import Cloudy from "../assets/images/Cloudy.jpg";
import Rainy from "../assets/images/Rainy.jpg";
import Snow from "../assets/images/snow.jpg";
import Stormy from "../assets/images/Stormy.jpg";

// `BackgroundLayout` component dynamically sets the background image
// based on the current weather conditions passed as a prop
const BackgroundLayout = ({ weather }) => {
    // State to store the current background image, defaulting to 'Clear'
    const [image, setImage] = useState(Clear);

    // `useEffect` hook runs whenever `weather.conditions` changes
    useEffect(() => {
        if (weather.conditions) {
            // Store weather condition string in a local variable
            let imageString = weather.conditions;

            // Set the background image based on the weather condition
            if (imageString.toLowerCase().includes("clear")) {
                setImage(Clear);
            } else if (imageString.toLowerCase().includes("cloud")) {
                setImage(Cloudy);
            } else if (
                imageString.toLowerCase().includes("rain") ||
                imageString.toLowerCase().includes("shower")
            ) {
                setImage(Rainy);
            } else if (imageString.toLowerCase().includes("snow")) {
                setImage(Snow);
            } else if (imageString.toLowerCase().includes("fog")) {
                setImage(Fog);
            } else if (
                imageString.toLowerCase().includes("thunder") ||
                imageString.toLowerCase().includes("storm")
            ) {
                setImage(Stormy);
            }
        }
    }, [weather]); // Dependency array ensures this effect runs when `weather` changes

    // Render the background image covering the entire screen
    return (
        <img
            src={image}
            alt="weather_image"
            className="h-screen w-full fixed left-0 top-0 -z-[10]" // Styling to make the image cover the background
        />
    );
};

export default BackgroundLayout;
