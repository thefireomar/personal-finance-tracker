import React, { useState, useEffect } from 'react';
import { getTransactions, deleteTransaction, updateTransaction } from '../../services/api';
import ErrorMessage from '../common/ErrorMessage';

const TransactionList = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: '',
    type: '',
    category: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadTransactions();
  }, [userId]);

  const loadTransactions = async () => {
    try {
      const { data } = await getTransactions(userId);
      setTransactions(data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error('Error loading transactions:', errorMessage);
      setError(`Failed to load transactions: ${errorMessage}`);
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      description: transaction.description
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateTransaction(editingId, editForm);
      setTransactions(transactions.map(t => 
        t.id === editingId ? data : t
      ));
      setEditingId(null);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error('Error updating transaction:', errorMessage);
      setError(`Failed to update transaction: ${errorMessage}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error('Error deleting transaction:', errorMessage);
      setError(`Failed to delete transaction: ${errorMessage}`);
    }
  };

  return (
    <div className="transaction-list">
      <ErrorMessage message={error} onClose={() => setError('')} />
      {transactions.map(transaction => (
        <div key={transaction.id} className="transaction-item">
          {editingId === transaction.id ? (
            <form onSubmit={handleUpdate} className="edit-form">
              <input
                type="number"
                value={editForm.amount}
                onChange={e => setEditForm({...editForm, amount: e.target.value})}
              />
              <select
                value={editForm.type}
                onChange={e => setEditForm({...editForm, type: e.target.value})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <input
                type="text"
                value={editForm.category}
                onChange={e => setEditForm({...editForm, category: e.target.value})}
              />
              <input
                type="text"
                value={editForm.description}
                onChange={e => setEditForm({...editForm, description: e.target.value})}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
            </form>
          ) : (
            <>
              <span>{transaction.description}</span>
              <span className={transaction.type}>
                ${transaction.amount}
              </span>
              <div className="transaction-actions">
                <button onClick={() => handleEdit(transaction)}>Edit</button>
                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
