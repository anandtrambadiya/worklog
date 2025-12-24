import { useState } from "react";

function AddEmployeeModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("All fields are required");
      return;
    }

    const res = await fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg || "Something went wrong");
      return;
    }

    onSuccess(); // refresh list
    onClose(); // close modal
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Add Employee</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
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
  width: "400px",
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
  transition: "border 0.2s",
};

const errorStyle = {
  color: "red",
  marginTop: "5px",
  fontWeight: "bold",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
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

export default AddEmployeeModal;
