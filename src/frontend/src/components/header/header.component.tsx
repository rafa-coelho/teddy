import React from 'react';
import './header.component.css';
import { useAppContext } from '../../context/app.context';
import { Link } from 'react-router-dom';

interface HeaderProps {
    onToggleDrawerClick?: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {

    const { state } = useAppContext();

    const ulLinks = [
        { name: 'Clientes', route: '/customers' },
        { name: 'Clientes selecionados', route: '/customers/selected' },
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
                                <li key={index}>
                                    <Link
                                        to={link.route}
                                        className={
                                            location.pathname === link.route
                                                ? 'selected'
                                                : ''
                                        }
                                    >
                                        {link.name}
                                    </Link>
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
