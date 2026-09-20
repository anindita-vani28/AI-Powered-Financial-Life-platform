'use client';

import { useEffect } from 'react';
import { TrendingUp, FileText, AlertCircle, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import HealthScoreCard from '@/components/dashboard/HealthScoreCard';
import AlertsCard from '@/components/dashboard/AlertsCard';
import DocumentsCard from '@/components/dashboard/DocumentsCard';
import StatsCard from '@/components/dashboard/StatsCard';
import HealthScoreTrend from '@/components/dashboard/HealthScoreTrend';

export default function Dashboard() {
  useEffect(() => {
    // You can fetch dashboard data here when API is ready
  }, []);

  return (
    <Layout>
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-2">Here's your financial life overview</p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Health Score"
          value="78"
          subtitle="Up from 75 last month"
          icon={TrendingUp}
          color="blue"
          trend={{ value: 4, isPositive: true }}
        />
        <StatsCard
          title="Documents"
          value="24"
          subtitle="All organized"
          icon={FileText}
          color="green"
        />
        <StatsCard
          title="Active Alerts"
          value="5"
          subtitle="3 need action"
          icon={AlertCircle}
          color="yellow"
        />
        <StatsCard
          title="Family Members"
          value="3"
          subtitle="Including you"
          icon={Users}
          color="purple"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left column - Health score */}
        <div className="lg:col-span-1">
          <HealthScoreCard />
        </div>

        {/* Right column - Alerts and Documents */}
        <div className="lg:col-span-2 space-y-6">
          <AlertsCard />
          <DocumentsCard />
        </div>
      </div>

      {/* Health score trend */}
      <div className="mb-8">
        <HealthScoreTrend />
      </div>

      {/* Opportunities section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Opportunities to Improve
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Add Disability Insurance',
              description: 'Protects your income if you can\'t work. Recommended.',
              impact: 'Improves score by +8',
              priority: 'high',
            },
            {
              title: 'File Missing Tax Deduction',
              description: 'Home office deduction for $1,800 tax savings.',
              impact: 'Save $450 in taxes',
              priority: 'high',
            },
            {
              title: 'Update Beneficiary Designations',
              description: 'Last updated 3 years ago. Review to ensure current.',
              impact: 'Protects your family',
              priority: 'medium',
            },
            {
              title: 'Review Insurance Coverage',
              description: 'Life insurance may be under-coverage. Get quote.',
              impact: 'Peace of mind',
              priority: 'medium',
            },
          ].map((opp, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-l-4 ${
                opp.priority === 'high'
                  ? 'bg-red-50 border-red-500'
                  : 'bg-yellow-50 border-yellow-500'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-sm">{opp.title}</h4>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    opp.priority === 'high'
                      ? 'bg-red-200 text-red-700'
                      : 'bg-yellow-200 text-yellow-700'
                  }`}
                >
                  {opp.priority === 'high' ? 'High' : 'Medium'} Priority
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{opp.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{opp.impact}</span>
                <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
