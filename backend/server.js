const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const app = express();
const PORT = 5000;
const URI=process.env.URI;

mongoose.connect(URI)
.then(()=>{
    console.log('MongoDB connected successfully')
})
.catch(()=>{
    console.log('Failed connect MongoDB')
})


app.use(express.json());
app.use(cors()); 


app.get("/ping", (req, res) => {
    res.send("pong");
});


app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});