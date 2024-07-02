const carModel = require("../Models/carModel");
const userModel = require("../Models/userModel");


module.exports.getallCar = async (req, res) => {
    try {
        const cars = await carModel.find();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports.getcarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await carModel.findById(id).populate("owner");
    if (!car) {
      
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ car });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports.Addcar = async (req, res, next) => {
  try {
    const { brand, model, UserId } = req.body;

    const user = await userModel.findById(UserId);
    if (!user) {
      throw new Error("User not found");
    }

    const car = new carModel({ brand, model, owner: UserId });
    
    await userModel.findByIdAndUpdate( UserId , {$push : {cars : car._id}});
    const Addcar = await car.save();

    res.status(201).json({ Addcar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  


  
module.exports.deletecar = async (req, res, next) => {
    
  
  try {
    const {id} = req.body;
    const Car = await carModel.findByIdAndDelete(id);


    res.status(201).json({ car: Car });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



