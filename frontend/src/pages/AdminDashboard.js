function AdminDashboard() {
    return (
    <div>
    <h2>Admin Dashboard</h2>
    <button onClick={handleLogout}>Logout</button>
  </div>
  );
  }
  export default AdminDashboard;

  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include", // include session cookie
    });
  
    const data = await response.json();
    if (response.ok) {
      // redirect to login
      window.location.href = "/";
    } else {
      alert("Error logging out");
    }
  };
  