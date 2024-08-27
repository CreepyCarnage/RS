import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    country:{
        type: String,
        required:true
    },
    isitAdmin: {
        type:Boolean,
        default:false
    },
    
},
{
    timestamps : true
}
);

export default mongoose.model("User", UserSchema);