import React, { useEffect, useState } from 'react';
import CustomerList from '../../components/customer-list/customer-list.component';
import './selected-customers.page.css';
import { CustomerModel } from '../../data/models/customer.model';
import Container from '../../components/container/container.component';
import ResponseListData from '../../data/response-list.data';
import Pagination from '../../components/pagination/pagination.component';
import useCustomerService from '../../hooks/use-customer-service.hook';
import { useToast } from '../../components/toast/toast.hook';

const SelectedCustomersPage: React.FC = () => {
    const [customersResponse, setCustomersResponse] = useState<ResponseListData<CustomerModel> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage, setCustomersPerPage] = useState(16);
    const [isLoading, setIsLoading] = useState(false);

    const { getAllCustomersAsync, unselectMultipleCustomersAsync } = useCustomerService();
    const { showToast } = useToast();

    const fetchCustomers = (currentPage: number, customersPerPage: number) => {
        getAllCustomersAsync({
            page: currentPage,
            take: customersPerPage,
            onlySelected: true,
        })
            .then(setCustomersResponse);
    };

    const handleCleanSelectedCustomers = () => {
        setIsLoading(true);

        unselectMultipleCustomersAsync(customersResponse?.list.map(c => c.id) || [])
            .then((response) => {
                if (response && 'message' in response) {
                    showToast(response.message, 'error', 'top-right');
                    return;
                }

                showToast('Clientes desselecionados com sucesso.', 'success', 'top-right');
                fetchCustomers(currentPage, customersPerPage);
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
                isSelectedList
                isLoading={isLoading}
            />

            <button
                className="clean-selected-customer-button"
                type='button'
                onClick={handleCleanSelectedCustomers}
                disabled={isLoading || customersResponse.list.length === 0}
            >
                Limpar clientes selecionados
            </button>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(customersResponse.totalCount / customersPerPage)}
                onPageChange={setCurrentPage}
            />

        </Container>
    );
};

export default SelectedCustomersPage;
