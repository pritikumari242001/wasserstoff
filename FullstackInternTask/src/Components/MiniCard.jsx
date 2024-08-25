import React, { useEffect, useState } from "react";
// Import weather icons for different conditions
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";

// Function to return color and font styling based on the day of the week
const getDayColor = (day) => {
    switch (day) {
        case "Sunday":
            return "text-red-500 font-bold text-lg ";
        case "Monday":
            return "text-blue-500 font-semibold text-lg";
        case "Tuesday":
            return "text-green-500 font-bold text-lg";
        case "Wednesday":
            return "text-yellow-500 font-bold text-lg";
        case "Thursday":
            return "text-purple-500 font-bold text-lg";
        case "Friday":
            return "text-orange-500 font-bold text-lg";
        case "Saturday":
            return "text-teal-500 font-bold text-lg";
        default:
            return "text-gray-500 font-bold text-lg";
    }
};

// `MiniCard` component displays a small weather card with relevant details
const MiniCard = ({ time, temp, iconString, date, unit }) => {
    // State to store the icon corresponding to the weather condition
    const [icon, setIcon] = useState();

    // `useEffect` hook runs when `iconString` changes to update the icon
    useEffect(() => {
        if (iconString) {
            if (iconString.toLowerCase().includes("cloud")) {
                setIcon(cloud);
            } else if (iconString.toLowerCase().includes("rain")) {
                setIcon(rain);
            } else if (iconString.toLowerCase().includes("clear")) {
                setIcon(sun);
            } else if (iconString.toLowerCase().includes("thunder")) {
                setIcon(storm);
            } else if (iconString.toLowerCase().includes("fog")) {
                setIcon(fog);
            } else if (iconString.toLowerCase().includes("snow")) {
                setIcon(snow);
            } else if (iconString.toLowerCase().includes("wind")) {
                setIcon(wind);
            }
        }
    }, [iconString]); // Dependency array ensures this effect runs when `iconString` changes

    // Format the temperature to 2 decimal places or return "--" if not available
    const formatTemperature = (temp) => {
        return temp ? temp.toFixed(2) : "--";
    };

    // Get the day name (e.g., "Monday") from the provided time
    const dayName = new Date(time).toLocaleDateString("en-US", {
        weekday: "long",
    });

    return (
        <div className="glassCard w-[12rem] h-[12rem] p-4 flex flex-col items-center justify-between">
            {/* Display the day of the week with styling */}
            <p className={`text-center text-sm ${getDayColor(dayName)}`}>
                {dayName}
            </p>
            <hr className="w-full border-gray-300 my-2" />
            {/* Display the weather icon */}
            <div className="w-full flex justify-center items-center flex-1">
                <img
                    src={icon}
                    alt="forecast not available"
                    className="w-[4rem] h-[4rem]"
                />
            </div>
            {/* Display the temperature and date */}
            <div className="text-center">
                <p className="font-bold text-2xl">
                    {formatTemperature(temp)}&deg;{unit}
                </p>
                <p className="text-sm">{date?.slice(0, 10)}</p>
            </div>
        </div>
    );
};

export default MiniCard;
