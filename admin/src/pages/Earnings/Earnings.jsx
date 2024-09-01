import React, { useState, useEffect, useCallback } from 'react';
import "./earnings.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Earnings = () => {
  const [earningsData, setEarningsData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [dateRange, setDateRange] = useState('month');

  const fetchEarningsData = useCallback(async () => {
    try {
      const response = await axios.get(`/earnings?range=${dateRange}`);
      setEarningsData(response.data.earnings);
      setTotalEarnings(response.data.total);
    } catch (error) {
      console.error("Error fetching earnings data:", error);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchEarningsData();
  }, [fetchEarningsData]);

  const chartData = {
    labels: earningsData.map(item => item.date),
    datasets: [
      {
        label: 'Earnings',
        data: earningsData.map(item => item.earnings),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Earnings Over Time',
      },
    },
  };

  return (
    <div className="earnings">
      <Sidebar />
      <div className="earningsContainer">
        <Navbar />
        <div className="top">
          <h1>Earnings Overview</h1>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="bottom">
          <div className="totalEarnings">
            <h2>Total Earnings</h2>
            <p className={totalEarnings >= 0 ? "positive" : "negative"}>
            ₹{totalEarnings.toFixed(2)}
            </p>
          </div>
          <div className="chart">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;