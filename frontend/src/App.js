import { useState } from "react";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import AddTimeEntry from "./components/AddTimeEntry";
import Summary from "./components/Summary";

export default function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <h1>WorkLog Dashboard</h1>

      <AddEmployee onAdded={() => setRefresh(!refresh)} />

      <EmployeeList onSelect={setSelectedEmployee} key={refresh} />

      <AddTimeEntry employee={selectedEmployee} />

      <Summary employee={selectedEmployee} />
    </>
  );
}