import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ReservationView.scss";

const ReservationView = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/reservations/${reservationId}`);
        setReservation(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch reservation data');
        setIsLoading(false);
      }
    };

    fetchReservation();
  }, [reservationId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await axios.delete(`/reservations/${reservationId}`);
        alert("Reservation deleted successfully");
        navigate('/reservations');
      } catch (err) {
        alert("Failed to delete reservation");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!reservation) return <div>No reservation found</div>;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="reservationView">
            <div className="reservationInfo">
          <h1 className="title">Reservation Details</h1>
          <div className="reservationDetails">
            <div className="detailItem">
              <span className="itemKey">Booking Number:</span>
              <span className="itemValue">{reservation.bookingNumber}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Guest:</span>
              <span className="itemValue">{reservation.userId?.username || 'N/A'}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Hotel:</span>
              <span className="itemValue">{reservation.hotelId?.name || 'N/A'}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Start Date:</span>
              <span className="itemValue">{new Date(reservation.startDate).toLocaleDateString()}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">End Date:</span>
              <span className="itemValue">{new Date(reservation.endDate).toLocaleDateString()}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Total Amount:</span>
              <span className="itemValue">₹{reservation.totalAmount}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Payment Method:</span>
              <span className="itemValue">{reservation.paymentMethod}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Status:</span>
              <span className="itemValue">{reservation.status}</span>
            </div>
            <button className="deleteButton" onClick={handleDelete}>Delete Reservation</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ReservationView;