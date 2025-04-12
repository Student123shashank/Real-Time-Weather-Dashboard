import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch, darkMode }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-8 max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for a city..."
          className={`w-full p-4 pr-12 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        <button
          type="submit"
          className="absolute right-3 top-3 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <FiSearch size={20} />
        </button>
        {city && (
          <button
            type="button"
            onClick={() => setCity('')}
            className="absolute right-14 top-3 p-2 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute z-10 w-full mt-2 rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-3 hover:${darkMode ? 'bg-gray-600' : 'bg-gray-100'} cursor-pointer transition-colors`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;