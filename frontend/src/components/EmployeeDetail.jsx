import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDetail({ employee, onBack }) {
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState({
    weekly_hours: 0,
    monthly_hours: 0
  });

  useEffect(() => {
    // Fetch time entries
    axios
      .get(`http://localhost:5000/time-entries?employeeId=${employee.id}`)
      .then(res => setEntries(res.data))
      .catch(err => console.error(err));

    // Fetch weekly & monthly summary
    axios
      .get(`http://localhost:5000/time-entries/summary/${employee.id}`)
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, [employee.id]);

  return (
    <div>
      <button onClick={onBack}>← Back</button>

      <h2>{employee.name}</h2>
      <p>{employee.email}</p>

      {/* SUMMARY */}
      <div style={{ marginTop: "15px" }}>
        <h3>Summary</h3>
        <p><strong>This Week:</strong> {summary.weekly_hours} hrs</p>
        <p><strong>This Month:</strong> {summary.monthly_hours} hrs</p>
      </div>

      {/* TIME ENTRIES */}
      <h3>Time Entries</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 && (
            <tr>
              <td colSpan="3">No entries found</td>
            </tr>
          )}

          {entries.map(e => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.hours_worked}</td>
              <td>{e.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDetail;
