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
    roomNumbers: [{number:Number, unavailableDates: { type: [Date] }}],
},
{
    timestamps : true
}
);


export default mongoose.model("Room", RoomSchema);