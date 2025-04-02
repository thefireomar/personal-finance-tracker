import React, { useState, useEffect } from 'react';
import { getGoals, updateGoalProgress, deleteGoal } from '../../services/api';
import ErrorMessage from '../common/ErrorMessage';

const GoalsList = ({ userId }) => {
  const [goals, setGoals] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    currentAmount: '',
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadGoals();
  }, [userId]);

  const loadGoals = async () => {
    try {
      const { data } = await getGoals(userId);
      setGoals(data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error('Error loading goals:', errorMessage);
      setError(`Failed to load goals: ${errorMessage}`);
    }
  };

  const handleProgressUpdate = async (id, currentAmount) => {
    try {
      const { data } = await updateGoalProgress(id, currentAmount);
      setGoals(goals.map(goal => goal.id === id ? data : goal));
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error('Error updating goal progress:', errorMessage);
      setError(`Failed to update goal: ${errorMessage}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGoal(id);
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error('Error deleting goal:', errorMessage);
      setError(`Failed to delete goal: ${errorMessage}`);
    }
  };

  const handleEdit = (goal) => {
    setEditingId(goal.id);
    setEditForm({
      currentAmount: goal.current_amount,
      name: goal.name,
      targetAmount: goal.target_amount,
      category: goal.category,
      deadline: goal.deadline.split('T')[0]
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateGoalProgress(editingId, editForm.currentAmount);
      setGoals(goals.map(g => g.id === editingId ? data : g));
      setEditingId(null);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error('Error updating goal:', errorMessage);
      setError(`Failed to update goal: ${errorMessage}`);
    }
  };

  return (
    <div className="goals-list">
      <ErrorMessage message={error} onClose={() => setError('')} />
      {goals.map(goal => (
        <div key={goal.id} className="goal-item">
          {editingId === goal.id ? (
            <form onSubmit={handleUpdate} className="edit-form">
              <input
                type="text"
                value={editForm.name}
                onChange={e => setEditForm({...editForm, name: e.target.value})}
                disabled
              />
              <input
                type="number"
                value={editForm.currentAmount}
                onChange={e => setEditForm({...editForm, currentAmount: e.target.value})}
                placeholder="Current Amount"
              />
              <button type="submit">Update Progress</button>
              <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
            </form>
          ) : (
            <>
              <h3>{goal.name}</h3>
              <div className="goal-progress">
                <progress value={goal.current_amount} max={goal.target_amount} />
                <p>
                  ${goal.current_amount} of ${goal.target_amount}
                  ({((goal.current_amount / goal.target_amount) * 100).toFixed(1)}%)
                </p>
              </div>
              <div className="goal-details">
                <span>Category: {goal.category}</span>
                <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
              <div className="goal-actions">
                <button onClick={() => handleEdit(goal)}>Update Progress</button>
                <button onClick={() => handleDelete(goal.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default GoalsList;
