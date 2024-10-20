import React from 'react';
import Drawer from '../../components/drawer/drawer.component';
import Header from '../../components/header/header.component';
import './customers.page.css';

const CustomersPage: React.FC = () => {

    return (
        <div className="customers-page">
            <Drawer />
            <div className="main-content">
                <Header currentRoute='/customers' userName='Fulano' onToggleDrawerClick={() => {}} />
            </div>
        </div>
    );
};

export default CustomersPage;
