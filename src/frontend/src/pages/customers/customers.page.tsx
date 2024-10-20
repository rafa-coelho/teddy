import React, { useEffect, useState } from 'react';
import CustomerList from '../../components/customer-list/customer-list.component';
import './customers.page.css';
import { CustomerModel } from '../../data/models/customer.model';
import Container from '../../components/container/container.component';
import ResponseListData from '../../data/response-list.data';
import Pagination from '../../components/pagination/pagination.component';
import CustomerService from '../../services/customer.service';

const CustomersPage: React.FC = () => {
    const [customersResponse, setCustomersResponse] = useState<ResponseListData<CustomerModel> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage, setCustomersPerPage] = useState(16);

    const fetchCustomers = (currentPage: number, customersPerPage: number) => {
        CustomerService
            .findAll(currentPage, customersPerPage, true)
            .then(setCustomersResponse);
    };

    useEffect(() => {
        fetchCustomers(currentPage, customersPerPage);
    }, [currentPage, customersPerPage]);

    if (!customersResponse)
        return <Container.Skeleton />

    return (
        <Container>
            <CustomerList
                data={customersResponse}
                customersPerPage={customersPerPage}
                setCustomersPerPage={setCustomersPerPage}
            />

            <button
                className="add-customer-button"
                type='button'
                onClick={() => { }}
            >
                Criar Cliente
            </button>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(customersResponse.totalCount / customersPerPage)}
                onPageChange={setCurrentPage}
            />

        </Container>
    );
};

export default CustomersPage;
