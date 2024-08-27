import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required:true
    },
    rooms: [{
        roomId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Room',
          required: true
        },
        roomNumber: {
          type: Number,
          required: true
        }
      }],
    startDate: {
      type: Date,
      
    },
    endDate: {
      type: Date,
      
    },
    bookingNumber: {
      type: String,
      
      unique: true
    },
    paymentMethod: {
      type: String,
      
    },
    totalAmount: {
      type: Number,
      
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed'
    }
  }, {
    timestamps: true
  });

export default mongoose.model('Reservation', ReservationSchema);