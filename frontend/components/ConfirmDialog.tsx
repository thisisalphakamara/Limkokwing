
import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'default' | 'danger';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-2 border-black w-full max-w-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-in fade-in">
        <div className="p-6 border-b border-black">
          <h3 className="text-lg font-black uppercase tracking-tight">{title}</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <div className="p-4 bg-gray-50 border-t border-black flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-black text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
              variant === 'danger'
                ? 'bg-gray-800 text-white hover:bg-black'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
