import React from 'react'

const Completedtask=({count})=>{
return(
<div className="card text-white bg-success mb-3">
<h2>Completed Task </h2>
<p>{count}</p>
</div>
)
}


export default Completedtask