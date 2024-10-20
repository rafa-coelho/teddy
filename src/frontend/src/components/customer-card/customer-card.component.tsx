import React from 'react';
import './customer-card.component.css';
import { CustomerModal, useCustomerModal } from '../customer-modal';
import { CustomerModel } from '../../data/models/customer.model';
import useCustomerService from '../../hooks/use-customer-service.hook';
import { useToast } from '../toast/toast.hook';
import { formatCurrency } from '../../utils';
import ConfirmDeleteModal from '../confirm-delete-modal/confirm-delete-modal.component';
import useConfirmDeleteModal from '../confirm-delete-modal/confirm-delete-modal.hook';

interface CustomerCardProps {
    customerData: CustomerModel;
    onSuccess?: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = (props) => {
    const { isOpen: isEditModalOpen, openModal, closeModal: closeEditModal } = useCustomerModal();
    const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal, confirm } = useConfirmDeleteModal();

    const [isLoading, setIsLoading] = React.useState(false);
    const { updateCustomerAsync, deleteCustomerAsync } = useCustomerService();
    const { showToast } = useToast();


    const handleSave = (customer: CustomerModel) => {
        setIsLoading(false);

        updateCustomerAsync(customer.id!, customer)
            .then((response) => {
                if (response && 'message' in response) {
                    showToast(response.message, 'error', 'top-right');
                    return;
                }

                showToast('Cliente salvo com sucesso.', 'success', 'top-right');

                if (props.onSuccess) {
                    props.onSuccess();
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteCustomerAsync(props.customerData.id!)
            .then((response) => {
                if (response && 'message' in response) {
                    showToast(response.message, 'error', 'top-right');
                    return;
                }

                showToast('Cliente excluído com sucesso.', 'success', 'top-right');

                if (props.onSuccess) {
                    props.onSuccess();
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    return (
        <>
            <div className="customer-card">
                <h3>{props.customerData.name}</h3>
                <p>Salário: {formatCurrency(props.customerData.salary.toString())}</p>
                <p>Empresa: {formatCurrency(props.customerData.companyValue.toString())}</p>
                <div className="card-actions">
                    <button>➕</button>
                    <button onClick={() => openModal()}>✏️</button>
                    <button onClick={() => openDeleteModal(props.customerData.name, handleDelete)}>🗑️</button>
                </div>
            </div>
            {
                isEditModalOpen &&
                <CustomerModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    onSave={(customer) => handleSave(customer as CustomerModel)}
                    initialData={props.customerData}
                    loading={isLoading}
                />
            }

            {
                isDeleteModalOpen &&
                <ConfirmDeleteModal
                    isOpen={isDeleteModalOpen}
                    customerName={props.customerData.name}
                    onClose={closeDeleteModal}
                    onConfirm={confirm}
                />
            }
        </>
    );
};

export default CustomerCard;

