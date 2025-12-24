import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  const paddingClass = noPadding ? '' : 'p-6';
  
  return (
    <div className={`bg-white border border-black ${paddingClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
