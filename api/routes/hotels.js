import express from "express";
import { getLatest,countCity, countType,getHotelCount, createHotel, deleteHotel, getHotel, getHotelRooms, 
    getallHotel, updateHotel } from "../controllers/hotel.js";
import { vAdmin } from "../utils/vToken.js";

const router = express.Router();

//Create the data
router.post("/",vAdmin, createHotel);

//Update the data
router.put("/:id",vAdmin, updateHotel);

//Delete the data
router.delete("/:id",vAdmin, deleteHotel);

//Get the data of specified hotel
router.get("/find/:id", getHotel);

//Get all the data
router.get("/", getallHotel);

//Count city
router.get("/countCity", countCity);

//Count type
router.get("/countType", countType);

//Get Hotel Rooms
router.get("/room/:id", getHotelRooms);

//Count number of hotels
router.get("/countHotel", getHotelCount);

//Get Latest hotel added
router.get("/latest", getLatest);


export default router;