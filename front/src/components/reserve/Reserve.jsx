import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../hooks/useFetch"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import { useNavigate } from "react-router-dom";
import "./reserve.css"

const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const {data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
    const {dates} = useContext(SearchContext);

    const navigate = useNavigate()

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

        return !isFound
    }
    
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const [roomId, roomNumberId, actualRoomNumber] = value.split(',');
        
        setSelectedRooms(prevSelectedRooms => {
          if (checked) {
            // Check if the roomId already exists
            const existingRoomIndex = prevSelectedRooms.findIndex(room => room.roomId === roomId);
            
            if (existingRoomIndex !== -1) {
              // If roomId exists, add the new room number to the existing entry
              const updatedRoom = {
                ...prevSelectedRooms[existingRoomIndex],
                roomNumbers: [...prevSelectedRooms[existingRoomIndex].roomNumbers, parseInt(actualRoomNumber, 10)]
              };
              return [
                ...prevSelectedRooms.slice(0, existingRoomIndex),
                updatedRoom,
                ...prevSelectedRooms.slice(existingRoomIndex + 1)
              ];
            } else {
              // If roomId doesn't exist, create a new entry
              return [...prevSelectedRooms, { roomId, roomNumbers: [parseInt(actualRoomNumber, 10)] }];
            }
          } else {
            // If unchecked, remove the room number from the roomId
            return prevSelectedRooms.map(room => {
              if (room.roomId === roomId) {
                return {
                  ...room,
                  roomNumbers: room.roomNumbers.filter(num => num !== parseInt(actualRoomNumber, 10))
                };
              }
              return room;
            }).filter(room => room.roomNumbers.length > 0); // Remove entries with no room numbers
          }
        });
      };

  const handleClick = () => {
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
                                        disabled={!isAvailable(roomNumber)} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="rButton" onClick={handleClick}>Reserve Now</button>
            </div>
        </div>
    );
};

export default Reserve;