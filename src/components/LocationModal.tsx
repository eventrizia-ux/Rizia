import { useState, useEffect } from 'react';
import { X, Search, MapPin, Locate } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (city: string) => void;
}

const indianCities = [
  { name: 'Bengaluru', icon: '🏛️', state: 'Karnataka', popular: true },
  { name: 'Chennai', icon: '🏛️', state: 'Tamil Nadu', popular: true },
  { name: 'Coimbatore', icon: '🕐', state: 'Tamil Nadu', popular: true },
  { name: 'Hyderabad', icon: '🏛️', state: 'Telangana', popular: true },
  { name: 'Kochi', icon: '⛵', state: 'Kerala', popular: true },
  { name: 'Kolkata', icon: '🏛️', state: 'West Bengal', popular: true },
  { name: 'New Delhi', icon: '🏛️', state: 'Delhi', popular: true },
  { name: 'Mumbai', icon: '🏛️', state: 'Maharashtra', popular: true },
  { name: 'Pune', icon: '🏛️', state: 'Maharashtra', popular: true },
  { name: 'Ahmedabad', icon: '🏛️', state: 'Gujarat', popular: true },
  { name: 'Jaipur', icon: '🏛️', state: 'Rajasthan', popular: true },
  { name: 'Chandigarh', icon: '🏛️', state: 'Punjab', popular: true },
  { name: 'Lucknow', icon: '🏛️', state: 'Uttar Pradesh', popular: false },
  { name: 'Indore', icon: '🏛️', state: 'Madhya Pradesh', popular: false },
  { name: 'Bhopal', icon: '🏛️', state: 'Madhya Pradesh', popular: false },
  { name: 'Nagpur', icon: '🏛️', state: 'Maharashtra', popular: false },
  { name: 'Visakhapatnam', icon: '⛵', state: 'Andhra Pradesh', popular: false },
  { name: 'Vijayawada', icon: '🏛️', state: 'Andhra Pradesh', popular: false },
  { name: 'Surat', icon: '🏛️', state: 'Gujarat', popular: false },
  { name: 'Vadodara', icon: '🏛️', state: 'Gujarat', popular: false }
];

export function LocationModal({ isOpen, onClose, onSelectLocation }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = indianCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularCities = filteredCities.filter(city => city.popular);
  const otherCities = filteredCities.filter(city => !city.popular);

  const handleCitySelect = (cityName: string) => {
    onSelectLocation(cityName);
    onClose();
  };

  const handleDetectLocation = () => {
    // Simulate location detection - in real app, use geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode the coordinates
          // For now, default to Bengaluru
          handleCitySelect('Bengaluru');
        },
        (error) => {
          // Default to Bengaluru if location access is denied
          handleCitySelect('Bengaluru');
        }
      );
    } else {
      handleCitySelect('Bengaluru');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">Select Your City</h2>
              <p className="text-sm text-gray-600">Discover events happening near you</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for your city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              autoFocus
            />
            <button
              onClick={handleDetectLocation}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
              title="Detect my location"
            >
              <Locate size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {/* Popular Cities */}
          <div className="mb-8">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-red-500" />
              Popular Cities
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popularCities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleCitySelect(city.name)}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-red-50 transition-all group border border-transparent hover:border-red-200"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100 rounded-full text-3xl group-hover:scale-110 transition-transform">
                    {city.icon}
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-900 block">{city.name}</span>
                    <span className="text-xs text-gray-500">{city.state}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Other Cities */}
          {otherCities.length > 0 && (
            <div>
              <h3 className="text-gray-700 mb-4">Other Cities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {otherCities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleCitySelect(city.name)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-gray-200 hover:border-red-200"
                  >
                    <MapPin size={16} className="text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-900 block">{city.name}</span>
                      <span className="text-xs text-gray-500">{city.state}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredCities.length === 0 && (
            <div className="text-center py-12">
              <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No cities found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            Can't find your city? More cities coming soon! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}