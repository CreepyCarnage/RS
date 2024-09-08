import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";


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
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json("Reservation not found.");
    }

    // Update room availability for each room in the reservation
    for (const reservedRoom of reservation.rooms) {
      await Room.updateOne(
        { 
          _id: reservedRoom.roomId,
          "roomNumbers.number": reservedRoom.roomNumber
        },
        {
          $pull: {
            "roomNumbers.$.unavailableDates": { 
              $gte: reservation.startDate, 
              $lte: reservation.endDate 
            },
            "roomNumbers.$.reservations": {
              bookingNumber: reservation.bookingNumber
            }
          }
        }
      );
    }

    // Delete the reservation
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("Reservation has been deleted and room availability updated.");
  } catch (err) {
    console.error("Error deleting reservation:", err);
    res.status(500).json({ message: "Error deleting reservation", error: err.message });
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


// Get reservation made by user
export const getUserReservations = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const reservations = await Reservation.find({ userId: userId })
      .populate('hotelId', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

