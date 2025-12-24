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
    <div className={`flex items-center space-x-2 ${isActive ? 'text-black' : isCompleted ? 'text-black' : 'text-gray-300'}`}>
      <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[12px] font-bold transition-all ${
        isCompleted 
          ? 'border-black bg-black text-white' 
          : isActive 
          ? 'border-black bg-white text-black' 
          : 'border-gray-300 bg-white text-gray-300'
      }`}>
        {isCompleted ? '✓' : step}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline">{label}</span>
      {step < 3 && <span className={`w-8 h-[2px] mx-2 transition-all ${isCompleted ? 'bg-black' : 'bg-gray-200'}`}></span>}
    </div>
  );
};

export default StepIndicator;
