import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res, next) => {
  try {

    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(200).json(savedReservation);
  } catch (err) {
    console.error('Error creating reservation:', err);
    res.status(500).json({ message: err.message });
  }
};