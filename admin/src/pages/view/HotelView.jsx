import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./HotelView.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const HotelView = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHotel, setEditedHotel] = useState(null);
  const [newPhotos, setNewPhotos] = useState([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelResponse = await axios.get(`/hotels/find/${hotelId}`);
        setHotel(hotelResponse.data);
        setEditedHotel(hotelResponse.data);

        const reservationsResponse = await axios.get(`/reservations/hotels/${hotelId}`);
        setReservations(reservationsResponse.data);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedHotel(hotel);
    setNewPhotos([]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.keys(editedHotel).forEach(key => {
        if (key !== 'photos') {
          formData.append(key, editedHotel[key]);
        }
      });
      newPhotos.forEach(photo => {
        formData.append('photos', photo);
      });

      const response = await axios.put(`/hotels/${hotelId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setHotel(response.data);
      setIsEditing(false);
      setNewPhotos([]);
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedHotel(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    setNewPhotos([...newPhotos, ...e.target.files]);
  };

  const handleRemovePhoto = (index) => {
    setEditedHotel(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="hotelView">
          <div className="hotelInfo">
            <h1>{hotel.name}</h1>
            <div className="infoGrid">
              {isEditing ? (
                <>
                  <p><strong>Name:<input name="name" value={editedHotel.name} onChange={handleChange} placeholder="Name" /></strong></p>
                  <p><strong>Type:<input name="type" value={editedHotel.type} onChange={handleChange} placeholder="Type" /></strong></p>
                  <p><strong>City:<input name="city" value={editedHotel.city} onChange={handleChange} placeholder="City" /></strong></p>
                  <p><strong>Address:<input name="address" value={editedHotel.address} onChange={handleChange} placeholder="Address" /></strong></p>
                  <p><strong>Description:<textarea name="desc" value={editedHotel.desc} onChange={handleChange} placeholder="Description" /></strong></p>
                  
                  <div className="photoManagement">
                    <h3>Current Photos:</h3>
                    <div className="photoGrid">
                      {editedHotel.photos.map((photo, index) => (
                        <div key={index} className="photoItem">
                          <img src={photo} alt={`Hotel ${index + 1}`} />
                          <button onClick={() => handleRemovePhoto(index)}>Remove</button>
                        </div>
                      ))}
                    </div>
                    <h3>Add New Photos:</h3>
                    <input
                      type="file"
                      multiple
                      onChange={handlePhotoUpload}
                      accept="image/*"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {hotel.name}</p>
                  <p><strong>Type:</strong> {hotel.type}</p>
                  <p><strong>City:</strong> {hotel.city}</p>
                  <p><strong>Address:</strong> {hotel.address}</p>
                  <p className="description"><strong>Description:</strong> {hotel.desc}</p>
                  
                  <div className="photoGrid">
                    {hotel.photos.map((photo, index) => (
                      <img key={index} src={photo} alt={`Hotel ${index + 1}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="actionButtons">
              {isEditing ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button onClick={handleEdit}>Edit</button>
              )}
            </div>
          </div>
          <div className="hotelReservations">
            <h2>Hotel Reservations</h2>
            {reservations.length > 0 ? (
              <div className="tableWrapper">
                <TableContainer component={Paper} className="table">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Booking Number</TableCell>
                        <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Guest</TableCell>
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
                          <TableCell className="tableCell">{reservation.userId.username}</TableCell>
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
              <p className="noReservations">No reservations found for this hotel.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelView;