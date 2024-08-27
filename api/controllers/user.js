import User from "../models/User.js";


//Update
export const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body},{new: true})
        res.status(200).json(updatedUser)
    }   catch(err){
        next(err);
    }
}

//Delete
export const deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Data is deleted");
    }   catch(err){
        next(err);
    }
}

//Get specific User
export const getUser = async (req, res, next) => {

    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }   catch(err){
        next(err);
    }
}

//Get All Users
export const getallUser = async (req, res, next) => {
    try{
        const getUser = await User.find();
        res.status(200).json(getUser);
    }   catch(err){
        next(err);
    }
}

//Get user count
export const getUserCount = async (req, res, next) => {
    try {
      const count = await User.countDocuments();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };