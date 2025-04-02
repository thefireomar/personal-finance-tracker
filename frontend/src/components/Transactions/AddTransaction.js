import React, { useState } from 'react';
import { addTransaction } from '../../services/api';
import ErrorMessage from '../common/ErrorMessage';

const AddTransaction = ({ userId, onTransactionAdded }) => {
  const [transaction, setTransaction] = useState({
    amount: '',
    type: 'expense',
    category: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await addTransaction({ ...transaction, userId });
      onTransactionAdded(data);
      setTransaction({ amount: '', type: 'expense', category: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add transaction');
    }
  };

  return (
    <div className="add-transaction">
      <ErrorMessage message={error} onClose={() => setError('')} />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={transaction.amount}
          onChange={e => setTransaction({...transaction, amount: e.target.value})}
        />
        <select
          value={transaction.type}
          onChange={e => setTransaction({...transaction, type: e.target.value})}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={transaction.category}
          onChange={e => setTransaction({...transaction, category: e.target.value})}
        />
        <input
          type="text"
          placeholder="Description"
          value={transaction.description}
          onChange={e => setTransaction({...transaction, description: e.target.value})}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
