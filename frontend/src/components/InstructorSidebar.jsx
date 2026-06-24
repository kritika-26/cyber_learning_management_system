import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBookOpen,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function InstructorSidebar() {
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
          <p>Instructor Panel</p>
        </div>

        <nav className="sidebar-nav">

          <NavLink
            to="/instructor-dashboard"
            className="nav-link"
          >
            <div className="nav-item">
              <FaHome />
              <span>Dashboard</span>
            </div>
          </NavLink>

          <NavLink
            to="/manage-courses"
            className="nav-link"
          >
            <div className="nav-item">
              <FaBookOpen />
              <span>Manage Courses</span>
            </div>
          </NavLink>

          <NavLink
            to="/manage-students"
            className="nav-link"
          >
            <div className="nav-item">
              <FaUsers />
              <span>Students</span>
            </div>
          </NavLink>

          <NavLink
            to="/instructor-analytics"
            className="nav-link"
          >
            <div className="nav-item">
              <FaChartBar />
              <span>Analytics</span>
            </div>
          </NavLink>

          <NavLink
            to="/instructor-settings"
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

export default InstructorSidebar;