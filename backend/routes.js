const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require('./schema');
const User = require("./userSchema")


// Create Item (POST)
router.post("/items", async (req, res) => {
  const { name ,domain,created_by} = req.body;
  if (!name || !domain||!created_by) return res.status(400).json({ message: "Name is required" });

  try {
    const newItem = new Item({ name,domain,created_by });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});


// Get ALL items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find().populate('created_by', 'Name Email');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get items CREATED BY a specific user
router.get("/items/created-by/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await Item.find({ created_by: userId }).populate('created_by', 'Name Email');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});



// Get Single Item by ID (GET)
router.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Update Item (PUT)
router.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name ,domain:req.body.domain}, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Delete Item (DELETE)
router.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.post('/register',async(req,res)=>{
  try{
    const{ Name,Email,Password } =req.body;
    if(!Name||!Email||!Password){
      return res.status(400).json({
        error:'All Fields are required'
      })
    }
    if(!Name){
      return res.status(404).json({
        error:"Name is required!"
      })
    }
    if(!Email||!Email.includes('@')){
      return res.status(404).json({
        error:"Incorrect email!"
      }) 
    }
    if(!Password||!Password.length>8){
      return res.status(404).json({
        error:"Incorrect password!"
      })
    }
    const user=await User.create(req.body);
    return res.status(201).json({
      message:"Created Successfully",
      Data: user
    })
  }
  catch(err){
    return res.status(500).json({
      error:"Internal server error",
      err:err.message
    })
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "Name Email"); // Return just the name and email
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});


module.exports = router;