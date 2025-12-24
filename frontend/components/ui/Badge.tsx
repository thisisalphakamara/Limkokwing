import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variantStyles = {
    default: 'border border-black',
    success: 'bg-black text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-gray-600 text-white'
  };

  return (
    <span className={`px-2 py-1 text-[10px] font-bold uppercase ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
