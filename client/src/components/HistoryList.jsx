import { FiClock } from 'react-icons/fi';

const HistoryList = ({ history, onSelect, darkMode, loading }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className={`mt-12 p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/80'} shadow-lg backdrop-blur-md`}>
      <div className="flex items-center mb-4">
        <FiClock size={24} className="mr-2" />
        <h3 className="text-xl font-semibold">Recent Searches</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item, index) => (
          <div
            key={index}
            onClick={() => !loading && onSelect(item.city)}
            className={`p-4 rounded-xl cursor-pointer transition-all ${darkMode ? 'hover:bg-gray-700/70' : 'hover:bg-blue-100/50'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{item.city}</h4>
              <span className={`text-sm px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                {Math.round(item.temperature)}°
              </span>
            </div>
            <p className="text-sm opacity-80 mt-1">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;