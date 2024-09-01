import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../hooks/useFetch"
import { useContext, useState, useEffect } from "react"
import { SearchContext } from "../../context/SearchContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./reserve.css"

const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const {data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
    const {dates, options} = useContext(SearchContext);
    const [roomAvailability, setRoomAvailability] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchRoomAvailability = async () => {
            try {
                const response = await axios.get(`/rooms/availability/${hotelId}`);
                setRoomAvailability(response.data);
            } catch (error) {
                console.error("Error fetching room availability:", error);
            }
        };

        fetchRoomAvailability();
    }, [hotelId]);

    const getDateInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let dates = []

        while(date <= end){
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return dates
    };

    const alldates = getDateInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date =>
            alldates.includes(new Date(date).getTime())
        );

        const isReserved = roomAvailability.some(room => 
            room.number === roomNumber.number && 
            room.reservations.some(reservation => 
                new Date(reservation.startDate) <= new Date(dates[0].endDate) &&
                new Date(reservation.endDate) >= new Date(dates[0].startDate)
            )
        );

        return !isFound && !isReserved;
    }
    
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const [roomId, roomNumberId, actualRoomNumber] = value.split(',');
        
        setSelectedRooms(prev => {
            if (checked) {
                if (prev.length >= options.room) {
                    alert(`You can only select ${options.room} room(s) based on your search criteria.`);
                    e.target.checked = false;
                    return prev;
                }
                return [...prev, { roomId, roomNumberId, actualRoomNumber }];
            } else {
                return prev.filter(item => item.roomNumberId !== roomNumberId);
            }
        });
    };

    const handleClick = () => {
        if (selectedRooms.length === 0) {
            alert("Please select at least one room before reserving.");
            return;
        }
        if (selectedRooms.length !== options.room) {
            alert(`Please select exactly ${options.room} room(s) based on your search criteria.`);
            return;
        }
        navigate("/payment", { 
            state: { 
                selectedRooms,
                hotelId,
                dates: {
                    startDate: dates[0].startDate,
                    endDate: dates[0].endDate
                },
            } 
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon 
                    icon={faCircleXmark} 
                    className="rClose" 
                    onClick={() => setOpen(false)}
                />
                <span>Select your Rooms: </span>
                <p>You need to select {options.room} room(s) based on your search criteria.</p>
                {data.map((item) => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room" key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input 
                                        type="checkbox" 
                                        value={`${item._id},${roomNumber._id},${roomNumber.number}`} 
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber) || (selectedRooms.length >= options.room && !selectedRooms.some(r => r.roomNumberId === roomNumber._id))}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button 
                    className="rButton" 
                    onClick={handleClick} 
                    disabled={selectedRooms.length !== options.room}
                >
                    Reserve Now
                </button>
            </div>
        </div>
    );
};

export default Reserve;