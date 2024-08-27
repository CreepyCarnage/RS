import React from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [info,setInfo] = useState({});
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value  }));
  };

  const handleClick = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append("upload_preset","upload");
    try{

      const newUser = {
        ...info,
      };

      await axios.post("/auth/register", newUser);
      alert("User has been created!")
      navigate("/login")
    } catch(err) {
      console.log(err)
    }
  };

  console.log(info)
    return (

        <div className="register">
    <div className="register-page">

      <div className="form-container">
        <h2 className="heading">Admin Register</h2>
        <form>
          <div className="input-group">

            <label htmlFor="name">Name</label>
            <input className="lInput" type="text" id="name" name="name" required 
            maxLength={50} onChange={handleChange}/>


            <label htmlFor="email">Email</label>
            <input className="lInput" type="email" id="email" name="email" required 
            maxLength={50} onChange={handleChange}/>

            <label htmlFor="phone">Phone</label>
            <input className="lInput" type="tel" id="phone" name="phone" required 
            maxLength={10} onChange={handleChange}/>

            <label htmlFor="address">Address</label>
            <input className="lInput" type="text" id="address" name="address" required 
            maxLength={100} onChange={handleChange}/>

            <label htmlFor="country">Country</label>
            <input className="lInput" type="text" id="country" name="country"
             required onChange={handleChange}/>

            <label htmlFor="username">Username</label>
            <input className="lInput" type="text" id="username" name="username" required 
            maxLength={50} onChange={handleChange}/>

            <label htmlFor="password">Password</label>
            <input className="lInput" type="password" id="password" name="password" required 
            maxLength={50} onChange={handleChange}/>
          </div>
          <button type="submit" className="lButton"
          onClick={handleClick}>Register</button>
        </form>
        <div className="links">
          Already have an account ?
            <Link to="/login" style={{ textDecoration: "none"}}>
            Back to Login
            </Link>
        </div>
      </div>
    </div>
    </div>
      );
    };
    

export default Register;