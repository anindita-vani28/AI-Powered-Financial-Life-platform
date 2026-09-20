'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthScoreTrend = () => {
  // Sample data - will be replaced with API data
  const data = [
    { month: 'Jan', score: 62 },
    { month: 'Feb', score: 66 },
    { month: 'Mar', score: 70 },
    { month: 'Apr', score: 72 },
    { month: 'May', score: 75 },
    { month: 'Jun', score: 78 },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Score Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f3f4f6',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value) => [`${value}/100`, 'Score']}
            labelStyle={{ color: '#6b7280' }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ fill: '#2563eb', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-600">Current</p>
          <p className="text-lg font-bold text-gray-900">78</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Previous</p>
          <p className="text-lg font-bold text-gray-900">75</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Change</p>
          <p className="text-lg font-bold text-green-600">+3</p>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreTrend;
