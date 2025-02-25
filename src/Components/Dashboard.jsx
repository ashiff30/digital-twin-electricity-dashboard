import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  BarController,
  PieController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Navbar, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Register Chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  BarController,
  PieController,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [deviceData, setDeviceData] = useState({
    voltage: Math.random() * 240,
    current: Math.random() * 10,
    power: Math.random() * 2000,
    energy: Math.random() * 100,
  });

  // ✅ Simulate real-time data updates using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setDeviceData({
        voltage: (210 + Math.random() * 30).toFixed(2),
        current: (5 + Math.random() * 5).toFixed(2),
        power: (500 + Math.random() * 1500).toFixed(2),
        energy: (50 + Math.random() * 50).toFixed(2),
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // ✅ Chart Data
  const chartLabels = ["Voltage", "Current", "Power", "Energy"];
  const chartValues = [
    deviceData.voltage,
    deviceData.current,
    deviceData.power,
    deviceData.energy,
  ];

  const lineChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Real-time Data",
        data: chartValues,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Device Stats",
        data: chartValues,
        backgroundColor: ["red", "blue", "green", "purple"],
      },
    ],
  };

  const pieChartData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: ["red", "blue", "green", "purple"],
      },
    ],
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* ✅ Full-width Navbar */}
      <Navbar bg="dark" variant="dark" className="w-100">
        <h4 className="text-white mx-3">Smart Electricity Digital Twin</h4>
      </Navbar>

      {/* ✅ Full-page Layout */}
      <div className="w-100 p-4">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="p-3 shadow-lg text-center">
              <h4>Real-time Device Data</h4>
              <Row className="mt-2">
                <Col md={3}><p><strong>Voltage:</strong> {deviceData.voltage} V</p></Col>
                <Col md={3}><p><strong>Current:</strong> {deviceData.current} A</p></Col>
                <Col md={3}><p><strong>Power:</strong> {deviceData.power} W</p></Col>
                <Col md={3}><p><strong>Energy:</strong> {deviceData.energy} kWh</p></Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* ✅ Charts - Full-width with equal spacing */}
        <Row className="mt-4">
          <Col md={6} className="mb-4">
            <Card className="p-3 shadow-lg h-100">
              <h5 className="text-center">Line Chart</h5>
              <div className="chart-container w-100">
                <Line data={lineChartData} />
              </div>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="p-3 shadow-lg h-100">
              <h5 className="text-center">Bar Chart</h5>
              <div className="chart-container w-100">
                <Bar data={barChartData} />
              </div>
            </Card>
          </Col>
        </Row>

        {/* ✅ Centered Pie Chart */}
        <Row className="mt-4 justify-content-center">
          <Col md={6}>
            <Card className="p-3 shadow-lg">
              <h5 className="text-center">Pie Chart</h5>
              <div className="chart-container w-100">
                <Pie data={pieChartData} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
