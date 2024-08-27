import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name:{
        type: String,
        
    },
    type:{
        type: String,
        
    },
    city:{
        type: String,
        
    },
    address:{
        type: String,
        
    },
    distance:{
        type: String,
        
    },
    title: {
        type: String,

    },    
    photos:{
        type: [String]
       
    },
    desc:{
        type: String,
        
    },
    rating:{
        type: Number,
        min:0,
        max:5
    }, 
    rooms:{
        type: [String]
    },
    cheapestPrice: {
        type:Number,
        
    },
    featured: {
        type:Boolean,
        default:false
    },
    
},
{
    timestamps : true
}
);

export default mongoose.model("Hotel", HotelSchema);