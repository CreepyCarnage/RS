import express from "express";
import { createReservation, deleteReservation, getAllReservations, getReservationCount, getTotalEarnings } from '../controllers/reservationController.js';

const router = express.Router();

router.post("/create", createReservation);

router.get("/count", getReservationCount);

router.get('/', getAllReservations);

router.delete("/:id", deleteReservation);

router.get("/totalearnings", getTotalEarnings);

export default router;