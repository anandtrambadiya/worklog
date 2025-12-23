import { useEffect, useState } from "react";
import { getEmployees } from "../api/api";

export default function EmployeeList({ onSelect }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  return (
    <>
      <h3>Employees</h3>
      <ul>
        {employees.map(e => (
          <li key={e.id} onClick={() => onSelect(e)}>
            {e.name} ({e.email})
          </li>
        ))}
      </ul>
    </>
  );
}
