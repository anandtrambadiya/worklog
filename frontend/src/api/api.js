const BASE_URL = "http://localhost:5000";

export const getEmployees = () =>
  fetch(`${BASE_URL}/employees`).then(res => res.json());

export const addEmployee = (data) =>
  fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const addTimeEntry = (data) =>
  fetch(`${BASE_URL}/time-entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getTimeEntries = (employeeId) =>
  fetch(`${BASE_URL}/time-entries?employeeId=${employeeId}`)
    .then(res => res.json());

export const getSummary = (employeeId) =>
  fetch(`${BASE_URL}/time-entries/summary/${employeeId}`)
    .then(res => res.json());
