import { useState } from "react";
import { addTimeEntry } from "../api/api";

export default function AddTimeEntry({ employee }) {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [desc, setDesc] = useState("");

  if (!employee) return <p>Select employee</p>;

  const submit = async () => {
    const res = await addTimeEntry({
      employee_id: employee.id,
      date,
      hours_worked: Number(hours),
      description: desc,
    });
    alert(res.msg);
  };

  return (
    <>
      <h3>Add Log for {employee.name}</h3>
      <input type="date" onChange={e => setDate(e.target.value)} />
      <input type="number" onChange={e => setHours(e.target.value)} />
      <input placeholder="Description" onChange={e => setDesc(e.target.value)} />
      <button onClick={submit}>Save</button>
    </>
  );
}
