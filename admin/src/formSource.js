import countries from './context/countries'; 

export const userInputs = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "ram_lal",
    },
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Ram Lal",
    },
    {
      id: "email",
      label: "Email",
      type: "mail",
      placeholder: "ramlal@gmail.com",
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
      placeholder: "+123456789",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      placeholder: "Delhi",
    },
    {
    id: "country",
    label: "Country",
    type: "select",
    options: countries.map(country => ({ value: country, label: country })),
    placeholder: "Select a country",
    }
  ];
  
  
  export const hotelInputs = [
    {
      id: "name",
      label: "name",
      type: "text",
      placeholder: "My hotel",
    },
    {
      id: "type",
      label: "type",
      type: "select",
      options: [
        { value: "hotel", label: "hotel" },
      ],
    },
    {
      id: "city",
      label: "City",
      type: "select",
      options: [
        { value: "Kerala", label: "Kerala" },
        { value: "Mumbai", label: "Mumbai" },
        { value: "Banglore", label: "Banglore" },
        { value: "Goa", label: "Goa" },
        { value: "Kashmir", label: "Kashmir" },
      ],
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      placeholder: "Chandni Chowk",
    },
    {
      id: "distance",
      label: "Distance",
      type: "text",
      placeholder: "500",
    },
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Best Hotel",
    }
  ];
  
  export const roomInputs = [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "2 bed room",
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      placeholder: "King size bed and bathroom",
    },
    {
      id: "price",
      label: "Price",
      type: "number",
      placeholder: "100",
    },
    {
      id: "maxPeople",
      label: "Max People",
      type: "number",
      placeholder: "2",
    },
  ];
  