
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', message }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`${sizeClasses[size]} border-black border-t-transparent rounded-full animate-spin`}
      />
      {message && (
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
