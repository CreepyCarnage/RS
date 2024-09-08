import React, { useState, useContext, useEffect, useMemo } from 'react';
import './PaymentPage.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { simulatePayment, generateBookingNumber } from '../../utils/paymentUtils';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('debit-card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const { selectedRooms, hotelId, dates } = location.state || {};

  const nights = useMemo(() => {
    if (!dates) return 0;
    const start = new Date(dates.startDate);
    const end = new Date(dates.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }, [dates]);

  const { nightlyCost, totalAmount } = useMemo(() => {
    if (!selectedRooms || selectedRooms.length === 0) return { nightlyCost: 0, totalAmount: 0 };
    const nightly = selectedRooms.reduce((total, room) => total + room.price, 0);
    return {
      nightlyCost: nightly,
      totalAmount: nightly * nights
    };
  }, [selectedRooms, nights]);


  useEffect(() => {
    if (!selectedRooms || selectedRooms.length === 0) {
      setError("No rooms selected. Please go back and select rooms.");
    }
  }, [selectedRooms]);

  const handleCardDetailsChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (paymentMethod === 'debit-card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        setError('Please fill in all credit card details');
        return false;
      }
      // Add more specific validations for card number, expiry, and CVV
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        setError('Please enter a valid UPI ID');
        return false;
      }
      // Add UPI ID format validation
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const newBookingNumber = generateBookingNumber();
    setBookingNumber(newBookingNumber);
    setIsProcessing(true);
    setError('');
  
    try {
      let paymentResult;
      if (paymentMethod !== 'cash') {
        paymentResult = await simulatePayment(paymentMethod, totalAmount);
      } else {
        paymentResult = { success: true, message: "Cash payment to be made at check-in" };
      }
  
      if (paymentResult.success) {
        const startDate = new Date(dates.startDate).toISOString();
        const endDate = new Date(dates.endDate).toISOString();
  
        const rooms = selectedRooms.map((room) => ({
          roomId: room.roomId,
          roomNumber: parseInt(room.actualRoomNumber, 10)
        }));
  
        const reservationData = {
          userId: user._id,
          hotelId,
          rooms,
          startDate,
          endDate,
          bookingNumber: newBookingNumber,
          paymentMethod,
          totalAmount,
          transactionId: paymentResult.transactionId || 'cash_payment'
        };
  
        const reservationResponse = await axios.post('/reservations/create', reservationData);
  
        if (reservationResponse.status === 200) {
          await Promise.all(rooms.map((room) => 
            axios.put(`/rooms/availability/${room.roomId}`, {
              roomNumber: room.roomNumber,
              dates: [startDate, endDate],
              bookingNumber: newBookingNumber
            })
          ));
  
          setIsSubmitted(true);
        } else {
          throw new Error('Reservation creation failed');
        }
      } else {
        throw new Error(paymentResult.message);
      }
    } catch (err) {
      console.error("Error during payment and reservation:", err);
      setError(err.message || "An error occurred during payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container payment-contain">
        <div className="alert alert-success payment-success" role="alert">
          <h4 className="alert-heading">Payment Successful!</h4>
          <p>Your booking has been confirmed. Thank you for choosing our hotel.</p>
          <div className="booking-number-container">
            <p>Your booking number is:</p>
            <span className="booking-number">{bookingNumber}</span>
            <p>Please keep this number for your records.</p>
          </div>
          <Link to={"/"}>
            <button className='btn btn-primary home-button'>
              Back to Home Page
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-contain">
      <div className="card payment-card">
        <div className="card-body">
          <h2 className="card-title payment-title">Payment Details</h2>
          <p className="card-text payment-subtitle">Please select your payment method and enter the required information.</p>
          
          <div className="total-amount">
            <h3>Total Amount: ₹{totalAmount}</h3>
            <p>₹{nightlyCost} per night for {nights} night(s)</p>
          </div>

          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4 payment-methods">
              {['debit-card', 'upi', 'cash'].map((method) => (
                <div className="form-check payment-method" key={method}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id={method}
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    aria-label={`Select ${method} payment method`}
                  />
                  <label className="form-check-label" htmlFor={method}>
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            {paymentMethod === 'debit-card' && (
              <div className="debit-card-form">
                {['name', 'number', 'expiry', 'cvv'].map((field) => (
                  <div className={`mb-3 ${field === 'expiry' || field === 'cvv' ? 'col-md-6' : ''}`} key={field}>
                    <label htmlFor={field} className="form-label">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'cvv' ? 'password' : 'text'}
                      className="form-control"
                      id={field}
                      name={field}
                      value={cardDetails[field]}
                      onChange={handleCardDetailsChange}
                      required
                      aria-label={`Enter card ${field}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="mb-3 upi-form">
                <label htmlFor="upiId" className="form-label">UPI ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="upiId"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  placeholder="Enter UPI ID"
                />
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="alert alert-info cash-info" role="alert">
                Pay at the hotel during check-in
              </div>
            )}

            <button type="submit" className="btn btn-primary payment-button" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : paymentMethod === 'cash' ? 'Confirm Booking' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;