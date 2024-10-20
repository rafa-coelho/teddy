import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.page.css';
import { useToast } from '../../components/toast/toast.hook';

const HomePage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            return showToast('Por favor, digite o seu nome.', 'error', 'top-right');
        }

        showToast(`Bem-vindo, ${name}!`, 'success', 'top-right');

        navigate('/customers');
    };

    return (
        <div className="welcome-container">
            <h1>Olá, seja bem-vindo!</h1>
            <form className="welcome-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite o seu nome:"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default HomePage;
