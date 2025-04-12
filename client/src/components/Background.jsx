import { useEffect, useState } from 'react';

const Background = ({ weatherCondition, darkMode }) => {
  const [backgroundClass, setBackgroundClass] = useState('');

  useEffect(() => {
    let base = darkMode ? 'from-gray-900 to-gray-800' : 'from-blue-100 to-blue-200';
    
    if (weatherCondition) {
      const condition = weatherCondition.toLowerCase();
      if (condition.includes('rain')) {
        base = darkMode ? 'from-gray-800 to-blue-900' : 'from-blue-300 to-blue-500';
      } else if (condition.includes('cloud')) {
        base = darkMode ? 'from-gray-700 to-gray-600' : 'from-gray-300 to-gray-400';
      } else if (condition.includes('clear')) {
        base = darkMode ? 'from-blue-900 to-indigo-900' : 'from-blue-400 to-blue-600';
      } else if (condition.includes('snow')) {
        base = darkMode ? 'from-blue-800 to-gray-300' : 'from-blue-200 to-gray-100';
      } else if (condition.includes('thunder') || condition.includes('storm')) {
        base = darkMode ? 'from-purple-900 to-gray-800' : 'from-purple-500 to-gray-600';
      }
    }

    setBackgroundClass(base);
  }, [weatherCondition, darkMode]);

  return (
    <div className={`fixed inset-0 -z-0 bg-gradient-to-br ${backgroundClass} transition-all duration-1000`}>
      {weatherCondition?.toLowerCase().includes('rain') && !darkMode && (
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-blue-400 rounded-full animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 0.5 + 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Background;