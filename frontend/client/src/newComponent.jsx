import React, { useState } from 'react'
import './App.css'

function NewComponent() {
    const [Count,setCount]=useState(0);

    const handleIncrement=()=>{
        setCount((Count)=>Count+1);
    }


  return (
    <div>
        <button className='like-button' onClick={handleIncrement}>
        Like:{Count}
        </button>
    </div>
  )
}

export default NewComponent;