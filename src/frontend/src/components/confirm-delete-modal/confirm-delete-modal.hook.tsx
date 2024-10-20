import { useState } from 'react';

const useConfirmDeleteModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [customerName, setCustomerName] = useState<string | null>(null);
    const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

    const openModal = (name: string, confirmCallback: () => void) => {
        setCustomerName(name);
        setOnConfirm(() => confirmCallback);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCustomerName(null);
        setOnConfirm(null);
    };

    const confirm = () => {
        onConfirm?.();
        closeModal();
    };

    return { isOpen, customerName, openModal, closeModal, confirm };
};

export default useConfirmDeleteModal;
