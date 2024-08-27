import { useContext,useState } from "react";
import "./navbar.css";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './drop.css';

const Navbar = () => {
  const  { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const  logout = () =>  {
    localStorage.clear();
    window.location.href = '/';
  }
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="l">
        <Link to={"/"} style={{color:"inherit", textDecoration:"none"}}>
        <h1 className="logo">Royal Suites</h1>
        </Link></div>
        {user ? <>
        <div className="navItems">
        <Link to="/about" style={{ textDecoration: "none" }}>
      <button className="navButton">About Us</button>
      </Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>
      <button className="navButton">Contact Us</button>
      </Link>
        <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-button">
      {user.username}
      </button>
      {isOpen && (
        <div className="dropdown-list">
          <div className="dropdown-item" onClick={logout}>Logout</div>
        </div>
      )}
    </div></div>
    </>
        
 
           : ( 
          <div className="navItems">
            <Link to="/about" style={{ textDecoration: "none" }}>
          <button className="navButton">About Us</button>
          </Link>
            <Link to="/contact" style={{ textDecoration: "none" }}>
          <button className="navButton">Contact Us</button>
          </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="navButton">Register</button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
          <button className="navButton">Login</button>
          </Link>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar