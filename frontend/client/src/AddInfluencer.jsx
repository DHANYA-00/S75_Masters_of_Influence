import React from 'react'
import './App.css'
// import {useNavigate} from 'react-router-dom'

function AddInfluencer() {
    // const nav=useNavigate();
    // const handleSubmit=()=>{
    //     nav('/')
    // }

  return (
    <div className='form'>
        <form>
            <input type='text' placeholder='Name'></input><br></br>
            <select>
                <option>Domains</option>
                <option>Entertainment</option>
                <option>Fashion</option>
                <option>Fitness $ health</option>
                <option>Food</option>
                <option>Cooking</option>
                <option>Travel</option>
                <option>Life-Style</option>
            </select><br></br>
            <textarea placeholder='Achivements'></textarea><br></br>
            <input type='url' placeholder='Social-Link'></input><br></br>
            <button>Submit</button>
            <button>Cancel</button><br></br>
        </form>
    </div>
  )
}

export default AddInfluencer