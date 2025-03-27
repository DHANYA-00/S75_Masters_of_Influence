import React from "react";
import NewComponent from "./newComponent";
import AddInfluencer from "./AddInfluencer";
import "./App.css";

function App() {
  return (
    <>
      <div className="page">
        <h1>Welcome to My ASAP Project</h1>
        <hr />
        <p>
          This project was chosen because its both creative and functional, allowing me to explore building a platform that showcases how people can transcend their initial professions and make significant impacts in various domains.
        </p>
      </div>
      <NewComponent />
      {/* <AddInfluencer /> */}
    </>
  );
}

export default App;
