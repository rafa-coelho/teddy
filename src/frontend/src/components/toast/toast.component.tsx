import React from 'react';
import './toast.component.css';


export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ToastProps {
    message: string;
    type: ToastType;
    position: ToastPosition;
}

const Toast: React.FC<ToastProps> = ({ message, type, position }) => {
    return (
        <div className={`toast ${type} ${position}`}>
            {message}
        </div>
    );
};

export default Toast;

