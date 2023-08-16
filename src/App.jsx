import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './components/Card';
import LoaderPage from './components/Loader';

import {
  Cloud,
  Droplet,
  GaugeCircle,
  Haze,
  Locate,
  MapPin,
  SunDim,
  SunMedium,
  Sunrise,
  Sunset,
  Thermometer,
  ThermometerSun,
  View,
  Wind,
} from 'lucide-react';

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('bhubaneswar, odisha, india'); // Change to the desired city name

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };

  const fetchWeatherData = (cityName) => {
    setLoading(true);

    const apiKey = import.meta.env.VITE_API_KEY;

    // First, fetch the city's latitude and longitude
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          // Then, fetch weather data using the latitude and longitude
          return axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
          );
        } else {
          throw new Error('City not found.');
        }
      })
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch weather data for the bhubaneswar city by default
    fetchWeatherData(city);
  }, []);

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };
  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center">WeatherCast</h1>
        <form action="" className="formContainer">
          <input
            type="text"
            placeholder="Search: Bhubaneswar, Odisha, India"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
          <p className="note">* Enter City name, state and country. </p>
        </form>
        {loading ? (
          <LoaderPage />
        ) : (
          <section className="detailsContainer">
            <Card
              icon={<Locate />}
              description={' current location'}
              largeText={`${weatherData.name},${weatherData.sys.country}`}
            />
            <Card
              icon={<Sunrise />}
              description={'Sunrise'}
              largeText={convertTimestampToTime(weatherData.sys.sunrise)}
            />
            <Card
              icon={<Sunset />}
              description={'Sunset'}
              largeText={convertTimestampToTime(weatherData.sys.sunset)}
            />
            <Card
              icon={<Thermometer />}
              description={'Temprature'}
              largeText={`${convertKelvinToCelsius(weatherData.main.temp)} °C`}
            />
            <Card
              icon={<ThermometerSun />}
              description={'Feels Like'}
              largeText={`${convertKelvinToCelsius(
                weatherData.main.feels_like
              )} °C`}
            />
            <Card
              icon={<Droplet />}
              description={'Humidity'}
              largeText={`${weatherData.main.humidity}%`}
            />
            <Card
              icon={<Wind />}
              description={'Wind Speed'}
              largeText={`${weatherData.wind.speed} m/s`}
            />
            <Card
              icon={<Wind />}
              description={'Wind Direction'}
              largeText={`${weatherData.wind.deg}°`}
            />
            <Card
              icon={<Cloud />}
              description={'Cloudiness'}
              largeText={`${weatherData.clouds.all}%`}
            />
            <Card
              icon={<GaugeCircle />}
              description={'Pressure'}
              largeText={`${weatherData.main.pressure} hPa`}
            />
            <Card
              icon={<View />}
              description={'Visibility'}
              largeText={`${weatherData.visibility / 1000} km`}
            />
            <Card
              icon={<MapPin />}
              description={'Latitude'}
              largeText={`${weatherData.coord.lat}°`}
            />
            <Card
              icon={<MapPin />}
              description={'Longitude'}
              largeText={`${weatherData.coord.lon}°`}
            />
            <Card
              icon={<SunDim />}
              description={'Minimum Temperature'}
              largeText={`${convertKelvinToCelsius(
                weatherData.main.temp_min
              )} °C`}
            />
            <Card
              icon={<SunMedium />}
              description={'Maximum Temperature'}
              largeText={`${convertKelvinToCelsius(
                weatherData.main.temp_max
              )} °C`}
            />
            <Card
              icon={<Haze />}
              description={'Weather'}
              largeText={`${weatherData.weather[0].description}`}
            />
          </section>
        )}
      </div>
    </>
  );
};

export default App;
