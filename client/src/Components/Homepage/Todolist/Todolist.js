
import React from "react"; 
import { useEffect, useState } from "react"; 
import TaskForm from './TaskForm';
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../Homepage.css';

function Todo() { 
   const {id}=useParams;
	const [todoList, setTodoList] = useState([]); 
	const [editableId, setEditableId] = useState(null); 
	const [editedTitle, setEditedTitle] = useState(""); 
	const [editedDescription, setEditedDescription] = useState(""); 
    const [editedDate, setEditedDate] = useState(""); 
    const [editedPriority, setEditedPriority] = useState(""); 
    const [editedStatus, setEditedStatus] = useState(""); 

   
    const [showForm,setShowForm]=useState(false);

  const handleAddTask = () => {
   
    setShowForm(true);
  };

  const handleCancel = () => {
    
    setShowForm(false);
  };

  useEffect(() => { 
    fetch('http://localhost:4000/getTodoList') 
        .then(response => { 
            
            response.json().then(todoList=>{
                setTodoList(todoList);
                console.log(todoList);
            })
        }) 
        .catch(err => console.log(err)) 
}, []) 
	// Fetch tasks from database 
	// useEffect(() => { 
	// 	fetch.get('http://127.0.0.1:3001/getTodoList') 
	// 		.then(result => { 
	// 			setTodoList(result.data) 
	// 		}) 
	// 		.catch(err => console.log(err)) 
	// }, []) 

	// Function to toggle the editable state for a specific row 
	const toggleEditable = (id) => { 
		const rowData = todoList.find((data) => data._id === id); 
		if (rowData) { 
			setEditableId(id); 
			setEditedTitle(rowData.title); 
			setEditedDate(rowData.date); 
			setEditedDescription(rowData.description ); 
			setEditedPriority(rowData.priority);
			setEditedStatus(rowData.Status ); 
		} else { 
			setEditableId(null); 
			setEditedTitle(""); 
			setEditedDate(""); 
			setEditedDescription(""); 
			setEditedPriority(""); 
			setEditedStatus("");
		} 
	}; 


	

	// Function to save edited data to the database 
	async function updatetask(e) { 
        e.preventDefault();
		const editedData = { 
			title: editedTitle, 
			description: editedDescription, 
            date:editedDate,
			priority: editedPriority, 
			status:editedStatus,
		};  
		if (editedTitle==='' || !editedDescription==='' || !editedDate==='' || !editedPriority===''|| !editedStatus==='') { 
			alert("All fields must be filled out."); 
			return; 
		} 

		// Updating edited data to the database through updateById API 
		const response = await fetch('http://localhost:4000' + id,{
		body:editedData,
		method:'PUT',
		credentials:'include'
		} )
		if(response.ok){
			setEditableId(null); 
				editedDescription(""); 
				editedDate(""); 
				editedPriority(""); 
				editedStatus("");
				window.location.reload(); 
		} else{
			alert(response);
		}
		
				
		 
			
	} 


	// Delete task from database 
	async function Delete(id){
       
		const response=await fetch('http://localhost:4000/deleteTodoList/',{
        method:'DELETE',
        body:JSON.stringify({ id: id }),
        credentials:'include',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header
        },
    }) 
    if(response.ok){
        console.log(response);
        window.location.reload();
      
     
      }else{
        alert('Please Login');
        
      }
	
            }
	return ( 
		<div className="container mt-5"> 
			<div className="row" > 
				<div className="col-md-10"> 
					<h2 className="text-center">TODO</h2> 
					<div className="table-responsive"> 
						<table className="table table-bordered"> 
							<thead className="table-primary"> 
								<tr> 
									<th>Title</th> 
									<th>Description</th> 
									<th>CreatedDate</th> 
									<th>Priority</th> 
									<th>Status</th> 
									<th>Actions</th> 
								</tr> 
							</thead> 
							{Array.isArray(todoList) ? ( 
								<tbody> 
									{todoList.map((data) => ( 
										<tr key={data._id}> 
											<td> 
												{editableId === data._id ? ( 
													<input 
														type="text"
														className="form-control"
														value={editedTitle} 
														onChange={(e) => setEditedTitle(e.target.value)} 
													/> 
												) : ( 
													data.title 
												)} 
											</td> 
											<td> 
												{editableId === data._id ? ( 
													<input 
														type="text"
														className="form-control"
														value={editedDescription} 
														onChange={(e) => setEditedDescription(e.target.value)} 
													/> 
												) : ( 
													data.description 
												)} 
											</td> 
											<td> 
												{editableId === data._id ? ( 
													<input 
														type="datetime-local"
														className="form-control"
														value={editedDate} 
														onChange={(e) => setEditedDate(e.target.value)} 
													/> 
												) : ( 
													data.date ? new Date(data.date).toLocaleString() : ''
												)} 
											</td> 
                                            <td> 
												{editableId === data._id ? ( 
													<input 
														type="text"
														className="form-control"
														value={editedPriority} 
														onChange={(e) => setEditedPriority(e.target.value)} 
													/> 
												) : ( 
													data.priority 
												)} 
											</td> 
											<td> 
												{editableId === data._id ? ( 
													<input 
														type="text"
														className="form-control"
														value={editedStatus} 
														onChange={(e) => setEditedStatus(e.target.value)} 
													/> 
												) : ( 
													data.status 
												)} 
											</td> 

											<td> 
												<div className="btn-group" >
													<button className="btn btn-success btn-sm" onSubmit={updatetask}> 
														Save 
													</button> 
												
													<button className="btn btn-primary btn-sm" onClick={() => toggleEditable(data._id)}> 
														Edit 
													</button> 
												 
												<button className="btn btn-danger btn-sm ml-1" onClick={() => Delete(data._id)}> 
													Delete 
												</button> 
                                                </div>
											</td> 
										</tr> 
									))} 
								</tbody> 
							) : ( 
								<tbody> 
									{/* <tr> 
										<td colSpan="4">Loading products...</td> 
									</tr>  */}
								</tbody> 
							)} 


						</table> 
					</div> 
				</div> 
				<div className="col-md-2"> 
             
                <button type="button" className="btn btn-outline-dark" onClick={handleAddTask}>
                    New Task
                </button>
                
                {showForm && <TaskForm onCancel={handleCancel} />}
                
     

                </div> 
		</div> 
        </div> 
	) 
} 
export default Todo;
