import React from 'react';
import './ContactUs.scss';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <div className="left-column">
        <h1 className="title">Contact Us</h1>
        <p className="subtitle">Drop us a message for business inquiries</p>
        <div className="contact-info">
          <p>royalsuites@gmail.com</p>
          <p>+91 1234567890</p>
          <br/>
          <p><b>Customer Support Portal</b></p>
        </div>
        <form className="form">
          <input className="input" type="text" placeholder="First name*" required />
          <input className="input" type="text" placeholder="Last name*" required />
          <input className="input" type="email" placeholder="Email address*" required />
          <input className="input" type="tel" placeholder="Phone number*" />
          <input className="input" type="text" placeholder="Company (optional)" />
          <textarea className="textarea" placeholder="Message*" required></textarea>
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
      <div className="right-column">
        <h1 className="title">Our Location</h1>
        <p>Udaipur</p>
        <p>Rajasthan, India</p>
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe 
            title="Udaipur"
              className="gmapiframe" 
              width="100%" 
              height="400px"
              frameborder="0" 
              scrolling="no" 
              marginheight="0" 
              marginwidth="0" 
              src="https://maps.google.com/maps?width=650&amp;height=400&amp;hl=en&amp;q=udaipur&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
