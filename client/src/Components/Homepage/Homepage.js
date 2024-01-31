import React from 'react';
import { useState,useEffect } from 'react';
import PieChart from './PieChart/PieChart';
import TodoList from './Todolist/Todolist';
import './Homepage.css'
import Completedtask from './CompletedTask/completedtask';
import Pendingtask from './PendingTask/pendingtask';
import 'bootstrap/dist/css/bootstrap.min.css';
function Homepage(){

  
    const [todoList, setTodoList] = useState([]);
  
    // Fetch todo list data from backend
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/getTodoList');
          if (response.ok) {
            const data = await response.json();
            setTodoList(data);
          } else {
            console.error('Failed to fetch todo list data');
          }
        } catch (error) {
          console.error('Error fetching todo list data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    // Calculate count of pending tasks
    const pendingCount = todoList.filter(task => task.status === 'pending').length;
  
    // Calculate count of completed tasks
    const completedCount = todoList.filter(task => task.status === 'completed').length;
    const duedatecount = todoList.filter(task => task.status === 'duedate').length;
  

  return (
    <div className='container'>
    <div className='row-1'>
      <TodoList/>
      </div>
      {/* <TaskForm/> */}
      <div className='row'>
      <div className="col-sm-6 text-center" >
        <Pendingtask count={pendingCount}/>
        </div>
        <div className="col-sm-6 text-center">
        <Completedtask count={completedCount}/>
        </div>
      </div>
      <div className='pie'>
      <PieChart completed={completedCount} pending={pendingCount} due={duedatecount} width={300} height={500} />
      </div>
    </div>
  );
}
export default Homepage