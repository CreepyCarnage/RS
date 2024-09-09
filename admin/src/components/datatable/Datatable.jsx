import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useFetch(`/${path}`);

  useEffect(() => {
    if (data) {
      setList(data);
      setFilteredList(data);
    }
  }, [data]);

  useEffect(() => {
    const filteredData = list.filter((item) =>
      columns.some((column) => {
        if (typeof item[column.field] === 'string') {
          return item[column.field].toLowerCase().includes(searchTerm.toLowerCase());
        }
        
        return false;
      })
    );
    setFilteredList(filteredData);
  }, [searchTerm, list, columns]);

  const handleDelete = async (id) => {
    try {
      if (path === "rooms") {
        await axios.delete(`/${path}/${id}`);
        alert("Room deleted successfully and removed from the hotel.");
      } else {
        await axios.delete(`/${path}/${id}`);
        alert(`${path.slice(0, -1)} deleted successfully.`);
      }
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete. Please try again.");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        {path !== "reservations" && (
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        )}
      </div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredList}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;