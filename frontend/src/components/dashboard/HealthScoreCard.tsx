'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { FinancialHealthScore } from '@/types';
import { healthScoreService } from '@/services/healthScore';

interface HealthScoreCardProps {
  onRefresh?: () => void;
}

const HealthScoreCard = ({ onRefresh }: HealthScoreCardProps) => {
  const [healthScore, setHealthScore] = useState<FinancialHealthScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthScore = async () => {
      try {
        const data = await healthScoreService.getHealthScore();
        setHealthScore(data);
      } catch (error) {
        console.error('Failed to fetch health score', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthScore();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4 w-1/3"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!healthScore) {
    return null;
  }

  const scorePercentage = healthScore.overallScore;
  const scoreColor =
    scorePercentage >= 80
      ? 'text-green-600'
      : scorePercentage >= 60
        ? 'text-yellow-600'
        : 'text-red-600';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Financial Health Score</h3>
          <p className="text-sm text-gray-500 mt-1">Overall financial wellness</p>
        </div>
        <TrendingUp className="text-blue-600" size={24} />
      </div>

      {/* Score circle */}
      <div className="flex items-center justify-center my-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(scorePercentage / 100) * 282.6} 282.6`}
              className={scoreColor}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${scoreColor}`}>{scorePercentage}</span>
            <span className="text-sm text-gray-500">/ 100</span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {[
          { label: 'Insurance', value: healthScore.breakdown.insurance.score },
          { label: 'Tax', value: healthScore.breakdown.tax.score },
          { label: 'Credit', value: healthScore.breakdown.credit.score },
          { label: 'Claims', value: healthScore.breakdown.claims.score },
        ].map((item) => (
          <div key={item.label} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">{item.label}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 w-8">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action button */}
      <button
        onClick={onRefresh}
        className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        View Detailed Report
      </button>
    </div>
  );
};

export default HealthScoreCard;
