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

    await userModel.findByIdAndUpdate(UserId, { $push: { cars: car._id } });
    const Addcar = await car.save();

    res.status(201).json({ Addcar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deletecar = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid car ID format" });
    }

    const Car = await carModel.findByIdAndDelete(id).populate("owner");

    if (!Car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await userModel.updateMany({}, { $pull: { cars: id } });

    res.status(200).json({ car: Car });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

