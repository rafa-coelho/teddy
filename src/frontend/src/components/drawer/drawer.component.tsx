import React from 'react';
import './drawer.component.css';
import { LeftArrow } from '../icons/icons.component';
import { RiHome5Fill, RiUserAddFill, RiUserFill } from 'react-icons/ri';
import { FaPowerOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface DrawerProps {
    isOpen: boolean;
    onCloseDrawer: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onCloseDrawer }) => {
    const ulLinks = [
        { name: 'Home', route: '/', icon: <RiHome5Fill /> },
        { name: 'Clientes', route: '/customers', icon: <RiUserFill /> },
        { name: 'Clientes selecionados', route: '/customers/selected', icon: <RiUserAddFill /> },
        { name: 'Sair', route: '/logout', icon: <FaPowerOff /> }
    ];
    return (
        <div className={`drawer-overlay ${!isOpen ? 'hide' : ''}`} onClick={onCloseDrawer}>
            <div className={`drawer ${isOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
                <div className="drawer-header">
                    <img src="/teddy-logo.png" alt="Logo" className="drawer-logo" />
                </div>
                {
                    isOpen && (
                        <button className="toggle-button" onClick={onCloseDrawer}>
                            <LeftArrow />
                        </button>
                    )
                }
                <div className="drawer-content">
                    <ul>
                        {
                            ulLinks.map((link, index) => (
                                <li key={index} className={location.pathname === link.route
                                    ? 'active'
                                    : ''}>
                                    <span className="icon">
                                        {link.icon}
                                    </span>
                                    <span className="text">
                                        <Link
                                            to={link.route}
                                            onClick={onCloseDrawer}
                                        >
                                            {link.name}
                                        </Link>
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
