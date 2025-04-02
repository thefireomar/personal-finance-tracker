import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <span>{message}</span>
      {onClose && <button className="close-button" onClick={onClose}>&times;</button>}
    </div>
  );
};

export default ErrorMessage;
