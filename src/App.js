import './App.css';
import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  //Task add hiih function
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

  //Status uurcluh function
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Ustgah task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Filterlej bui taskuudiig haruulah
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
              style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            />
            <span
              className={task.completed ? 'completed' : ''}
              style={{ marginLeft: '10px' }}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                marginLeft: 'auto',
                backgroundColor: '#fef2f2',
                border: 'none',
                color: '#ef4444',
                borderRadius: '6px',
                height: '30px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div
        className="summary"
        style={{ display: tasks.length === 0 ? 'none' : '' }}
      >
        <p>
          {tasks.length} of {tasks.filter((task) => task.completed).length} task
          completed.
        </p>
      </div>
    </div>
  );
}

export default App;
