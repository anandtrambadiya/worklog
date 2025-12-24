import { useState } from "react";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Worklog Dashboard</h1>

      {!selectedEmployee && (
        <EmployeeList onSelectEmployee={setSelectedEmployee} />
      )}

      {selectedEmployee && (
        <div>
          <button onClick={() => setSelectedEmployee(null)}>
            ← Back
          </button>

          <h2>{selectedEmployee.name}</h2>
          <p>{selectedEmployee.email}</p>

          <p>Employee detail view (next step)</p>
        </div>
      )}
    </div>
  );
}

export default App;
