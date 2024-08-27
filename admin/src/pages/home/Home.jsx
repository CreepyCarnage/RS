import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";
import LatestHotels from "../../components/LatestHotels/LatestHotels.jsx";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>

        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
        <div className="listContainer">
        <div className="listTitle">Newly Added Hotels</div>
        <LatestHotels />
        </div>
      </div>
    </div>
  );
};

export default Home;