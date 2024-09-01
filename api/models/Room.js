import mongoose from 'mongoose';
const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        unique:true,
        required:true
    },
    price:{
        type: Number,
        required:true
        
    },
    maxPeople:{
        type: Number,

        
    },

    description:{
        type: String,

    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
      },
    roomNumbers: [{
        number: Number,
        unavailableDates: { type: [Date] },
        reservations: [{
          bookingNumber: String,
          startDate: Date,
          endDate: Date
        }]
      }],
    
},
{
    timestamps : true
}
);


export default mongoose.model("Room", RoomSchema);