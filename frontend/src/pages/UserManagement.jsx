import "../styles/AdminPages.css";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

function UserManagement() {
  const [filter, setFilter] = useState("All");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kritika Saxena",
      role: "Student",
      email: "kritika@gmail.com",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      role: "Instructor",
      email: "rahul@gmail.com",
    },
    {
      id: 3,
      name: "Priya Verma",
      role: "Student",
      email: "priya@gmail.com",
    },
    {
      id: 4,
      name: "Aman Singh",
      role: "Instructor",
      email: "aman@gmail.com",
    },
  ]);

  const handleView = (user) => {
    alert(
      `Name: ${user.name}\nRole: ${user.role}\nEmail: ${user.email}`
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers =
    filter === "All"
      ? users
      : users.filter((user) => user.role === filter);

  return (
    <div className="admin-page">
      <AdminSidebar />

      <div className="admin-main">
        <Topbar />

        <h1 className="page-title">User Management</h1>

        <div className="user-filter">
          <button
            className={filter === "All" ? "active-filter" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={filter === "Student" ? "active-filter" : ""}
            onClick={() => setFilter("Student")}
          >
            Students
          </button>

          <button
            className={filter === "Instructor" ? "active-filter" : ""}
            onClick={() => setFilter("Instructor")}
          >
            Instructors
          </button>
        </div>

        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div className="user-card" key={user.id}>
              <h3>{user.name}</h3>

              <p>
                <strong>Role:</strong> {user.role}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <div className="user-actions">
                <button
                  className="view-btn"
                  onClick={() => handleView(user)}
                >
                  View
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;