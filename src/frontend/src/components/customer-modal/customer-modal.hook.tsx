import { useState, useCallback } from 'react';
import { CustomerModel } from '../../data/models/customer.model';

const useCustomerModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerModel | null>(null);

    const openModal = useCallback((data: CustomerModel | null = null) => {
        setCustomerData(data);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setCustomerData(null);
    }, []);

    return { isOpen, openModal, closeModal, customerData };
};

export default useCustomerModal;
