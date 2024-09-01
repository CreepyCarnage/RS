export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellUser">
          
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },



];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width:150,
  }  ,
  {
    field: "type",
    headerName: "Type",
    width:100,
  }  ,
  {
    field: "title",
    headerName: "Title",
    width:230,
  }  ,
  {
    field: "city",
    headerName: "City",
    width:100,
  }  ,
];

export const roomColumns  = [
  { field: "_id", headerName: "ID", width: 250 },
  {
  field: "title",
  headerName: "Title",
  width:230,
}  ,
{
  field: "description",
  headerName: "Description",
  width:200,
}  ,
{
  field: "price",
  headerName: "Price",
  width:100,
}  ,
{
  field: "maxPeople",
  headerName: "Max People",
  width:100,
}  ,
]

export const reservationColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  { 
    field: "hotelId", 
    headerName: "Hotel ID", 
    width: 220,
    renderCell: (params) => {
      return params.value && params.value._id ? params.value._id : 'N/A';
    }
  },
  { 
    field: "userId", 
    headerName: "User ID", 
    width: 220,
    renderCell: (params) => {
      return params.value && params.value._id ? params.value._id : 'N/A';
    }
  },
  { 
    field: "startDate", 
    headerName: "Start Date", 
    width: 150,
    renderCell: (params) => {
      return params.value ? new Date(params.value).toLocaleDateString() : 'N/A';
    }
  },
  { 
    field: "endDate", 
    headerName: "End Date", 
    width: 150,
    renderCell: (params) => {
      return params.value ? new Date(params.value).toLocaleDateString() : 'N/A';
    }
  },
  { 
    field: "totalAmount", 
    headerName: "Total Amount", 
    width: 130,
    renderCell: (params) => {
      return params.value ? `₹${params.value}` : 'N/A';
    }
  },
  { 
    field: "status", 
    headerName: "Status", 
    width: 120,
    renderCell: (params) => {
      return params.value ? (
        <div className={`cellStatus ${params.value}`}>
          {params.value}
        </div>
      ) : 'N/A';
    }
  },
];