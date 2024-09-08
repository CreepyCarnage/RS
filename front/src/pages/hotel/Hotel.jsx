import React, { useCallback, useContext, useState, useMemo, useEffect } from "react";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../components/hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoomsPrice, setSelectedRoomsPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const dayDifference = useCallback((date1, date2) => {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  }, []);

  const days = useMemo(() => {
    if (dates && Array.isArray(dates) && dates.length > 0 && dates[0]?.endDate && dates[0]?.startDate) {
      return dayDifference(dates[0].endDate, dates[0].startDate);
    }
    return 0;
  }, [dates, dayDifference]);

  useEffect(() => {
    if (selectedRoomsPrice > 0) {
      setTotalPrice(selectedRoomsPrice * days);
    } else if (data?.cheapestPrice) {
      setTotalPrice(data.cheapestPrice * days * (options?.room || 1));
    }
  }, [selectedRoomsPrice, days, data?.cheapestPrice, options?.room]);

  const handleClick = useCallback(() => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <Navbar />     
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            {data.distance} metres from airport
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ₹{data.cheapestPrice || 'N/A'} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            <Slider {...settings}>
              {data.photos?.map((photo, i) => (
                <div key={i}>
                  <img src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </Slider>
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>Enjoy the luxury and lavish environment</span>
              <h2>
                
                 ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} setSelectedRoomsPrice={setSelectedRoomsPrice} />}
    </div>
  );
};

export default Hotel;