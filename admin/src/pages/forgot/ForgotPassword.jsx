import React, { useState } from 'react';
import './ForgotPassword.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('/auth/forgotten', { email });

      if (response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Email not found.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };


  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Forgot Password</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="lInput"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="button">Submit</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="links">
            <Link to="/login">
            Back to login
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
