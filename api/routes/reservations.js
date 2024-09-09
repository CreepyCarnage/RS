import express from "express";
import { createReservation, deleteReservation, getAllReservations,
     getReservationCount, getTotalEarnings, getUserReservations,getHotelReservations, 
     getReservation} from '../controllers/reservationController.js';

const router = express.Router();

router.get("/totalearnings", getTotalEarnings);

router.get("/count", getReservationCount);

router.get("/user/:userId", getUserReservations);

router.get("/hotels/:hotelId", getHotelReservations);

router.get('/', getAllReservations);

router.post("/create", createReservation);

router.delete("/:id", deleteReservation);

router.get("/:id", getReservation);

export default router;