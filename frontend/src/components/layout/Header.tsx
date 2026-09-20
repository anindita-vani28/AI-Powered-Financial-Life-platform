'use client';

import { Bell, Search, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert } from '@/types';
import { alertService } from '@/services/alerts';

const Header = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await alertService.getAlerts(true);
        setAlerts(data);
      } catch (error) {
        console.error('Failed to fetch alerts', error);
      }
    };

    fetchAlerts();
  }, []);

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search documents, alerts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6 ml-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                {alerts.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {alerts.slice(0, 5).map((alert) => (
                      <div
                        key={alert.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 mt-2 rounded-full ${
                              alert.priority === 'high'
                                ? 'bg-red-500'
                                : alert.priority === 'medium'
                                  ? 'bg-yellow-500'
                                  : 'bg-blue-500'
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900">
                              {alert.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {alert.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-sm">No notifications</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
