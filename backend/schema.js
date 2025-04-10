// Define Mongoose Schema
const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    domain:{type:String,required:true},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  }, { timestamps: true });
 
  
  const Item = mongoose.model("Item", itemSchema);
  module.exports=Item;


