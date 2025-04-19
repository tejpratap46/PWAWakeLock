import { useState, useEffect } from 'react';
import { Clock, Edit2, Check, X, Trash2, PlusCircle, Moon, Sun } from 'lucide-react';
import TimePicker from '@/components/utils/TimePicker'
import { useTheme } from 'next-themes';

export default function WorldClock() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [editableTime, setEditableTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [timeOffset, setTimeOffset] = useState(0);
  const [timezones, setTimezones] = useState([
    { id: 1, name: 'New York', timezone: 'America/New_York', color: 'bg-blue-100 dark:bg-blue-800' },
    { id: 2, name: 'Paris', timezone: 'Europe/Paris', color: 'bg-green-100 dark:bg-green-800' },
    { id: 3, name: 'Tokyo', timezone: 'Asia/Tokyo', color: 'bg-amber-100 dark:bg-amber-800' }
  ]);
  const [newCity, setNewCity] = useState('');
  const [newTimezone, setNewTimezone] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const colors = [
    'bg-blue-100 dark:bg-blue-800',
    'bg-green-100 dark:bg-green-800',
    'bg-amber-100 dark:bg-amber-800',
    'bg-red-100 dark:bg-red-800',
    'bg-purple-100 dark:bg-purple-800',
    'bg-teal-100 dark:bg-teal-800',
    'bg-pink-100 dark:bg-pink-800',
    'bg-cyan-100 dark:bg-cyan-800'
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Only run the timer when not editing
    if (!isEditing) {
      const timer = setInterval(() => {
        setCurrentTime(new Date(Date.now() + timeOffset));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isEditing, timeOffset]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatTimeForTimezone = (timezone: string) => {
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

  const formatDateForTimezone = (timezone: string) => {
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
  };

  const saveTimeEdit = () => {
    // Create a new date with the edited time

    // Calculate the offset from current time
    const newOffset = editableTime.getTime() - new Date().getTime();
    setTimeOffset(newOffset);

    // Update current time
    setCurrentTime(editableTime);
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

  const removeTimezone = (id: number) => {
    setTimezones(timezones.filter(tz => tz.id !== id));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12 relative">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="absolute right-0 top-0 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">World Clock</h1>
          <p className="text-gray-600 dark:text-gray-400">Track time zones around the world</p>
        </header>

        {/* Main Clock */}
        <div className="relative mb-16">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Your Current Time</h2>

            {isEditing ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <TimePicker
                    value={editableTime}
                    onChange={(e) => setEditableTime(e)}
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    onClick={saveTimeEdit}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button
                    className="flex items-center bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                    onClick={cancelEdit}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="mb-2 text-gray-600 dark:text-gray-400">
                  {new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(currentTime)}
                </div>
                <div className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  {formatTime(currentTime)}
                </div>
                <button
                  onClick={startEditing}
                  className="flex items-center justify-center mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Time
                </button>
                {timeOffset !== 0 && (
                  <div className="mt-4 text-sm text-amber-600 dark:text-amber-400">
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">World Time Zones</h2>
            <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Location
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="City Name"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Timezone (e.g., America/Chicago)"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  value={newTimezone}
                  onChange={(e) => setNewTimezone(e.target.value)}
                />
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={addTimezone}
                >
                  Add
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {timezones.map(tz => (
              <div key={tz.id} className={`${tz.color} rounded-lg shadow-md overflow-hidden transition-colors duration-200`}>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{tz.name}</h3>
                    <button
                      onClick={() => removeTimezone(tz.id)}
                      className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">{tz.timezone}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{formatDateForTimezone(tz.timezone)}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 flex justify-center items-center transition-colors duration-200">
                  <div className="text-3xl font-bold font-mono text-gray-800 dark:text-gray-100">
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

// Add mounted state to prevent hydration mismatch with theme
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
