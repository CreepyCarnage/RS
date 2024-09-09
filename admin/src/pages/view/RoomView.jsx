import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./RoomView.scss";

const RoomView = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/rooms/${roomId}`);
        setRoom(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch room data');
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`/rooms/${roomId}`);
        alert("Room deleted successfully");
        navigate('/rooms');
      } catch (err) {
        alert("Failed to delete room");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!room) return <div>No room found</div>;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="roomView">
          <h1 className="title">Room Details</h1>
          <div className="roomDetails">
            <div className="detailItem">
              <span className="itemKey">Title:</span>
              <span className="itemValue">{room.title}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Price:</span>
              <span className="itemValue">₹{room.price}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Max People:</span>
              <span className="itemValue">{room.maxPeople}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Description:</span>
              <span className="itemValue">{room.description}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Room Numbers and Reservations:</span>
              <div className="roomNumbersList">
                {room.roomNumbers.map((rn) => (
                  <div key={rn._id} className="roomNumberItem">
                    <h3>Room {rn.number}</h3>
                    {rn.reservations && rn.reservations.length > 0 ? (
                      rn.reservations.map((reservation, index) => (
                        <div key={index} className="reservationDetails">
                          <p><strong>Booking Number:</strong> {reservation.bookingNumber}</p>
                          <p><strong>Check-in:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
                          <p><strong>Check-out:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
                        </div>
                      ))
                    ) : (
                      <p className="available">Available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button className="deleteButton" onClick={handleDelete}>Delete Room</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomView;