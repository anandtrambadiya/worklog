// src/components/OverallSummary.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function OverallSummary({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch all employees
    axios
      .get("http://localhost:5000/employees")
      .then((res) => {
        const employees = res.data;

        // Fetch total hours for each employee
        return Promise.all(
          employees.map((emp) =>
            axios
              .get(`http://localhost:5000/time-entries/summary/${emp.id}`)
              .then((res) => ({
                name: emp.name,
                total_hours: res.data.total_hours || 0,
              }))
          )
        );
      })
      .then((arr) => {
        // Sort by total hours descending
        setData(arr.sort((a, b) => b.total_hours - a.total_hours));
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  return (
    <div
  style={{
    marginTop: "20px",
    width: "100%",
    maxWidth: "100%",      // prevent overflow
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#f9f9f9",
    boxSizing: "border-box", // include padding in width
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    overflowX: "auto",        // in case of many employees
  }}
>
  <h3 style={{ marginBottom: "15px" }}>Employee Total Hours</h3>
  <div style={{ width: "100%", height: 400, minWidth: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total_hours" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

  );
}

export default OverallSummary;
