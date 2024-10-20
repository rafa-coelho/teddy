import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/toast/toast.context';
import HomePage from './pages/home/home.page';
import CustomersPage from './pages/customers/customers.page';
import SelectedCustomersPage from './pages/selected-customers/selected-customers.page';
import { AppProvider } from './context/app.context';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/selected" element={<SelectedCustomersPage />} />
          </Routes>
        </AppProvider>
      </Router>
    </ToastProvider>
  );
};

export default App;
