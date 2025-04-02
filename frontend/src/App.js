import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import LandingPage from './components/Landing/LandingPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAuth = (data) => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? 
            <Login onLogin={handleAuth} /> : 
            <Navigate to="/dashboard" />
          } 
        />
        <Route 
          path="/register" 
          element={
            !isAuthenticated ? 
            <Register onRegister={handleAuth} /> : 
            <Navigate to="/dashboard" />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard /> : 
            <Navigate to="/login" />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
