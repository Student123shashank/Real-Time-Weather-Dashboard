import { useEffect, useState } from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import { FiDroplet, FiWind } from 'react-icons/fi';

const WeatherCard = ({ weather, darkMode, unit }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, [weather]);

  if (!weather) return null;

  const getWeatherIcon = () => {
    const size = 80;
    const condition = weather.condition.toLowerCase();
    
    if (condition.includes('rain')) return <WiRain size={size} className="text-blue-400" />;
    if (condition.includes('cloud')) return <WiCloudy size={size} className="text-gray-400" />;
    if (condition.includes('clear')) return <WiDaySunny size={size} className="text-yellow-400" />;
    if (condition.includes('snow')) return <WiSnow size={size} className="text-blue-200" />;
    if (condition.includes('thunder') || condition.includes('storm')) return <WiThunderstorm size={size} className="text-purple-400" />;
    if (condition.includes('fog') || condition.includes('mist')) return <WiFog size={size} className="text-gray-300" />;
    return <WiDaySunny size={size} className="text-yellow-400" />;
  };

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 shadow-xl backdrop-blur-md ${darkMode ? 'bg-gray-800/70 text-white' : 'bg-white/80 text-gray-900'} ${animate ? 'animate-pulse' : ''} transition-all duration-300`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">{weather.city}</h2>
          <p className="text-lg opacity-80">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
        <div className="text-right">
          <p className="text-xl capitalize">{weather.condition.toLowerCase()}</p>
          <p className="text-sm opacity-80">Humidity: {weather.humidity}%</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="text-6xl font-bold">
          {Math.round(weather.temperature)}{tempUnit}
        </div>
        <div className="text-6xl">
          {getWeatherIcon()}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className={`flex items-center p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-blue-100/50'}`}>
          <FiDroplet size={24} className="mr-3 text-blue-400" />
          <div>
            <p className="text-sm opacity-80">Humidity</p>
            <p className="text-xl font-semibold">{weather.humidity}%</p>
          </div>
        </div>
        
        <div className={`flex items-center p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-blue-100/50'}`}>
          <FiWind size={24} className="mr-3 text-blue-400" />
          <div>
            <p className="text-sm opacity-80">Wind Speed</p>
            <p className="text-xl font-semibold">{weather.windSpeed} {windUnit}</p>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-yellow-400/10 blur-xl"></div>
    </div>
  );
};

export default WeatherCard;