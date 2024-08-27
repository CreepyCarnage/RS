import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import mongoose from "mongoose";

//Create Room
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

//Update Room
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  console.log('Received request to update room availability');
  console.log('Room ID:', req.params.id);
  console.log('Request body:', req.body);
  try {
    const roomId = req.params.id; // This is the room ID
    const { roomNumber, dates, bookingNumber } = req.body;

    console.log('Updating room availability:', { roomId, roomNumber, dates, bookingNumber });

    if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
      console.log('Invalid room ID:', roomId);
      return res.status(400).json({ message: "Invalid room ID" });
    }

    if (!roomNumber) {
      console.log('Missing room number');
      return res.status(400).json({ message: "Room number is required" });
    }

    if (!bookingNumber) {
      console.log('Missing booking number');
      return res.status(400).json({ message: "Booking number is required" });
    }

    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[1]);

    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    console.log('Room availability updated:', room);
    res.status(200).json(room);
  } catch (err) {
    console.error("Error updating room availability:", err);
    res.status(500).json({ message: err.message });
  }
};

function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}


//Delete Room
export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room Data is deleted");
  } catch (err) {
    next(err);
  }
};

//Get specific Room
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

//Get All Rooms
export const getallRoom = async (req, res, next) => {
  try {
    const getroom = await Room.find();
    res.status(200).json(getroom);
  } catch (err) {
    next(err);
  }
};
