import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeSummary({ employeeId }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/time-entries/summary/${employeeId}`)
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, [employeeId]);

  if (!summary) return <p>Loading summary...</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Summary</h3>
      <p><strong>This Week:</strong> {summary.weekly_hours} hrs</p>
      <p><strong>This Month:</strong> {summary.monthly_hours} hrs</p>
    </div>
  );
}

export default EmployeeSummary;
