const userModel = require('../Models/userModel');

module.exports.AddUserC = async (req,res,next)=>{
    const {name,age,email,pasword} = req.body;
    const role = 'client';
    console.log(req.body);

    try{
        // const user = await userModel.create({name,age,email,pasword})
         const user = new userModel({name,age,email,pasword,role});
         const AddUser = await user.save();
         
         res.status(201).json({AddUser});
    }catch(err){
        res.status(500).json({message : err.message});
    }

}





module.exports.getUsers = async (req,res,next)=>{
    try{
        const users = await userModel.find();
        if(users.length===0 && !users){
            throw new console.error("No users found");
        }
        res.status(200).json({users});

    }catch(err){
        res.status(500).json({message : err.message})
    }
}





module.exports.deleteUser = async (req,res,next) =>{
    try{
        const{id} = req.params;
        const checkIFUserExists = await userModel.findById(id);
        if(!checkIFUserExists){
            throw new error("user not found");

        }
       await userModel.findByIdAndDelete(id);
       res.status(200).json({message : "user deleted"})
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports.updateUser = async (req,res)=>{
   try{
    const{id} = req.params;
    const{name,age,email,pasword} = req.body;
    const checkIFUserExists = await userModel.findById(id);
    if(!checkIFUserExists){
        throw new error("user not found");

    }

    updated = await userModel.findByIdAndUpdate(id,{$set:{name,age,email,pasword}},{new:true})
      res.status(200).json(updated)
   }catch(err){
        res.status(500).json({message : err.message})
      }

}


module.exports.updateUserPasword = async (req,res)=>{
    try{
     const{id} = req.params;
     const{pasword} = req.body;
     const checkIFUserExists = await userModel.findById(id);
     if(!checkIFUserExists){
         throw new error("user not found");
 
     }
 
     updated = await userModel.findByIdAndUpdate(id,{$set:{pasword}},{new:true})
       res.status(200).json(updated)
    }catch(err){
         res.status(500).json({message : err.message})
       }
 
 }



module.exports.getUserById = async (req,res,next)=>{
    try{
        const{id} = req.params;
        const users = await userModel.findById(id);
        if(users.length===0 && !users){
            throw new console.error("No users found");
        }
        res.status(200).json({users});

    }catch(err){
        res.status(500).json({message : err.message})
    }
}


module.exports.AddUser = async (req,res,next)=>{
    const {name,age,email,pasword} = req.body;
    const{filename} = req.file;

    const role = 'client';
    console.log(req.body);

    try{
        // const user = await userModel.create({name,age,email,pasword})
         const user = new userModel({name,age,email,pasword,role,image_user:filename});
         const AddUser = await user.save();
         
         res.status(201).json({AddUser});
    }catch(err){
        res.status(500).json({message : err.message});
    }

}