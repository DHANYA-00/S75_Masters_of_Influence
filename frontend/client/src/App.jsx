import React from "react";
import { Routes, Route } from "react-router-dom";
import NewComponent from "./newComponent";
import UpdateComponent from "./UpdataComponent"; // Import the update page

function App() {
  return (
    <div className="page">
      <h1>Welcome to My ASAP Project</h1>
      <hr />
      <h2 className="main">Masters Of Influence</h2>

      <Routes>
        <Route path="/" element={<NewComponent />} />
        <Route path="/update/:id" element={<UpdateComponent />} /> {/* New Update Page Route */}
      </Routes>
    </div>
  );
}

export default App;
