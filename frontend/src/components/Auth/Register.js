import React, { useState } from 'react';
import { register } from '../../services/api';

const Register = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debug, setDebug] = useState({
    requestData: null,
    responseData: null,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setDebug({ requestData: null, responseData: null, error: null });

    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const requestData = {
        username: userData.username,
        email: userData.email,
        password: userData.password
      };
      setDebug(prev => ({ ...prev, requestData }));
      
      const response = await register(requestData);
      setDebug(prev => ({ ...prev, responseData: response.data }));
      
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        onRegister(response.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Registration failed';
      setError(`Registration failed: ${errorMessage}`);
      setDebug(prev => ({ ...prev, error: err }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={e => setUserData({...userData, username: e.target.value})}
          required
          minLength="3"
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={e => setUserData({...userData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={e => setUserData({...userData, password: e.target.value})}
          required
          minLength="6"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={e => setUserData({...userData, confirmPassword: e.target.value})}
          required
          minLength="6"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Sign Up'}
        </button>
      </form>

      {/* Debug Information */}
      {(debug.requestData || debug.responseData || debug.error) && (
        <div className="debug-info">
          <h3>Debug Information</h3>
          
          {debug.requestData && (
            <div className="debug-section">
              <h4>Request Data:</h4>
              <pre>{JSON.stringify(debug.requestData, null, 2)}</pre>
            </div>
          )}
          
          {debug.responseData && (
            <div className="debug-section">
              <h4>Response Data:</h4>
              <pre>{JSON.stringify(debug.responseData, null, 2)}</pre>
            </div>
          )}
          
          {debug.error && (
            <div className="debug-section">
              <h4>Error Details:</h4>
              <pre>{JSON.stringify({
                message: debug.error.message,
                response: debug.error.response?.data,
                status: debug.error.response?.status
              }, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
