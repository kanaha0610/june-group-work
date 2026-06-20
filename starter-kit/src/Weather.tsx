import React, { useState, useEffect } from 'react';
import { Sun, Cloud,CloudRain, CloudSnow } from 'lucide-react';

function Weather() {
    const [weather, setWeather] = useState<any>(null);

useEffect(() => {
  const fetchWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=YOUR_API_KEY&units=metric&lang=ja`
    );
    const data = await res.json();
    setWeather(data);
  };

  fetchWeather();
}, []);
const getIcon = (main:string) => {
  switch (main) {
    case "Clear":
      return <Sun className="text-yellow-500" />;
    case "Clouds":
      return <Cloud className="text-gray-500" />;
    case "Rain":
      return <CloudRain className="text-blue-500" />;
    case "Snow":
      return <CloudSnow className="text-sky-400" />;
    default:
      return <Cloud className="text-gray-400" />;
  }
};

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Weather Widget Placeholder */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
              {weather ? getIcon(weather.weather[0].main) : <Cloud className="text-gray-400" />}
              Weather
            </h2>
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold mb-1">
                {weather ? `${weather.main.temp}℃` : "Loading..."}
            </div>
            <p className="text-slate-500">
                {weather ? weather.weather[0].description : ""}
            </p>
          </div>
        </section>
      </main>
    );
}
export default Weather;