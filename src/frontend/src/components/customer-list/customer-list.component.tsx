import React from 'react';
import CustomerCard from '../customer-card/customer-card.component';
import './customer-list.component.css';
import { CustomerModel } from '../../data/models/customer.model';
import ResponseListData from '../../data/response-list.data';
import Empty from '../empty/empty.component';

interface CustomerListProps {
    data: ResponseListData<CustomerModel>;
    customersPerPage: number;
    setCustomersPerPage: (itemsPerPage: number) => void;
    refreshData: () => void;
    isSelectedList?: boolean;
    isLoading?: boolean;
}

const CustomerList: React.FC<CustomerListProps> = (props) => {
    return (
        <>
            <div className="controls">
                {
                    props.isSelectedList
                        ? <h2>Clientes selecionados:</h2>
                        :
                        <>
                            <span>
                                <strong>{props.data.totalCount}</strong> clientes encontrados:
                            </span>
                            <div>
                                <span>Clientes por página: </span>
                                <select
                                    value={props.customersPerPage}
                                    onChange={(e) => props.setCustomersPerPage(Number(e.target.value))}
                                >
                                    <option value={8}>8</option>
                                    <option value={16}>16</option>
                                    <option value={32}>32</option>
                                </select>
                            </div>
                        </>
                }

            </div>

            {
                props.isLoading &&
                <div className="customer-list">
                    {Array.from({ length: props.customersPerPage }, (_, i) => (
                        <CustomerCard.Skeleton key={i} />
                    ))}
                </div>
            }

            {
                !props.isLoading && props.data.list.length === 0 &&
                <Empty message={props.isSelectedList ? "Nenhum cliente selecionado" : "Nenhum cliente encontrado"} />
            }

            {
                !props.isLoading && props.data.list.length > 0 &&
                <div className="customer-list">
                    {props.data.list.map((customer, index) => (
                        <CustomerCard
                            key={index}
                            customerData={customer}
                            onSuccess={props.refreshData}
                            isSelectedList={props.isSelectedList}
                        />
                    ))}
                </div>
            }
        </>
    );
};

export default CustomerList;
