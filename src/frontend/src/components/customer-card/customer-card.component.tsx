import React from 'react';
import './customer-card.component.css';

interface CustomerCardProps {
    name: string;
    salary: number;
    company: number;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ name, salary, company }) => {

    const moneyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className="customer-card">
            <h3>{name}</h3>
            <p>Salário: {moneyFormatter.format(salary)}</p>
            <p>Empresa: {moneyFormatter.format(company)}</p>
            <div className="card-actions">
                <button>➕</button>
                <button>✏️</button>
                <button>🗑️</button>
            </div>
        </div>
    );
};

export default CustomerCard;
