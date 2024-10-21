import React from 'react';
import './drawer.component.css';
import { LeftArrow } from '../icons/icons.component';
import { RiHome5Fill, RiUserFill } from 'react-icons/ri';
import { PiSquaresFourFill } from 'react-icons/pi';

interface DrawerProps {
    isOpen: boolean;
    onCloseDrawer: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onCloseDrawer }) => {
    return (
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
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
                    <li>
                        <span className="icon">
                            <RiHome5Fill />
                        </span>
                        <span className="text">Home</span>
                    </li>
                    <li className="active">
                        <span className="icon">
                            <RiUserFill />
                        </span>
                        <span className="text">Clientes</span>
                    </li>
                    <li>
                        <span className="icon">
                            <PiSquaresFourFill />
                        </span>
                        <span className="text">Produtos</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
