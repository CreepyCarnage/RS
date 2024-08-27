import express from "express";
import { vAdmin } from "../utils/vToken.js";
import { createRoom, deleteRoom, getRoom, getallRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";

const router = express.Router();

//Create the data
router.post("/:hotelid",vAdmin, createRoom);

//Update the data
router.put("/:id",vAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//Delete the data
router.delete("/:id",vAdmin, deleteRoom);

//Get the data of specified hotel
router.get("/:id", getRoom);

//Get all the data
router.get("/", getallRoom);

export default router;