import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {label}
        </label>
      )}
      <textarea
        className={`w-full p-3 border border-black text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
