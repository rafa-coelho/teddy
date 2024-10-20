import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/toast/toast.context';
import HomePage from './pages/home/home.page';
import CustomersPage from './pages/customers/customers.page';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;
