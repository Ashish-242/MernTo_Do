import React from 'react';

const TaskItem = ({ task }) => {
  const { title, description, date, priority } = task;

  return (
    <div className="task-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Date: {date}</p>
      <p>Priority: {priority}</p>
      {/* Add buttons for completing, editing, and deleting tasks as needed */}
      <button>Complete</button>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default TaskItem;
