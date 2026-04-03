import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className={cn(
        "z-50 w-full max-w-lg scale-100 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg animate-in fade-in-0 mt-8 mb-8 overflow-y-auto max-h-[90vh]"
      )}>
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4 relative">
          <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0 -mt-2 -mr-2 h-8 w-8 rounded-full" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};
