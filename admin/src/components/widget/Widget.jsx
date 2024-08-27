import React, { useState, useEffect } from "react";
import "./widget.scss";
import { Link } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import axios from "axios";

const Widget = ({ type }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        let endpoint;
        switch (type) {
          case "user":
            endpoint = "/users/count";
            break;
          case "order":
            endpoint = "/hotels/countHotel";
            break;
          default:
            return;
        }
        const response = await axios.get(endpoint, { withCredentials: true });
        setCount(response.data.count);
      } catch (error) {
        console.error(`Failed to fetch ${type} count:`, error);
      }
    };

    if (type === "user" || type === "order") {
      fetchCount();
    }
  }, [type]);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "/users",
        linkText: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "HOTELS",
        isMoney: false,
        link: "/hotels",
        linkText: "View all hotels",
        icon: (
          <ApartmentOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "/earnings",
        linkText: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "/orders",
        linkText: "View orders",
        icon: (
          <LocalShippingOutlinedIcon  
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "₹"} {(type === "user" || type === "order") ? count : 100}
        </span>
        <Link to={data.link} className="link" style={{color:"inherit", textDecoration: "none" }}>
          {data.linkText}
        </Link>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;