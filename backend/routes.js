const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define Mongoose Schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  domain:{type:String,required:true}
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

// Create Item (POST)
router.post("/items", async (req, res) => {
  const { name ,domain} = req.body;
  if (!name || !domain) return res.status(400).json({ message: "Name is required" });

  try {
    const newItem = new Item({ name,domain });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get All Items (GET)
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
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

module.exports = router;