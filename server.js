const express=require("express")
const mongoose=require('mongoose')
require('dotenv').config();
const app =express();
const PORT=4444; 

app.get("/ping",(req,res)=>{
    res.send("pong")
});

const MONGO_URI =process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(()=>console.log('Database is connected successfully!'))
.catch((err)=>{
    console.log('Error found:',err)
})

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})