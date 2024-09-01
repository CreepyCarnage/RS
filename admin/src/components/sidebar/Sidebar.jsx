import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const  logout = () =>  {
  localStorage.clear();          
  window.location.href = '/login';

}

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Royal Suites admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{color:"inherit", textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{color:"inherit", textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotels" style={{color:"inherit", textDecoration: "none" }}>
            <li>
              <ApartmentOutlinedIcon className="icon" />
              <span >Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" style={{color:"inherit", textDecoration: "none" }}>
          <li>
            <KingBedOutlinedIcon className="icon" />
            <span>Rooms</span>
          </li>
          </Link>
          <Link to="/reservations" style={{color:"inherit", textDecoration: "none" }}>
          <li>
            <ConfirmationNumberOutlinedIcon className="icon" />
            <span>Reservations</span>
          </li>
          </Link>

          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
