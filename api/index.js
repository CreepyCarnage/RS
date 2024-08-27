import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import reservationsRoute from './routes/reservations.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config()


const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB")
} catch (err) {
    throw (err);
}
};


mongoose.connection.on("disconnected", ()=> {
    console.log("MongoDB Disconnected")
});


app.get("/", (req, res) => {
  res.send("Hello World")
}); 

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute); 
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/reservations", reservationsRoute);


app.listen(8800, () =>{
    connect()
    console.log("Connected to Backend")
    });