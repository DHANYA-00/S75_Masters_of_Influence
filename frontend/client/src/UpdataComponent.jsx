import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './App.css'

function UpdateComponent() {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");

    useEffect(() => {
        fetchData();
    });

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/items/${id}`);
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setName(data.name);
            setDomain(data.domain);
        } catch (err) {
            console.error("Error fetching item:", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/items/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, domain }),
            });

            if (!response.ok) throw new Error("Error updating entity");
            
            navigate("/"); // Navigate back to home page after updating
        } catch (err) {
            console.error("Error updating:", err);
        }
    };

    return (
        <div className="formBox">
            <h2>Update Entity</h2>
            <form onSubmit={handleUpdate}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    value={domain} 
                    onChange={(e) => setDomain(e.target.value)} 
                    required 
                />
                <button type="submit">Update</button>
                <button onClick={() => navigate("/")}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateComponent;
