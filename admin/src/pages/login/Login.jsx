import { useContext, useState } from "react";
import "./login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import hotelImage from '../../images/1.jpg';
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';

const Login = () => {
    const [ credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })
    const  {dispatch} = useContext(AuthContext);
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev=>({...prev, [e.target.id]:e.target.value }))
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setError('');
        dispatch({type:"LOGIN_START"})
        try{
            console.log("Sending credentials:", credentials)
            const res = await axios.post("/auth/login", credentials);
            console.log("Login response:", res.data);
            if(res.data.isitAdmin){
            dispatch({type:"LOGIN_SUCCESS", payload: res.data.details});

            navigate("/");
        } else {
            dispatch({type:"LOGIN_FAILURE", payload:{message:"Not allowed!"}});
            setError('You are not allowed');
        }
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data});
            setError('Invalid Email or Password');
        }
    };


  return (
    <div className="login">
    <div className="login-page">
      <div className="image-container">
        <img src={hotelImage} alt="Hotel" />
      </div>
      <div className="form-container">
      <div className="logo-container">
          <img src={logo} alt="Hotel Logo" className="logo" />
        </div>
        <h2>Admin Login</h2>
        <form onSubmit={handleClick}>
        <div className="input-group">
        <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" id="username" onChange={handleChange} className="lInput" required/>
            </div>
            <div className="input-group">
            <label htmlFor="username">Password</label>
            <input type="password" placeholder="Password" id="password" onChange={handleChange} className="lInput" required />
            </div>
            <button className="lButton">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <div className="links">
            <Link to="/forgot" style={{ textDecoration: "none", float:"left"}}>
            Forgot Password?
            </Link>

        </div>
        </div>
    </div>
    </div>
  );
};

export default Login;