import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [info,setInfo] = useState({})

  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value  }));
  };

  const handleClick = async (e) => {
    e.preventDefault()
  
  
    try {
      const newUser = {
        ...info,
      };

      await axios.post("/auth/register", newUser);
      alert("User created successfully!"); // Add an alert here
      setInfo({}); // Reset the info state
    } catch(err) {
      console.log(err)
    }
  };
console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form >

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                  onChange={handleChange} type={input.type}
                  placeholder={input.placeholder}
                  id={input.id} 
                  value={info[input.id] || ""}
                />
                </div>
              ))}
                <div className="formInput">
                <label>Admin ?</label>
                <select id="isitAdmin" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
