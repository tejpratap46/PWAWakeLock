import { useState, useEffect } from 'react';
import { Clock, Edit2, Check, X, Trash2, PlusCircle } from 'lucide-react';

export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [editableHours, setEditableHours] = useState(new Date().getHours());
  const [editableMinutes, setEditableMinutes] = useState(new Date().getMinutes());
  const [editableSeconds, setEditableSeconds] = useState(new Date().getSeconds());
  const [timeOffset, setTimeOffset] = useState(0);
  const [timezones, setTimezones] = useState([
    { id: 1, name: 'New York', timezone: 'America/New_York', color: 'bg-blue-100' },
    { id: 2, name: 'London', timezone: 'Europe/London', color: 'bg-green-100' },
    { id: 3, name: 'Tokyo', timezone: 'Asia/Tokyo', color: 'bg-amber-100' }
  ]);
  const [newCity, setNewCity] = useState('');
  const [newTimezone, setNewTimezone] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const colors = [
    'bg-blue-100', 'bg-green-100', 'bg-amber-100', 'bg-red-100', 
    'bg-purple-100', 'bg-teal-100', 'bg-pink-100', 'bg-cyan-100'
  ];
  
  useEffect(() => {
    // Only run the timer when not editing
    if (!isEditing) {
      const timer = setInterval(() => {
        setCurrentTime(new Date(Date.now() + timeOffset));
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isEditing, timeOffset]);
  
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };
  
  const formatTimeForTimezone = (timezone) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(currentTime);
    } catch (error) {
      return 'Invalid timezone';
    }
  };
  
  const formatDateForTimezone = (timezone) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(currentTime);
    } catch (error) {
      return '';
    }
  };
  
  const startEditing = () => {
    setIsEditing(true);
    setEditableHours(currentTime.getHours());
    setEditableMinutes(currentTime.getMinutes());
    setEditableSeconds(currentTime.getSeconds());
  };
  
  const saveTimeEdit = () => {
    // Create a new date with the edited time
    const newDate = new Date();
    newDate.setHours(editableHours);
    newDate.setMinutes(editableMinutes);
    newDate.setSeconds(editableSeconds);
    
    // Calculate the offset from current time
    const newOffset = newDate.getTime() - new Date().getTime();
    setTimeOffset(newOffset);
    
    // Update current time
    setCurrentTime(newDate);
    setIsEditing(false);
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
  };
  
  const addTimezone = () => {
    if (newCity && newTimezone) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setTimezones([
        ...timezones,
        {
          id: timezones.length + 1,
          name: newCity,
          timezone: newTimezone,
          color: randomColor
        }
      ]);
      setNewCity('');
      setNewTimezone('');
      setShowAddForm(false);
    }
  };
  
  const removeTimezone = (id) => {
    setTimezones(timezones.filter(tz => tz.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">World Clock</h1>
          <p className="text-gray-600">Track time zones around the world</p>
        </header>
        
        {/* Main Clock */}
        <div className="relative mb-16">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Current Time</h2>
            
            {isEditing ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={editableHours}
                    onChange={(e) => setEditableHours(parseInt(e.target.value))}
                    className="w-16 p-2 text-center text-2xl font-bold bg-gray-50 rounded-lg border border-gray-300"
                  />
                  <span className="text-2xl font-bold">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={editableMinutes}
                    onChange={(e) => setEditableMinutes(parseInt(e.target.value))}
                    className="w-16 p-2 text-center text-2xl font-bold bg-gray-50 rounded-lg border border-gray-300"
                  />
                  <span className="text-2xl font-bold">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={editableSeconds}
                    onChange={(e) => setEditableSeconds(parseInt(e.target.value))}
                    className="w-16 p-2 text-center text-2xl font-bold bg-gray-50 rounded-lg border border-gray-300"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={saveTimeEdit}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button
                    className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    onClick={cancelEdit}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="mb-2 text-gray-600">
                  {new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(currentTime)}
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-6">
                  {formatTime(currentTime)}
                </div>
                <button
                  onClick={startEditing}
                  className="flex items-center justify-center mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Time
                </button>
                {timeOffset !== 0 && (
                  <div className="mt-4 text-sm text-amber-600">
                    <em>Note: Time has been adjusted {timeOffset > 0 ? 'forward' : 'backward'}</em>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* World Clocks */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">World Time Zones</h2>
            <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Location
            </button>
          </div>
          
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="City Name"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Timezone (e.g., America/Chicago)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTimezone}
                  onChange={(e) => setNewTimezone(e.target.value)}
                />
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  onClick={addTimezone}
                >
                  Add
                </button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {timezones.map(tz => (
              <div key={tz.id} className={`${tz.color} rounded-lg shadow-md overflow-hidden`}>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{tz.name}</h3>
                    <button
                      onClick={() => removeTimezone(tz.id)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-600 text-sm mb-1">{tz.timezone}</div>
                  <div className="text-gray-600 text-sm">{formatDateForTimezone(tz.timezone)}</div>
                </div>
                <div className="bg-white p-4 flex justify-center items-center">
                  <div className="text-3xl font-bold font-mono text-gray-800">
                    {formatTimeForTimezone(tz.timezone)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}