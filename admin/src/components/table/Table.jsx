import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "",
      img: "",
      customer: "random 1",
      date: "1 March",
      amount: 785,
      method: "Cash ",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "",
      img: "",
      customer: "Random 2",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "",
      img: "",
      customer: "Random 3",
      date: "1 March",
      amount: 35,
      method: "Cash ",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "",
      img: "",
      customer: "Random 4",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "",
      img: "",
      customer: "Random 5",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Tracking ID</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Hotel</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Customer</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Date</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Amount</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Payment Method</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold',fontSize:'16px'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">₹{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
