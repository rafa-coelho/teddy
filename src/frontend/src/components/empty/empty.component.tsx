import React from 'react';
import './empty.component.css';
import { FiUsers } from 'react-icons/fi';

interface EmptyProps {
    message: string;
}

const Empty: React.FC<EmptyProps> = ({ message }) => {
    return (
        <div className="empty-state">
            <FiUsers size={64} className="empty-icon" />
            <span className="empty-message">{message}</span>
        </div>
    );
};

export default Empty;
