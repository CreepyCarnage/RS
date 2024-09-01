import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleImageUpload = async () => {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/db426k8ip/image/upload",
          data
        );
        return uploadRes.data.url;
      });

      return await Promise.all(uploadPromises);
    } catch (err) {
      console.error("Error uploading images:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = await handleImageUpload();

      const newHotel = {
        ...info,
        photos: imageUrls,
      };

      await axios.post("/hotels", newHotel);
      alert("Hotel created successfully!");
      navigate("/hotels"); // Redirect to hotels list
    } catch (err) {
      console.error("Error creating hotel:", err);
      alert("Hotel creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files.length
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select id={input.id} onChange={handleChange} required>
                      <option value="">Select a {input.label}</option>
                      {input.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={input.id}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      required
                    />
                  )}
                </div>
              ))}

              <div className="formInput">
                <label>Description</label>
                <textarea
                  id="desc"
                  onChange={handleChange}
                  placeholder="Description..."
                  rows={5}
                  required
                />
              </div>

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Hotel"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;