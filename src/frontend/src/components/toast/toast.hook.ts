import { createContext, useContext } from "react";
import { ToastType, ToastPosition } from "./toast.component";

interface ToastContextType {
    showToast: (message: string, type?: ToastType, position?: ToastPosition) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
