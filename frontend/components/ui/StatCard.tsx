import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, className = '', icon }) => {
  return (
    <div className={`bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
          {label}
        </p>
        {icon && (
          <div className="text-gray-400 group-hover:text-black group-hover:scale-110 transition-all duration-300 bg-gray-50 p-2 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{value}</p>
    </div>
  );
};

export default StatCard;
