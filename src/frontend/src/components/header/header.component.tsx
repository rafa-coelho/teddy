import React from 'react';
import './header.component.css';
import { useAppContext } from '../../context/app.context';

interface HeaderProps {
    onToggleDrawerClick?: () => void;
    userName?: string;
    currentRoute?: string;
}

const Header: React.FC<HeaderProps> = (props) => {

    const { state } = useAppContext();

    const ulLinks = [
        { name: 'Clientes', route: '/customers' },
        { name: 'Clientes selecionados', route: '/selected-customers' },
        { name: 'Sair', route: '/logout' }
    ];

    return (
        <header className="header">
            <div className="header-left">
                {
                    props.onToggleDrawerClick && (
                        <button
                            className='toggle-drawer-button'
                            onClick={props.onToggleDrawerClick}
                        >
                            ☰
                        </button>
                    )
                }
            </div>
            <div className="header-center">
                <img src="/teddy-logo.png" alt="Teddy Logo" className="logo" />
                <nav>
                    <ul>
                        {
                            ulLinks.map((link, index) => (
                                <li key={index} className={props.currentRoute === link.route ? 'selected' : ''}>
                                    {link.name}
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <span>Olá, <strong>{state.userName || "Usuário"} </strong></span>
            </div>

        </header>
    );
};

export default Header;
