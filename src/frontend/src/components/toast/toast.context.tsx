import React, { useState, ReactNode } from 'react';
import Toast, { ToastType, ToastPosition } from './toast.component';
import { ToastContext } from './toast.hook';

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
