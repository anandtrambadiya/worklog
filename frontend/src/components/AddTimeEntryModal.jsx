import { useEffect, useState } from "react";

function AddTimeEntryModal({ onClose, onSuccess }) {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!employeeId || !date || !hours) {
    setError("All fields except description are required");
    return;
  }

  if (hours < 0 || hours > 24) {
    setError("Hours must be between 0 and 24");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/time-entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employee_id: employeeId,
        date,
        hours_worked: Number(hours),
        description,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg || "Something went wrong");
      return;
    }

    // ✅ Use the actual returned data and trigger refresh
    onSuccess(); // refresh TimeEntryList AFTER backend returns the saved entry
    onClose();
  } catch (err) {
    setError("Network error");
    console.error(err);
  }
};


  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Add Time Entry</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Hours worked"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            style={inputStyle}
            min="0"
            max="24"
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
          />

          <div style={buttonContainer}>
            <button type="button" onClick={onClose} style={cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={saveBtn}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "30px 25px",
  width: "450px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "15px",
};

const inputStyle = {
  padding: "10px 12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
};

const textareaStyle = {
  padding: "10px 12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  resize: "vertical",
  minHeight: "60px",
};

const errorStyle = {
  color: "red",
  fontWeight: "bold",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const cancelBtn = {
  padding: "10px 20px",
  background: "#ccc",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const saveBtn = {
  padding: "10px 20px",
  background: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default AddTimeEntryModal;
