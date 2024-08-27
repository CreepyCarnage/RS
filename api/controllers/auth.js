import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";



export const register = async (req,res,next) => {
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const newUser = new User({
            ...req.body,
            password:hash,
        })

        await newUser.save()
        res.status(201).send("User has been created successfully")
    }
    catch(err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
      console.log("Login attempt for username:", req.body.username);
      
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        console.log("User not found");
        return next(createError(404, "User not Found"));
      }
      
      console.log("User found, comparing passwords");
      const PassCorrect = await bcrypt.compare(req.body.password, user.password);
      console.log("Password correct:", PassCorrect);
      
      if (!PassCorrect) {
        console.log("Password incorrect, denying access");
        return next(createError(400, "Username or Password Incorrect"));
      }
      
      console.log("Password correct, generating token");
      const token = jwt.sign({ id: user._id, isitAdmin: user.isitAdmin }, process.env.JWT);
  
      const { password, isitAdmin, ...others } = user._doc;
      console.log("Sending successful response");
      res.cookie("access_token", token, {
        httpOnly: true,
      }).status(200).json({ details: { ...others }, isitAdmin });
    } catch (err) {
      console.error("Login error:", err);
      next(err);
    }
  };

export const forgotten = async (req,res,next) => {
        const { email } = req.body;
    try {
        const user = await User.findOne({ email });
    
        if (user) {
          res.status(200).json({ message: 'Password reset instructions has been sent to your email' });
        } else {
          res.status(404).json({ message: 'Email not found.' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error.' });
      }
    };
    