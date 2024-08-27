import express from "express";

import { updateUser, deleteUser,getUser,getallUser,getUserCount } from "../controllers/user.js";
import { vToken,verifyUser,vAdmin } from "../utils/vToken.js";

const router = express.Router();

router.get("/authentication", vToken, (req,res,next) =>{
    res.send("Logged In")
})

router.get("/checkauth/:id", verifyUser, (req,res,next) =>{
    res.send("You can delete your account")
})

router.get("/checkadmin/:id", vAdmin, (req,res,next) =>{
    res.send("Admin logged in with the permissions")
}) 

//Get all the data
router.get("/",vAdmin, getallUser)

//Get user count
router.get("/count", vAdmin, getUserCount);

//Update the data
router.put("/:id",verifyUser, updateUser);

//Delete the data
router.delete("/:id",verifyUser, deleteUser);

//Get the data of specified hotel
router.get("/:id",verifyUser, getUser)


export default router;