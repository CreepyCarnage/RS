import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

//Create Room
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room({
    ...req.body,
    hotel: hotelId
  });

  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });

    // Update hotel's cheapest price
    const cheapestRoom = await Room.findOne({ hotel: hotelId })
      .sort({ price: 1 })
      .select('price');
    
    if (cheapestRoom) {
      await Hotel.findByIdAndUpdate(hotelId, {
        cheapestPrice: cheapestRoom.price
      });
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

    // Update hotel's cheapest price if necessary
    const cheapestRoom = await Room.findOne({ hotel: updatedRoom.hotel })
      .sort({ price: 1 })
      .select('price');
    
    if (cheapestRoom) {
      await Hotel.findByIdAndUpdate(updatedRoom.hotel, {
        cheapestPrice: cheapestRoom.price
      });
    }

    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

//Updates Avalaibility of room(Disables them after booking)
export const updateRoomAvailability = async (req, res, next) => {
  try {
    const { roomNumber, dates, bookingNumber } = req.body;
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[1]);

    const result = await Room.updateOne(
      { 
        _id: req.params.id,
        "roomNumbers.number": roomNumber
      },
      {
        $push: {
          "roomNumbers.$.unavailableDates": { $each: getDatesInRange(startDate, endDate) },
          "roomNumbers.$.reservations": { bookingNumber, startDate, endDate }
        }
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Room not found or not updated" });
    }

    res.status(200).json({ message: "Room availability updated successfully" });
  } catch (err) {
    console.error("Error updating room availability:", err);
    res.status(500).json({ message: err.message });
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}


//Delete Room
export const deleteRoom = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Remove the room from the associated hotel
    await Hotel.findByIdAndUpdate(room.hotel, {
      $pull: { rooms: roomId }
    });

    // Delete the room
    await Room.findByIdAndDelete(roomId);

    // Update hotel's cheapest price
    const cheapestRoom = await Room.findOne({ hotel: room.hotel })
      .sort({ price: 1 })
      .select('price');
    
    if (cheapestRoom) {
      await Hotel.findByIdAndUpdate(room.hotel, {
        cheapestPrice: cheapestRoom.price
      });
    } else {
      // If no rooms left, set cheapestPrice to null
      await Hotel.findByIdAndUpdate(room.hotel, {
        cheapestPrice: null
      });
    }

    res.status(200).json({ message: "Room has been deleted and removed from the hotel" });
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
    const hotelId = req.query.hotelId;
    const query = hotelId ? { hotel: hotelId } : {};
    const rooms = await Room.find(query);
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};


//Fetches the available rooms
export const getRoomAvailability = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const room = await Room.find({"hotelId": hotelId});
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

 
    const roomAvailability = room.map(room => ({
      roomId: room._id,
      roomNumbers: room.roomNumbers.map(rn => ({
      number: rn.number,
      unavailableDates: rn.unavailableDates,
      reservations: rn.reservations
    }))
    }));

    res.status(200).json(roomAvailability);
  } catch (err) {
    next(err);
  }
};