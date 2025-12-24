import React from 'react';

interface StepIndicatorProps {
  current: number;
  step: number;
  label: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ current, step, label }) => {
  const isCompleted = current > step;
  const isActive = current === step;
  
  return (
    <div className={`flex items-center ${isActive ? 'text-black' : isCompleted ? 'text-black' : 'text-gray-300'}`}>
      <div className="flex items-center relative">
        <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all z-10 ${
          isCompleted 
            ? 'border-black bg-black text-white' 
            : isActive 
            ? 'border-black bg-white text-black ring-4 ring-gray-100' 
            : 'border-gray-200 bg-white text-gray-300'
        }`}>
          {isCompleted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : step}
        </span>
        <span className={`ml-3 text-[10px] font-black uppercase tracking-widest hidden md:block ${isActive ? 'text-black' : 'text-gray-400'}`}>
          {label}
        </span>
      </div>
      
      {/* Connector Line */}
      {step < 3 && (
        <div className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-all duration-500 ${isCompleted ? 'bg-black' : 'bg-gray-100'}`} />
      )}
    </div>
  );
};

export default StepIndicator;
