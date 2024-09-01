import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/reservations", { withCredentials: true });
        // Sort reservations by date (assuming there's a createdAt field)
        const sortedReservations = response.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        // Get only the last 5 reservations
        setReservations(sortedReservations.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
        setError("Failed to load reservations. Please try again later.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Booking ID</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Hotel</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Customer</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Check-in Date</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Check-out Date</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Amount</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Payment Method</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation._id}>
              <TableCell className="tableCell">{reservation._id}</TableCell>
              <TableCell className="tableCell">{reservation.hotelId?.name || 'N/A'}</TableCell>
              <TableCell className="tableCell">{reservation.userId?.username || 'N/A'}</TableCell>
              <TableCell className="tableCell">{new Date(reservation.startDate).toLocaleDateString()}</TableCell>
              <TableCell className="tableCell">{new Date(reservation.endDate).toLocaleDateString()}</TableCell>
              <TableCell className="tableCell">₹{reservation.totalAmount}</TableCell>
              <TableCell className="tableCell">{reservation.paymentMethod}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${reservation.status}`}>{reservation.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;