import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, className = '' }) => {
  return (
    <div className={`bg-white p-6 border border-black ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
};

export default StatCard;
