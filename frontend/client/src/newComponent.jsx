import React, { useState } from 'react'
import './App.css'

function NewComponent() {
    const [Count,setCount]=useState(0);
    const [Ent, setEnt] = useState([])

    const handleIncrement=()=>{
        setCount((Count)=>Count+1);
    }

    const fetchData = async()=>{
      try{
        const response = await fetch("http://localhost:5000/api/items");
        if(!response.ok){
          console.log("error")
        }
        const data = await response.json();
        setEnt(data);
      }
      catch(err){
        console.log("Error",err)
      }
    }


  return (
    <div >
        <button className='like-button' onClick={handleIncrement}>
        Like:{Count}
        </button>
        <button onClick={fetchData}>Fetch Data</button>
        <div className='container'>{
          Ent.map((item,i)=>(
            <div key={i} className='card'>
              <h3>{item.id}</h3>
              <p>{item.name}</p>
            </div>
          ))
          }</div>
    </div>
  )
}

export default NewComponent;