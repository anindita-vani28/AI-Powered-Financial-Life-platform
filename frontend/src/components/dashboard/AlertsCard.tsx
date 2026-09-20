'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { Alert } from '@/types';
import { alertService } from '@/services/alerts';
import Link from 'next/link';

const AlertsCard = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await alertService.getAlerts();
        setAlerts(data.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch alerts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const getIconByType = (type: string) => {
    switch (type) {
      case 'renewal':
        return <Clock className="text-yellow-600" size={16} />;
      case 'deadline':
        return <AlertCircle className="text-red-600" size={16} />;
      case 'opportunity':
        return <Zap className="text-green-600" size={16} />;
      default:
        return <CheckCircle className="text-blue-600" size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
        <Link href="/alerts" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </Link>
      </div>

      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${
                alert.priority === 'high'
                  ? 'bg-red-50 border-red-200'
                  : alert.priority === 'medium'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-blue-50 border-blue-200'
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIconByType(alert.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <CheckCircle className="mx-auto text-green-600 mb-2" size={32} />
          <p className="text-gray-600 text-sm">All caught up! No alerts right now.</p>
        </div>
      )}
    </div>
  );
};

export default AlertsCard;
