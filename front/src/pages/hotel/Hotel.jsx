import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useContext, useState, useMemo } from "react";
import useFetch from "../../components/hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const handleOpen = useCallback((i) => {
    setSlideNumber(i);
    setOpen(true);
  }, []);

  const handleMove = useCallback((direction) => {
    if (!data?.photos) return;
    setSlideNumber((prev) => {
      if (direction === "l") {
        return (prev - 1 + data.photos.length) % data.photos.length;
      }
      return (prev + 1) % data.photos.length;
    });
  }, [data?.photos]);

  const handleClick = useCallback(() => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <Navbar />     
      <div className="hotelContainer">
        {open && data.photos && data.photos.length > 0 && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow left"
              onClick={() => handleMove("l")}
            />
            <div className="hotelImgWrapper">
              <img 
                src={data.photos[slideNumber]} 
                alt="" 
                className="hotelImg" 
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow right"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
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
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
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
              <b>₹{days * (data?.cheapestPrice || 0) * (options?.room || 1)}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;