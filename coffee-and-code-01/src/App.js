
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  // const apiKey = process.env.REACT_APP_API_KEY;
  const [icon, setIcon] = useState("http://openweathermap.org/img/w/10d.png")
  const [units, setUnits] = useState("imperial")

  function handleLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Can't get geolocation");
    }
  }

  function toggleUnit() {
    if (units === "imperial") {
      setUnits("metric");
    } else {
      setUnits("imperial");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude, units });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=${units}`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        // console.log("check: ", data.weather[0].icon);
        setIcon(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  function error() {
    console.log("Unable to get your location");
  }

  useEffect(() => {
    handleLocation()
  }, [units]);

  return (
    <div>
      <h1>Weather</h1>
      <button onClick={toggleUnit}>Toggle Units</button>
      {weather ? (
        <div>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp}</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img src={icon}/>
        </div>
      ) : null}
    </div>
  );
}

export default App;
