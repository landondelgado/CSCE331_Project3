import React, { useState, useEffect } from "react";

// hard-coded city so we never need geolocation permission
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=College%20Station,US&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`;

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // fetch once on mount, then every 30 min to stay fresh
    const fetchWeather = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Weather fetch failed");
        const data = await res.json();
        setWeather({
          temp: Math.round(data.main.temp),                     // °F
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          description: data.weather[0].main                     // “Clouds”, “Rain”… 
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
    const id = setInterval(fetchWeather, 30 * 60 * 1000);      // 30 min
    return () => clearInterval(id);
  }, []);

  if (!weather) return null;

  return (
    <div
      title={weather.description}
      className="flex items-center gap-1 bg-slate-600 py-2 px-3 rounded-full"
    >
      <img src={weather.icon} alt={weather.description} className="w-6 h-6" />
      <span className="text-white font-bold notranslate">
        {weather.temp}&deg;F
      </span>
    </div>
  );
}
