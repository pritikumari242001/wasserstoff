import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import search from "./assets/icons/search.svg";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";

function App() {
    // State to hold user input for city name
    const [input, setInput] = useState("");
    // State to manage the temperature unit (Celsius or Fahrenheit)
    const [unit, setUnit] = useState("C");
    // State to store weather data for the current day
    const [weather, setWeather] = useState({});
    // State to store weather data for multiple days
    const [values, setValues] = useState([]);
    // State to manage the currently searched city/place
    const [place, setPlace] = useState("Delhi");
    // State to store the location name returned by the API
    const [thisLocation, setLocation] = useState("");

    // Function to fetch weather data from the API
    const fetchWeather = async () => {
        // API request configuration
        const options = {
            method: "GET",
            url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
            params: {
                aggregateHours: "24", // Fetch 24-hour aggregated data
                location: place, // Location is based on the state "place"
                contentType: "json", // Response format
                unitGroup: "metric", // Use metric units by default
                shortColumnNames: 0, // Use full column names in response
            },
            headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_API_KEY, // API key from environment variables
                "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
            },
        };

        try {
            // Sending API request
            const response = await axios.request(options);
            console.log(response?.data);

            // Extracting the relevant weather data from the response
            const thisData = Object.values(response?.data?.locations)[0];
            setLocation(thisData?.address); // Set the location name
            setValues(thisData?.values); // Set the weather data for multiple days
            setWeather(thisData?.values[0]); // Set the weather data for the current day
        } catch (e) {
            console.error(e);
            alert("This place does not exist"); // Error handling for invalid locations
        }
    };

    // Fetch weather data when the "place" state changes
    useEffect(() => {
        fetchWeather();
    }, [place]);

    // Function to update the city name and fetch the weather data
    const submitCity = () => {
        setPlace(input); // Update the "place" state with user input
        setInput(""); // Clear the input field
    };

    // Function to toggle between Celsius and Fahrenheit units
    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
    };

    // Function to convert temperature from Celsius to Fahrenheit if needed
    const convertTemperature = (tempCelsius) => {
        return unit === "C" ? tempCelsius : (tempCelsius * 9) / 5 + 32;
    };

    return (
        <div className="w-full h-screen text-white px-8">
            {/* Header section with title and search bar */}
            <div className="w-full p-3 flex justify-between items-center">
                <h1 className="font-bold tracking-wide text-3xl">
                    Weather Forecast Dashboard
                </h1>
                <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
                    <img
                        src={search}
                        alt="search"
                        className="w-[1.5rem] h-[1.5rem]"
                    />
                    <input
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                submitCity(); // Fetch weather data when user presses "Enter"
                            }
                        }}
                        type="text"
                        placeholder="Search city"
                        className="focus:outline-none w-full text-[#212121] text-lg"
                        value={input}
                        onChange={(e) => setInput(e.target.value)} // Update input state as user types
                    />
                </div>
            </div>

            {/* Toggle switch for Celsius and Fahrenheit */}
            <div className="w-full flex justify-center mt-4">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={unit === "F"}
                        onChange={toggleUnit} // Toggle temperature unit
                    />
                    <div className="w-32 h-16 bg-gray-400 rounded-full flex items-center p-1 transition-colors duration-300 ease-in-out">
                        <div
                            className={`w-14 h-14 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                                unit === "F"
                                    ? "translate-x-16"
                                    : "translate-x-1"
                            }`}
                        ></div>
                        <span className="absolute left-3 text-lg font-medium text-gray-800">
                            °C
                        </span>
                        <span className="absolute right-3 text-lg font-medium text-gray-800">
                            °F
                        </span>
                    </div>
                </label>
            </div>

            {/* Background component that changes based on the weather */}
            <BackgroundLayout weather={weather} />

            {/* Main section with current weather and forecast */}
            <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
                {/* Weather card displaying current weather details */}
                <WeatherCard
                    place={thisLocation} // Display location
                    windspeed={weather.wspd} // Display wind speed
                    windDirection={weather.wdir} // Display wind direction
                    humidity={weather.humidity} // Display humidity
                    temperature={convertTemperature(weather.temp)} // Display temperature with conversion
                    iconString={weather.conditions} // Display weather icon
                    conditions={weather.conditions} // Display weather conditions
                    minTemperature={convertTemperature(weather.mint)} // Display min temperature
                    maxTemperature={convertTemperature(weather.maxt)} // Display max temperature
                    unit={unit} // Pass the current unit (C/F)
                />

                {/* Mini cards displaying forecast for upcoming days */}
                <div className="flex justify-center gap-8 flex-wrap w-[60%]">
                    {values?.slice(1, 6).map((curr) => {
                        return (
                            <MiniCard
                                key={curr.datetime} // Unique key for each forecast day
                                time={curr.datetime} // Display time
                                temp={convertTemperature(curr.temp)} // Display temperature with conversion
                                iconString={curr.conditions} // Display weather icon
                                date={curr.datetimeStr} // Display date
                                unit={unit} // Pass the current unit (C/F)
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default App;
