import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LatestHotel.scss';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const LatestHotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchLatestHotels = async () => {
      try {
        const response = await axios.get('/hotels/latest', { withCredentials: true });
        setHotels(response.data);
      } catch (error) {
        console.error('Failed to fetch latest hotels:', error);
      }
    };

    fetchLatestHotels();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>ID</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Name</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Type</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>City</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Added Date</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow key={hotel._id}>
              <TableCell className="tableCell">{hotel._id}</TableCell>
              <TableCell className="tableCell">{hotel.name}</TableCell>
              <TableCell className="tableCell">{hotel.type}</TableCell>
              <TableCell className="tableCell">{hotel.city}</TableCell>
              <TableCell className="tableCell">{new Date(hotel.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LatestHotels;