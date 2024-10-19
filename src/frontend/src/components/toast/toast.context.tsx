import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast, { ToastType, ToastPosition } from './toast.component';

interface ToastContextType {
    showToast: (message: string, type?: ToastType, position?: ToastPosition) => void;
  }
  
  const ToastContext = createContext<ToastContextType | undefined>(undefined);
  
  export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
  };
  
  interface ToastProviderProps {
    children: ReactNode;
  }
  
  export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<{ message: string; type: ToastType; position: ToastPosition } | null>(null);
  
    const showToast = (
      message: string,
      type: ToastType = 'success',
      position: ToastPosition = 'bottom-right'
    ) => {
      setToast({ message, type, position });
      setTimeout(() => setToast(null), 3000);
    };
  
    return (
      <ToastContext.Provider value={{ showToast }}>
        {children}
        {toast && <Toast {...toast} />}
      </ToastContext.Provider>
    );
  };
