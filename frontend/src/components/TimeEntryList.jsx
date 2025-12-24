import { useEffect, useState } from "react";
import axios from "axios";

function TimeEntryList({ refresh, onRefresh }) {
  const [entries, setEntries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editHours, setEditHours] = useState(0);

  // Fetch employees once
  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch time entries whenever refresh changes
  useEffect(() => {
    axios
      .get("http://localhost:5000/time-entries")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err));
  }, [refresh]);

  const getEmployeeName = (id) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? emp.name : "Unknown";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    await axios.delete(`http://localhost:5000/time-entries/${id}`);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    onRefresh();
  };

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditHours(entry.hours_worked);
  };

  const saveEdit = async (id) => {
    if (editHours < 0 || editHours > 24) {
      alert("Hours must be 0–24");
      return;
    }

    await axios.put(`http://localhost:5000/time-entries/${id}`, {
      hours_worked: Number(editHours),
    });

    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, hours_worked: editHours } : e))
    );
    setEditingId(null);
    onRefresh();
  };

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Date</th>
          <th>Hours</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={e.id}>
            <td>{getEmployeeName(e.employee_id)}</td>
            <td>{e.date}</td>
            <td>
              {editingId === e.id ? (
                <input
                  type="number"
                  value={editHours}
                  onChange={(ev) => setEditHours(ev.target.value)}
                  min="0"
                  max="24"
                  style={{ width: "60px" }}
                />
              ) : (
                e.hours_worked
              )}
            </td>
            <td>{e.description}</td>
            <td>
              {editingId === e.id ? (
                <>
                  <button onClick={() => saveEdit(e.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(e)}>Edit</button>
                  <button onClick={() => handleDelete(e.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TimeEntryList;
