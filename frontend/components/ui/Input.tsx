import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {label}
        </label>
      )}
      <input
        className={`w-full py-2 px-3 border border-black focus:outline-none focus:ring-2 focus:ring-black ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
