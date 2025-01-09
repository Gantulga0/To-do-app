import './App.css';
import React, { useState, useEffect } from 'react';
import { Toggle } from './components/toggle';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Status from './components/Status';
import Button from './components/Button';
import NoTask from './components/NoTask';
import Log from './components/Log';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [log, setLog] = useState([]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const addTask = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a task');
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      text: inputValue,
      completed: false,
      createdAt: new Date().toLocaleDateString('en-CA'),
      completedAt: null,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');

    setLog([
      ...log,
      {
        taskDescription: newTask.text,
        status: 'added',
        time: new Date().toLocaleString('en-CA'),
      },
    ]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed
                ? new Date().toLocaleString('en-CA')
                : null,
            }
          : task
      )
    );

    const task = tasks.find((task) => task.id === id);

    const status = task.completed
      ? 'marked as incomplete'
      : 'marked as complete';
    setLog([
      ...log,
      {
        taskDescription: task.text,
        status,
        time: new Date().toLocaleString('en-CA'),
      },
    ]);
  };

  const deleteTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    setLog([
      ...log,
      {
        taskDescription: task.text,
        status: 'deleted',
        time: new Date().toLocaleString('en-CA'),
      },
    ]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    if (filter === 'logs') return false;
    return true;
  });

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        addTask();
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  return (
    <div className={`container ${theme}`}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <h1 id="header">To-Do List</h1>
        <Toggle isChecked={theme === 'dark'} handleChange={handleThemeChange} />
      </div>

      <div className="input">
        <input
          type="text"
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task ...."
        />
        <Button text="Add" onClick={() => addTask(tasks)} />
      </div>
      <Status setFilter={setFilter} />

      {filter === 'logs' ? (
        <Log log={log} />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div className="todo-main">
                <div
                  id="todo-list"
                  className="todo-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <input
                            type="checkbox"
                            id="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                          />
                          <span
                            className={
                              task.completed ? 'completed' : 'task-style'
                            }
                            style={{ marginLeft: '10px' }}
                          >
                            {task.text}
                          </span>
                          <Button
                            text="Delete"
                            onClick={() => deleteTask(task.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <NoTask
        style={{
          display: tasks.length === 0 ? 'flex' : 'none',
        }}
      />
      <div
        className="summary"
        style={{ display: tasks.length === 0 ? 'none' : '' }}
      >
        <p id="task-counter">
          {tasks.length} of {tasks.filter((task) => task.completed).length} task
          completed.
        </p>
      </div>
      <div className="footer">
        <div style={{ color: '#6b7280', fontSize: '12px' }}>Created By</div>
        <a
          href="https://www.youtube.com/watch?v=h49j9s4ajIc"
          style={{ color: '#3b73ed', fontSize: '12px' }}
        >
          Gantulga
        </a>
      </div>
    </div>
  );
}

export default App;
