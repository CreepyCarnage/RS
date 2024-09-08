import express from "express";
import { createReservation, deleteReservation, getAllReservations, getReservationCount, getTotalEarnings, getUserReservations } from '../controllers/reservationController.js';

const router = express.Router();

router.post("/create", createReservation);

router.get("/count", getReservationCount);

router.get('/', getAllReservations);

router.delete("/:id", deleteReservation);

router.get("/totalearnings", getTotalEarnings);

router.get("/user/:userId", getUserReservations);

export default router;