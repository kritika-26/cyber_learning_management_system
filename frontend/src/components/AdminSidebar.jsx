import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaBook,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="sidebar">

      <div>

        <div className="sidebar-header">
          <h1>INTEXIA</h1>
          <p>Admin Panel</p>
        </div>

        <nav className="sidebar-nav">

          <NavLink
            to="/admin-dashboard"
            className="nav-link"
          >
            <div className="nav-item">
              <FaHome />
              <span>Dashboard</span>
            </div>
          </NavLink>

          <NavLink
            to="/user-management"
            className="nav-link"
          >
            <div className="nav-item">
              <FaUsers />
              <span>Users</span>
            </div>
          </NavLink>

          <NavLink
            to="/course-approval"
            className="nav-link"
          >
            <div className="nav-item">
              <FaBook />
              <span>Course Approval</span>
            </div>
          </NavLink>

          <NavLink
            to="/platform-analytics"
            className="nav-link"
          >
            <div className="nav-item">
              <FaChartBar />
              <span>Analytics</span>
            </div>
          </NavLink>

          <NavLink
            to="/admin-settings"
            className="nav-link"
          >
            <div className="nav-item">
              <FaCog />
              <span>Settings</span>
            </div>
          </NavLink>

        </nav>

      </div>

      <div className="sidebar-footer">

        <div
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>

      </div>

    </aside>
  );
}

export default AdminSidebar;