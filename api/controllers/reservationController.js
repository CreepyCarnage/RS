import Reservation from "../models/Reservation.js";


//Create Reservations
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

export const getReservationCount = async (req, res, next) => {
  try {
    const count = await Reservation.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};


// Get all reservations
export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find()
      .populate('userId', 'username email') // Populate user details
      .populate('hotelId', 'name') // Populate hotel name
      .sort({ createdAt: -1 }); // Sort by creation date, newest first

    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

//Delete Reservations
export const deleteReservation = async (req, res, next) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("Reservation has been deleted.");
  } catch (err) {
    next(err);
  }
};

//Fetch Total Earnings
export const getTotalEarnings = async (req, res, next) => {
  try {
    const result = await Reservation.aggregate([
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$totalAmount" }
        }
      }
    ]);
    const totalEarnings = result.length > 0 ? result[0].totalEarnings : 0;
    res.status(200).json({ totalEarnings });
  } catch (err) {
    next(err);
  }
};