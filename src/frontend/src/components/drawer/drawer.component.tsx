import React, { useState } from 'react';
import './drawer.component.css';

const Drawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => setIsOpen(!isOpen);

    return (
        <div>
            <button className="toggle-button" onClick={toggleDrawer}>
                {isOpen ? '←' : '☰'}
            </button>
            <aside className={`drawer ${isOpen ? 'open' : 'closed'}`}>
                <div className="drawer-content">
                    <img src="/logo.png" alt="Teddy Logo" className="drawer-logo" />
                    <nav>
                        <ul>
                            <li>Início</li>
                            <li className="active">Clientes</li>
                            <li>Produtos</li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default Drawer;
