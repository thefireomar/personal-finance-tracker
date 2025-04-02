import React, { useState } from 'react';
import { addGoal } from '../../services/api';
import ErrorMessage from '../common/ErrorMessage';

const AddGoal = ({ userId, onGoalAdded }) => {
  const [goal, setGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await addGoal({ ...goal, userId });
      onGoalAdded(data);
      setGoal({ name: '', targetAmount: '', category: '', deadline: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add goal');
    }
  };

  return (
    <div className="add-goal">
      <ErrorMessage message={error} onClose={() => setError('')} />
      <form onSubmit={handleSubmit} className="add-goal-form">
        <input
          type="text"
          placeholder="Goal Name"
          value={goal.name}
          onChange={e => setGoal({...goal, name: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={goal.targetAmount}
          onChange={e => setGoal({...goal, targetAmount: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={goal.category}
          onChange={e => setGoal({...goal, category: e.target.value})}
        />
        <input
          type="date"
          value={goal.deadline}
          onChange={e => setGoal({...goal, deadline: e.target.value})}
          required
        />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default AddGoal;
