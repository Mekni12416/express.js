const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({

  brand : String,
  model : String,
  type : String,
  year : Number ,
  owner : {type : mongoose.Schema.Types.ObjectId , ref :"User"}






})

const Car = mongoose.model("Car",carSchema);

module.exports = Car;