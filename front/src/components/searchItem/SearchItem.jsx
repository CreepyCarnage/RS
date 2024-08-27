import React from "react";
import "./searchItem.css";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  console.log(item);

  // Function to get the photo URL
  const getPhotoUrl = (photoPath) => {
    // If the photoPath is a full URL, return it as is
    if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
      return photoPath;
    }
    // Otherwise, assume it's a relative path and prepend the API path
    return `${photoPath}`;
  };

  return (
    <div className="searchItem">
      <img
        src={item.photos && item.photos.length > 0 ? getPhotoUrl(item.photos[0]) : '/default-image.jpg'}
        alt={item.name}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">₹{item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;