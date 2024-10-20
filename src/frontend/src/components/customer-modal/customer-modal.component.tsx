import React, { FormEvent, useEffect, useState } from 'react';
import './customer-modal.component.css';
import { CustomerModel } from '../../data/models/customer.model';
import { parseCurrencyToFloat, formatCurrency } from '../../utils';

interface CustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (customer: Partial<CustomerModel>) => void;
    initialData?: CustomerModel | null;
    loading?: boolean;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialData = null,
    loading = false,
}) => {
    const [name, setName] = useState('');
    const [salary, setSalary] = useState<string | ''>('');
    const [companyValue, setCompanyValue] = useState<string | ''>('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setSalary(formatCurrency(initialData.salary.toString()));
            setCompanyValue(formatCurrency(initialData.companyValue.toString()));
        }
    }, [initialData]);


    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loading) 
            return;

        const numericSalary = parseCurrencyToFloat(salary);
        const numericCompanyValue = parseCurrencyToFloat(companyValue);


        if (name && salary && companyValue) {
            onSave({
                id: initialData?.id,
                name,
                salary: numericSalary,
                companyValue: numericCompanyValue,
            });
            onClose();
            resetForm();
        }
    };

    const handleClose = () => {
        onClose();
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setSalary('');
        setCompanyValue('');
    };

    if (!isOpen)
        return null;


    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{initialData ? 'Editar Cliente' : 'Criar Cliente'}</h2>
                    <button className="modal-close" onClick={handleClose}>
                        ×
                    </button>
                </div>
                <form onSubmit={handleSave}>
                    <input
                        type="text"
                        placeholder="Digite o nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Digite o salário"
                        value={salary}
                        onChange={(e) => setSalary(formatCurrency(e.target.value))}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Digite o valor da empresa"
                        value={companyValue}
                        onChange={(e) => setCompanyValue(formatCurrency(e.target.value))}
                        required
                    />
                    <button 
                        className='submit'
                        type='submit'
                        disabled={loading}
                    >
                        {initialData ? 'Salvar Alterações' : 'Adicionar Cliente'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomerModal;
