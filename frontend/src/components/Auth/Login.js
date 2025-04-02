import React, { useState } from 'react';
import { login } from '../../services/api';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      onLogin(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={e => setCredentials({...credentials, email: e.target.value})}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={e => setCredentials({...credentials, password: e.target.value})}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
