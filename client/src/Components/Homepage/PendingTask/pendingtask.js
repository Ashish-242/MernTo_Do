import React from 'react'

const Pendingtask=({count})=>{
return(
<div className="card text-white bg-success mb-3">
<h2 className='info'>Pending Task </h2>
<p>{count}</p>
</div>
)
}


export default Pendingtask