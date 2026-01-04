import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend }) => {
  // Modified to use a cleaner, standardized card design typical of modern web applications (like Facebook/Meta design language)
  return (
    <div className="bg-white shadow-md rounded-xl p-4 transition-shadow duration-200 hover:shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      
      <div className="flex items-start justify-between">
        
        {/* Label and Value */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 uppercase tracking-wider">{label}</span>
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
        </div>

        {/* Icon Container (Using a standard Facebook Blue accent for consistency) */}
        <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Trend Indicator */}
      {trend && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold">
            <TrendingUp size={14} />
            <span>{trend}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;