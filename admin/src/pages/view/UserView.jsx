import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./userView.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UserView = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/users/${userId}`);
        setUser(userResponse.data);

        const reservationsResponse = await axios.get(`/reservations/user/${userId}`);
        setReservations(reservationsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="userView">
          <div className="userInfo">
            <h1>{user.username}</h1>
            <div className="infoGrid">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Country:</strong> {user.country}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Admin:</strong> {user.isitAdmin ? 'Yes' : 'No'}</p>
            </div>
          </div>
          <div className="userTransactions">
            <h2>User Reservations</h2>
            {reservations.length > 0 ? (
              <div className="tableWrapper">
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
                      <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Booking Number</TableCell>
                      <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Hotel</TableCell>
                      <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Check-in</TableCell>
                      <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Check-out</TableCell>
                      <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Total Amount</TableCell>
                      <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Payment Method</TableCell>
                      <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Status</TableCell>
                      </TableRow>
        </TableHead>
        <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation._id}>
                        <TableCell className="tableCell">{reservation.bookingNumber}</TableCell>
                        <TableCell className="tableCell">{reservation.hotelId.name}</TableCell>
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
              </div>
            ) : (
              <p className="noReservations">No reservations found for this user.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserView;