import React from 'react';
import './confirm-delete-modal.component.css';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    customerName: string | null;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isOpen,
    customerName,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Excluir cliente:</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <p>
                    Você está prestes a excluir o cliente: <strong>{customerName}</strong>
                </p>
                <button className="delete-button" onClick={onConfirm}>
                    Excluir cliente
                </button>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
