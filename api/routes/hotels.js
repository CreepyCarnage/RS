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
router.get("/countCity", countCity);
router.get("/countType", countType);
router.get("/room/:id", getHotelRooms);
router.get("/countHotel", getHotelCount);
router.get("/latest", getLatest);


export default router;