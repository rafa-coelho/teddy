import React, { useEffect, useState } from 'react';
import CustomerList from '../../components/customer-list/customer-list.component';
import './customers.page.css';
import { CustomerModel } from '../../data/models/customer.model';
import Container from '../../components/container/container.component';
import ResponseListData from '../../data/response-list.data';
import Pagination from '../../components/pagination/pagination.component';
import { CustomerModal, useCustomerModal } from '../../components/customer-modal';
import useCustomerService from '../../hooks/use-customer-service.hook';
import { useToast } from '../../components/toast/toast.hook';

const CustomersPage: React.FC = () => {
    const [customersResponse, setCustomersResponse] = useState<ResponseListData<CustomerModel> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage, setCustomersPerPage] = useState(16);
    const [isLoading, setIsLoading] = useState(false);

    const { isOpen, openModal, closeModal } = useCustomerModal();
    const { getAllCustomersAsync, createCustomerAsync, updateCustomerAsync } = useCustomerService();
    const { showToast } = useToast();

    const fetchCustomers = (currentPage: number, customersPerPage: number) => {
        setIsLoading(true);
        getAllCustomersAsync({
            page: currentPage,
            take: customersPerPage,
        })
            .then((customersResponse) => {
                setCustomersResponse(customersResponse);
                setIsLoading(false);
            });
    };

    const handleSave = (customer: Partial<CustomerModel>) => {
        setIsLoading(false);

        const isEditing = customer.id !== undefined;
        (
            (isEditing)
                ? updateCustomerAsync(customer.id!, customer)
                : createCustomerAsync(customer)
        )
            .then((response) => {
                if (response && 'message' in response) {
                    showToast(response.message, 'error', 'top-right');
                    return;
                }

                fetchCustomers(currentPage, customersPerPage);
                showToast('Cliente salvo com sucesso.', 'success', 'top-right');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchCustomers(currentPage, customersPerPage);
        // eslint-disable-next-line
    }, [currentPage, customersPerPage]);

    if (!customersResponse)
        return <Container.Skeleton />

    return (
        <Container>
            <CustomerList
                data={customersResponse}
                customersPerPage={customersPerPage}
                setCustomersPerPage={setCustomersPerPage}
                refreshData={() => fetchCustomers(currentPage, customersPerPage)}
            />

            <button
                className="add-customer-button"
                type='button'
                onClick={() => openModal()}
            >
                Criar Cliente
            </button>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(customersResponse.totalCount / customersPerPage)}
                onPageChange={setCurrentPage}
            />

            <CustomerModal
                isOpen={isOpen}
                onClose={closeModal}
                onSave={handleSave}
                loading={isLoading}
            />

        </Container>
    );
};

export default CustomersPage;
