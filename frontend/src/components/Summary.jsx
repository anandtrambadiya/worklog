import { useEffect, useState } from "react";
import { getSummary } from "../api/api";

export default function Summary({ employee }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (employee) {
      getSummary(employee.id).then(setSummary);
    }
  }, [employee]);

  if (!employee) return null;

  return (
    <>
      <h3>Summary</h3>
      <p>Total Hours: {summary?.total_hours}</p>
    </>
  );
}
