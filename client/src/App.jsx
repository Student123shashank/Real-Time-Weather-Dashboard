import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HistoryList from './components/HistoryList';
import Background from './components/Background';
import { FiSun, FiMoon, FiRefreshCw } from 'react-icons/fi';

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState('metric'); 

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather?city=${city}&units=${unit}`
      );
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather/history');
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const refreshWeather = () => {
    if (weather?.city) {
      fetchWeather(weather.city);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (weather?.city) {
      fetchWeather(weather.city);
    }
  };

  useEffect(() => {
    fetchHistory();
   
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, [weather]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900'}`}>
      <Background weatherCondition={weather?.condition} darkMode={darkMode} />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">WeatherSphere</h1>
          <div className="flex gap-4">
            <button
              onClick={toggleUnit}
              className={`px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} shadow-md transition-all`}
            >
              °{unit === 'metric' ? 'C' : 'F'}
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} shadow-md transition-all`}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </div>
        
        <SearchBar onSearch={fetchWeather} darkMode={darkMode} />
        
        <div className="flex justify-center mb-8">
          {loading ? (
            <div className="animate-pulse flex flex-col items-center">
              <div className={`h-64 w-80 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}></div>
            </div>
          ) : error ? (
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-red-900/50' : 'bg-red-100'} text-center max-w-md`}>
              <p>{error}</p>
            </div>
          ) : weather ? (
            <div className="relative group">
              <WeatherCard weather={weather} darkMode={darkMode} unit={unit} />
              <button
                onClick={refreshWeather}
                className={`absolute -top-3 -right-3 p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} shadow-lg transition-all opacity-0 group-hover:opacity-100`}
                aria-label="Refresh weather"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          ) : (
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/80'} text-center max-w-md`}>
              <h2 className="text-xl font-semibold mb-2">Welcome to WeatherSphere</h2>
              <p>Search for a city to see current weather conditions</p>
            </div>
          )}
        </div>
        
        <HistoryList 
          history={history} 
          onSelect={fetchWeather} 
          darkMode={darkMode} 
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;