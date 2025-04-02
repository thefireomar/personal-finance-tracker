import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionList from '../Transactions/TransactionList';
import AddTransaction from '../Transactions/AddTransaction';
import GoalsList from '../Goals/GoalsList';
import AddGoal from '../Goals/AddGoal';
import ErrorMessage from '../common/ErrorMessage';

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleTransactionAdded = (newTransaction) => {
    try {
      window.location.reload();
    } catch (err) {
      setError('Failed to refresh transactions');
    }
  };

  const handleGoalAdded = (newGoal) => {
    try {
      window.location.reload();
    } catch (err) {
      setError('Failed to refresh goals');
    }
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1>Finance Tracker</h1>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <ErrorMessage message={error} onClose={() => setError('')} />

      <div className="dashboard-content">
        <section className="transactions-section">
          <h2>Transactions</h2>
          <AddTransaction userId={userId} onTransactionAdded={handleTransactionAdded} />
          <TransactionList userId={userId} />
        </section>

        <section className="goals-section">
          <h2>Financial Goals</h2>
          <AddGoal userId={userId} onGoalAdded={handleGoalAdded} />
          <GoalsList userId={userId} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
