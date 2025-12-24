import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = '3xl'
}) => {
  if (!isOpen) return null;

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl'
  }[maxWidth];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`bg-white border-2 border-black w-full ${maxWidthClass} my-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
        <div className="p-6 border-b border-black flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {children}
        </div>
        
        {footer && (
          <div className="p-6 border-t border-black bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
