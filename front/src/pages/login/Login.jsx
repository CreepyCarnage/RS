import { useContext, useState } from "react"
import "./login.scss"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import hotelImage from '../../images/1.jpeg';
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';

const Login = () => {
    const [ credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })

    const  { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev=>({...prev, [e.target.id]:e.target.value }))
    };

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data.details});
            navigate("/")
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data});
        }
    }


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
        <h2 className="heading">Login</h2>
        <form>
        <div className="input-group">
        <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" id="username" onChange={handleChange} className="lInput" />
            </div>
            <div className="input-group">
            <label htmlFor="username">Password</label>
            <input type="password" placeholder="Password" id="password" onChange={handleChange} className="lInput" />
            </div>
            <button onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}
            </form>
            <div className="links">
            <Link to="/forgot" style={{ textDecoration: "none", float:"left"}}>
            Forgot Password?
            </Link>
            <Link to="/register" style={{ textDecoration: "none" ,float:"right"}}>
            Register
            </Link>
        </div>
        </div>
    </div>
    </div>
  );
};

export default Login;