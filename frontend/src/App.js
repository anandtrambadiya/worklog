import { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import TimeEntryList from "./components/TimeEntryList";
import AddEmployeeModal from "./components/AddEmployeeModal";
import AddTimeEntryModal from "./components/AddTimeEntryModal";
import OverallSummary from "./components/OverallSummary";
import EmployeeDetail from "./components/EmployeeDetail";
import "./App.css"; // your CSS file

function AddDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddTimeEntry, setShowAddTimeEntry] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <div className="container">
      <h1>Worklog Dashboard</h1>

      {!selectedEmployee && (
        <div className="button-group">
          <button className="btn add-employee" onClick={() => setShowAddEmployee(true)}>
            + Add Employee
          </button>
          <button className="btn add-timeentry" onClick={() => setShowAddTimeEntry(true)}>
            + Add Time Entry
          </button>
        </div>
      )}

      {/* EMPLOYEE LIST */}
      {!selectedEmployee && (
        <div className="card">
            <TimeEntryList refresh={refresh} onRefresh={triggerRefresh} />
          </div>
        
      )}

      {/* EMPLOYEE DETAIL */}
      {selectedEmployee && (
        <EmployeeDetail employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} />
      )}

      {/* DASHBOARD CONTENT */}
      {!selectedEmployee && (
        <div className="dashboard-grid">
          <div className="card">
          <EmployeeList refresh={refresh} onSelectEmployee={setSelectedEmployee} />
        </div>
          <div className="card">
            <OverallSummary refresh={refresh} />
          </div>
        </div>
      )}

      {/* MODALS */}
      {showAddEmployee && (
        <AddEmployeeModal onClose={() => setShowAddEmployee(false)} onSuccess={triggerRefresh} />
      )}
      {showAddTimeEntry && (
        <AddTimeEntryModal onClose={() => setShowAddTimeEntry(false)} onSuccess={triggerRefresh} />
      )}
    </div>
  );
}
export default AddDashboard;
