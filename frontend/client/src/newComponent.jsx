import React, { useState } from 'react';
import './App.css';

function NewComponent() {
    const [count, setCount] = useState(0);
    const [ent, setEnt] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/items");
            if (!response.ok) {
                console.log("error");
            }
            const data = await response.json();
            setEnt(data);
            console.log(data)
        } catch (err) {
            console.log("Error", err);
        }
    };

    const handleAddClick = () => {
        setShowForm(!showForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(domain)
        try {
            const response = await fetch("http://localhost:5000/api/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name,domain })
            });

            if (!response.ok) {
                console.log("Error while adding");
                return;
            }

            setName(''); // clear input
            setDomain('')
            setShowForm(false); // hide form
            fetchData(); // refresh list

        } catch (err) {
            console.log("Error", err);
        }
    };

    return (
        <div>
            <button className='like-button' onClick={handleIncrement}>
                Like: {count}
            </button>
            <button onClick={fetchData}>Fetch Data</button>

            <div className='container'>
                {ent.map((item, i) => (
                    <div key={i} className='card'>
                        {/* <h3>{item._id}</h3> */}
                        <p>{item.name}</p>
                        <p>{item.domain}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleAddClick}>{showForm ? 'Close Form' : 'Add'}</button>
            <div className='formBox'>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                        type="text"
                        placeholder="Enter domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                        
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>

            
        </div>
    );
}

export default NewComponent;
