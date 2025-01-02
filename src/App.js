import './App.css';
import React, { useState } from 'react';

function App() {
  // State to hold all tasks and their status
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Function to handle adding a task
  const addTask = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a task');
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to filter tasks based on the current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1 id="header">To-Do List</h1>
      <div className="input">
        <input
          type="text"
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task ...."
        />
        <button id="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="todo-status">
        <div
          id="todo-all"
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </div>
        <div
          id="todo-active"
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </div>
        <div
          id="todo-completed"
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </div>
      </div>
      <div id="todo-list" className="todo-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.text}
            </span>
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
