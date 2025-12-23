import { useState } from "react";
import { addEmployee } from "../api/api";

export default function AddEmployee({ onAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = async () => {
    const res = await addEmployee({ name, email });
    alert(res.msg);
    onAdded(); // refresh list
  };

  return (
    <>
      <h3>Add Employee</h3>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={submit}>Add</button>
    </>
  );
}
