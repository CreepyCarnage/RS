import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


//Create Hotel
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }   catch(err){
        next(err);
    }
}

//Update Hotel
export const updateHotel = async (req, res, next) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body},{new: true})
        res.status(200).json(updatedHotel)
    }   catch(err){
        next(err);
    }
}

//Delete Hotel
export const deleteHotel = async (req, res, next) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel Data is deleted");
    }   catch(err){
        next(err);
    }
}

//Get specific Hotel
export const getHotel = async (req, res, next) => {

    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }   catch(err){
        next(err);  
    }
}

//Get All Hotels
export const getallHotel = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
    try{
        const gethotel = await Hotel.find({
            ...others,
            cheapestPrice: { $gt:min | 1, $lt:max || 9999999999},
        }).limit(parseInt(req.query.limit));
        res.status(200).json(gethotel);
    }   catch(err){
        next(err);
    }
}

export const countCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
    }   catch(err){
        next(err);
    }
}


export const countType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type:"hotel" });
        const cabinCount = await Hotel.countDocuments({ type:"cabin" });
        const apartmentCount = await Hotel.countDocuments({ type:"apartment" });
        const resortCount = await Hotel.countDocuments({ type:"resort" });
        const villaCount = await Hotel.countDocuments({ type:"villa" });

        res.status(200).json([
            { type:"hotel"
                , count: hotelCount},
            { type:"cabins", count: cabinCount},
            { type:"apartments", count: apartmentCount},
            { type:"resorts", count: resortCount},
            { type:"villas", count: villaCount}
        ]);
    }   catch(err) {
        next(err);
    }
};

export const getHotelRooms = async (req,res,next) => {
    try {
        
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
            return Room.findById(room);
        })
    );
        res.status(200).json(list);
    } catch(err) {
        next(err);
    }
};


//Get user count
export const getHotelCount = async (req, res, next) => {
    try {
      const count = await Hotel.countDocuments();
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };

  export const getLatest = async (req, res, next) => {
    try {
      const latestHotels = await Hotel.find()
        .sort({ createdAt: -1 })
        .limit(5);
      res.status(200).json(latestHotels);
    } catch (err) {
      next(err);
    }
  };