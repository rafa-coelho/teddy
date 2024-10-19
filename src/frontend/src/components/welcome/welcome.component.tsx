import React, { useState } from 'react';
import './welcome.component.css';
import { useToast } from '../toast/toast.context';

const Welcome: React.FC = () => {
  const [name, setName] = useState<string>('');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      return showToast('Por favor, digite o seu nome.', 'error', 'top-right');
    }

    showToast(`Bem-vindo, ${name}!`, 'success', 'top-right');

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

export default Welcome;
