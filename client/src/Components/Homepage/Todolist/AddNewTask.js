import React, { useState } from 'react';
import TaskForm from './TaskForm'; // Import the TaskForm component

const AddNewTaskButton = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false); // State to manage the visibility of the TaskForm

  const handleAddTask = () => {
    setShowForm(true); // Show the TaskForm when Add New Task button is clicked
  };

  const handleCancel = () => {
    setShowForm(false); // Hide the TaskForm when Cancel button is clicked
  };

  return (
    <div>
      <button onClick={handleAddTask} className="add-task-button">
        Add New Task
      </button>
      {showForm && <TaskForm onSubmit={onAdd} onCancel={handleCancel} />} {/* Render TaskForm only when showForm is true */}
    </div>
  );
};

export default AddNewTaskButton;
