import React from 'react';

const Log = ({ log }) => {
  const groupedLogs = log.reduce((acc, entry) => {
    if (!acc[entry.taskDescription]) {
      acc[entry.taskDescription] = [];
    }
    acc[entry.taskDescription].push(entry);
    return acc;
  }, {});

  return (
    <div className="logs">
      {Object.keys(groupedLogs).map((task) => (
        <div>
          <h3 id="log-head">{task}</h3>
          {groupedLogs[task].map((entry) => (
            <p id="log-text">
              {entry.time}: {entry.status}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Log;
