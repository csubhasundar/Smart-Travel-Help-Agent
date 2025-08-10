import React, { useState } from "react";

const API_KEY = "cd826a3f6254822b1a85298e1135009f";

export default function WeatherSafety() {
  const [searchCity, setSearchCity] = useState("");
  const [cityWeather, setCityWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!searchCity) return;
    setLoading(true);
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      if (!weatherRes.ok) throw new Error("City not found");
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      if (!forecastRes.ok) throw new Error("Forecast not found");
      const forecastData = await forecastRes.json();

      const processedForecast = (forecastData.list || [])
        .slice(0, 5)
        .map((item) => ({
          time: item.dt_txt.split(" ")[1].slice(0, 5),
          temp: Math.round(item.main.temp),
        }));

      setCityWeather({
        city: `${weatherData.name}, ${weatherData.sys.country}`,
        condition: weatherData.weather[0].description,
        temp: Math.round(weatherData.main.temp),
        highlights: {
          "Feels Like": `${Math.round(weatherData.main.feels_like)}°C`,
          Cloud: `${weatherData.clouds.all}%`,
          Rain:
            weatherData.rain?.["1h"] || weatherData.rain?.["3h"]
              ? `${weatherData.rain["1h"] || weatherData.rain["3h"]} mm`
              : "0 mm",
          Humidity: `${weatherData.main.humidity}%`,
          UV: "-",
          "Wind Speed": `${weatherData.wind.speed} m/s`,
        },
      });
      setForecast(processedForecast);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="weather-container">
      <style>{`
        .weather-container {
          max-width: 900px;
          margin: auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .search-box {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .search-box input {
          flex: 1;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }
        .search-box button {
          padding: 12px 20px;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }
        .weather-card {
          background: white;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .city-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #f6d365, #fda085);
          padding: 20px;
          border-radius: 12px;
          color: white;
        }
        .city-header h1 {
          font-size: 48px;
          margin: 0;
        }
        .condition {
          font-size: 16px;
          opacity: 0.8;
        }
        .section-title {
          margin-top: 20px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .highlights {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 10px;
        }
        .highlight-card {
          background: #f5f5f5;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
        }
        .highlight-title {
          font-size: 14px;
          color: #666;
        }
        .highlight-value {
          font-size: 18px;
          font-weight: bold;
        }
        .forecast {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .forecast-card {
          flex: 1;
          background: #e3f2fd;
          border-radius: 8px;
          text-align: center;
          padding: 10px;
        }
        .loading {
          text-align: center;
          font-size: 18px;
        }
      `}</style>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {cityWeather && (
        <div className="weather-card">
          {/* City Info */}
          <div className="city-header">
            <div>
              <h2>{cityWeather.city}</h2>
              <p className="condition">{cityWeather.condition}</p>
            </div>
            <h1>{cityWeather.temp}°C</h1>
          </div>

          {/* Highlights */}
          <h3 className="section-title">Today's Highlights</h3>
          <div className="highlights">
            {Object.entries(cityWeather.highlights).map(([key, value]) => (
              <div className="highlight-card" key={key}>
                <p className="highlight-title">{key}</p>
                <p className="highlight-value">{value}</p>
              </div>
            ))}
          </div>

          {/* Forecast */}
          <h3 className="section-title">Today Temperature Prediction</h3>
          <div className="forecast">
            {forecast.map((f, i) => (
              <div className="forecast-card" key={i}>
                <p>{f.time}</p>
                <h4>{f.temp}°C</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
