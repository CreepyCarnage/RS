import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState("");
  const [rooms, setRooms] = useState("");

  const { data, loading} = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms
      .split(",")
      .map((room) => room.trim())
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((room) => ({ number: parseInt(room) }));

    if (roomNumbers.some((room) => isNaN(room.number))) {
      alert("All room numbers must be valid numbers");
      return;
    }

    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers, hotel: hotelId });
      alert("Room added successfully!");
      // Reset form or redirect
    } catch (err) {
      console.error(err);
      alert("Failed to add room. Please try again.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleClick}>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Room Numbers (comma-separated)</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="101, 102, 103"
                  required
                />
              </div>

              <div className="formInput">
                <label>Choose a Hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                  required
                >
                  <option value="">Select a hotel</option>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>

              <button type="submit">Add Room</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;