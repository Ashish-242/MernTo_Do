import React, { useState } from 'react';

import '../../Homepage/Homepage.css';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [newTitle, setNewTitle] = useState(''); 
	const [newDescription, setNewDescription] = useState(''); 
	const [newDate, setNewDate] = useState(''); 
	const [newPriority, setNewPriority] = useState(''); 
	const [newStatus, setNewStatus] = useState(''); 



  // Function to add task to the database 
  async function handleSubmit(e)  { 
    	e.preventDefault(); 
    	if (newTitle==='' || !newDescription==='' || !newDate==='' || newPriority==='' ||newStatus==='') { 
        console.log(newTitle);
        console.log(newDescription);
        console.log(newDate);
        console.log(newPriority);

    		alert("All fields must be filled out."); 
    		return; 
    	} 
  
    	const response=await fetch('http://localhost:4000/addTodoList',

       {method:"Post",
       body:JSON.stringify({title:newTitle, description:newDescription,  date:newDate ,priority:newPriority,status:newStatus}),
       headers: { "Content-Type": "application/json" },

      credentials:"include",
      }) 
      console.log(response);
      if(response.ok){ 
        alert('Data Added Successfully');
        window.location.reload(); 
      }else{
        alert('You are not Logged In');
      }
    } 


  return (
    <div className={`modal fade ${'show'}`} tabIndex="-1" style={{ display: 'block' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Task</h5>
          <button type="button" className="close" onClick={onCancel}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group"> 
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" className="form-control"  onChange={(e)=>{setNewTitle(e.target.value)}} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" className="form-control"  onChange={(e)=>{setNewDescription(e.target.value)}} />
            </div>
            <div className="form-group">
              <label htmlFor="Date">Date:</label>
              <input type="date" id="date" name="date" className="form-control"  onChange={(e)=>{setNewDate(e.target.value)}} />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority:</label>
              <select id="priority" name="priority" className="form-control"  onChange={(e)=>{setNewPriority(e.target.value)}}>
              <option disabled selected>Select priority</option>
                <option value="1" > 1</option>
                <option value="2"> 2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select id="status" name="status" className="form-control"  onChange={(e)=>{setNewStatus(e.target.value)}}>
              <option disabled selected>Select status</option>
                <option value='pending' >Pending</option>
                <option value='completed'>Completed</option>
                <option value='duedate'> Due Date</option>
                
              </select>
            </div>
            <div className='btnadd'>
            <button type="submit" className="btn btn-primary">Add Task</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TaskForm;
