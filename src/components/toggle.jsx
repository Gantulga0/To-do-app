import React from 'react';
import './toggle.css';

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        className="toggle"
        id="check"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check">Dark Mode</label>
    </div>
  );
};
