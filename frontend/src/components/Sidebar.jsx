import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBookOpen,
  FaChartLine,
  FaCertificate,
  FaCog,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";

function Sidebar() {
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
          <p>Cyber Learning Hub</p>
        </div>

        <nav className="sidebar-nav">

          <NavLink to="/student-dashboard" className="nav-link">
            <div className="nav-item">
              <FaHome />
              <span>Dashboard</span>
            </div>
          </NavLink>

          <NavLink to="/my-courses" className="nav-link">
            <div className="nav-item">
              <FaBookOpen />
              <span>My Courses</span>
            </div>
          </NavLink>

          <NavLink to="/progress" className="nav-link">
            <div className="nav-item">
              <FaChartLine />
              <span>Progress</span>
            </div>
          </NavLink>

          <NavLink to="/certificates" className="nav-link">
            <div className="nav-item">
              <FaCertificate />
              <span>Certificates</span>
            </div>
          </NavLink>

          <NavLink to="/settings" className="nav-link">
            <div className="nav-item">
              <FaCog />
              <span>Settings</span>
            </div>
          </NavLink>

        </nav>

        <div className="sidebar-alerts">

          <h3>
            <FaBell /> Alerts
          </h3>

          <div className="alert-card">
            Assignment Due Tomorrow
          </div>

          <div className="alert-card">
            New Lesson Available
          </div>

          <div className="alert-card">
            Certificate Ready
          </div>

        </div>

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

export default Sidebar;