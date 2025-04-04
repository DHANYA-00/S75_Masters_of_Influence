import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function NewComponent() {
    const [ent, setEnt] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [likes, setLikes] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/items");
            if (!response.ok) throw new Error("Error fetching data");
            const data = await response.json();
            setEnt(data);
            const initialLikes = {};
            data.forEach((item) => (initialLikes[item._id] = 0));
            setLikes(initialLikes);
        } catch (err) {
            console.error("Error", err);
        }
    };

    const handleAddClick = () => setShowForm(!showForm);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, domain })
            });
            if (!response.ok) throw new Error("Error adding entity");
            setName('');
            setDomain('');
            setShowForm(false);
            fetchData();
        } catch (err) {
            console.error("Error", err);
        }
    };

    const handleLike = (id) => {
        setLikes((prevLikes) => ({ ...prevLikes, [id]: prevLikes[id] + 1 }));
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/items/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Error deleting entity");
            fetchData();
        } catch (err) {
            console.error("Error", err);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    return (
        <div>
            <button onClick={fetchData}>Fetch Data</button>
            <div className='container'>
                {ent.map((item) => (
                    <div key={item._id} className='card'>
                        <p>{item.name}</p>
                        <p>{item.domain}</p>
                        <button onClick={() => handleLike(item._id)}>Like: {likes[item._id] || 0}</button>
                        <button onClick={() => handleUpdate(item._id)}>Update</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <button onClick={handleAddClick}>{showForm ? 'Close Form' : 'Add'}</button>
            {showForm && (
                <div className='formBox'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="text" placeholder="Enter domain" value={domain} onChange={(e) => setDomain(e.target.value)} required />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default NewComponent;
