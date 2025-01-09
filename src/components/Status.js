const Status = (props) => {
  const { filter, setFilter } = props;
  return (
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
      <div
        id="todo-logs"
        className={filter === 'logs' ? 'active' : ''}
        onClick={() => setFilter('logs')}
      >
        Logs
      </div>
    </div>
  );
};

export default Status;
