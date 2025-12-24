import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  children, 
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = 'font-bold uppercase tracking-widest transition-colors';
  
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-black text-black hover:bg-gray-100',
    danger: 'bg-gray-800 text-white hover:bg-black'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-6 py-2 text-xs',
    lg: 'px-8 py-3 text-xs'
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-30 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
