const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const maxAge = 2 * 60 * 60; // expires in 2 hours


module.exports.AddUserC = async (req, res, next) => {
  const { name, age, email, pasword } = req.body;
  const role = "client";
  console.log(req.body);

  try {
    // const user = await userModel.create({name,age,email,pasword})
    const user = new userModel({ name, age, email, pasword, role });
    const AddUser = await user.save();

    res.status(201).json({ AddUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    if (users.length === 0 && !users) {
      throw new console.error("No users found");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkIFUserExists = await userModel.findById(id);
    if (!checkIFUserExists) {
      throw new error("user not found");
    }
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, pasword } = req.body;
    const checkIFUserExists = await userModel.findById(id);
    if (!checkIFUserExists) {
      throw new error("user not found");
    }

    updated = await userModel.findByIdAndUpdate(
      id,
      { $set: { name, age, email, pasword } },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateUserPasword = async (req, res) => {
  try {
    const { id } = req.params;
    const { pasword } = req.body;
    const checkIFUserExists = await userModel.findById(id);
    if (!checkIFUserExists) {
      throw new error("user not found");
    }
    const salt = await bcrypt.genSalt();
    const user = this;
    user.paswordhach = await bcrypt.hash(pasword, salt);

    updated = await userModel.findByIdAndUpdate(
      id,
      { $set: { pasword: this.paswordhach } },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await userModel.findById(id).populate("cars");
    if (users.length === 0 && !users) {
      throw new console.error("No users found");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.AddUser = async (req, res, next) => {
  const { name, age, email, pasword } = req.body;
  const { filename } = req.file;

  const role = "client";
  console.log(req.body);

  try {
    // const user = await userModel.create({name,age,email,pasword})
    const user = new userModel({
      name,
      age,
      email,
      pasword,
      role,
      image_user: filename,
    });
    const AddUser = await user.save();

    res.status(201).json({ AddUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsersbyordercroi = async (req, res, next) => {
  try {
    const users = await userModel.find().sort({ age: -1 });
    if (users.length === 0 && !users) {
      throw new console.error("No users found");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserssup18 = async (req, res, next) => {
  try {
    const users = await userModel.find({ age: { $gt: 18 } });
    if (users.length === 0 && !users) {
      throw new console.error("No users found");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports.getUsersbyage = async (req, res, next) => {
  try {
    //const {age} = req.params;
    const age = req.params.age;
    const ageint = parseInt(age);
    const users = await userModel
      .find({ age: { $lt: ageint } })
      .sort({ age: 1 });
    if (users.length === 0 && !users) {
      throw new console.error("No users found");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports.getusersbetweenXandY = async (req, res, next) => {
  //?minage=1&maxage=80
  try {
    //const {age} = req.params;
    const minage = parseInt(req.query.minage, 10);
    const maxage = parseInt(req.query.maxage, 10);

    const users = await userModel
      .find({ age: { $gt: minage, $lt: maxage } })
      .sort({ age: 1 });
    if (users.length === 0 && !users) {
      throw new console.error("No users found");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//   module.exports.searchusersbyname= async (req, res, next) => {
//     try {
//         const name = req.query.name;

//       const users =await userModel.find({name:{$regex : name , $options : "i"}}).sort({age:1});
//       if (users.length === 0 && !users) {
//         throw new console.error("No users found");
//       }
//       res.status(200).json({ users });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };

module.exports.searchUsersByName = async (req, res, next) => {
  try {
    //const{name} = req.query;
    const name = req.query.name;

    // Vérification si le nom est fourni
    if (!name) {
      return res.status(400).json({ message: "Name query parameter is required" });
    }

    // Rechercher les utilisateurs dont le nom contient la chaîne spécifiée, en ignorant la casse
    const users = await userModel
      .find({ name: new RegExp(name, "i") })
      .sort({ age: 1 });

    // Vérification si des utilisateurs sont trouvés
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Répondre avec la liste des utilisateurs trouvés
    res.status(200).json({ users });
  } catch (err) {
    // Gestion des erreurs
    next(err); // Utiliser next pour passer l'erreur au middleware de gestion des erreurs
  }
};
   


 

const createToken = (id) => {
  return jwt.sign({id},process.env.Net_Secret,{expiresIn: maxAge})
}




module.exports.login = async (req, res) => {
  try { 
    const { email, pasword } = req.body;

    const user = await userModel.login(email, pasword);
    
    const token = createToken(user._id);
    console.log(token);
    res.cookie('this is jwttoken',token,{httpOnly : false , maxAge:maxAge*1000})


    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports.logout = async (req, res, next) => {
  try {
    
    res.cookie('this is jwstoken',null,{httpOnly : true , maxAge:1})
    res.status(200).json({ message: "user logged out" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports.getuserauth = async (req, res, next) => {
  try {
    const id = req.session.user._id;
    const users = await userModel.findByIdAndUpdate(id);
    if (users.length === 0 && !users) {
      throw new console.error("No users found");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};