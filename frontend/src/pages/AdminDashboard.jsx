import "../styles/AdminDashboard.css";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import RecentActivities from "../components/RecentActivities";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const navigate = useNavigate();
  return (
    
    <div className="admin-dashboard">

      <AdminSidebar />

      <div className="admin-content">

        <Topbar />

        {/* HERO */}

        <div className="admin-hero">

          <div>

            <span>
              PLATFORM CONTROL CENTER
            </span>

            <h1>Admin Dashboard</h1>

            <p>
              Monitor users, courses and platform performance.
            </p>

          </div>

          <div className="admin-circle">
            <h2>99%</h2>
            <span>System Health</span>
          </div>

        </div>

        {/* STATS */}

        <div className="admin-stats">

          <div className="admin-card">
            <h2>540</h2>
            <p>Students</p>
          </div>

          <div className="admin-card">
            <h2>32</h2>
            <p>Instructors</p>
          </div>

          <div className="admin-card">
            <h2>48</h2>
            <p>Courses</p>
          </div>

          <div className="admin-card">
            <h2>11</h2>
            <p>Pending Approvals</p>
          </div>

        </div>

        {/* SYSTEM STATUS */}

        <div className="system-status">

          <div className="status-card">
            <h3>🟢 Database</h3>
            <p>Running Smoothly</p>
          </div>

          <div className="status-card">
            <h3>🟢 Server</h3>
            <p>99.9% Uptime</p>
          </div>

          <div className="status-card">
            <h3>🟢 API Services</h3>
            <p>All Endpoints Active</p>
          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="quick-actions">

          <div className="quick-card">
            <h3>User Management</h3>
            <p>
              View and manage all registered users.
            </p>
            <button
  onClick={() => navigate("/user-management")}
>
  Manage Users
</button>
  
          </div>

          <div className="quick-card">
            <h3>Course Approval</h3>
            <p>
              Review and approve submitted courses.
            </p>
            <button
  onClick={() => navigate("/course-approval")}
>
  Review Courses
</button>
          </div>

          <div className="quick-card">
            <h3>Platform Analytics</h3>
            <p>
              Monitor growth and performance metrics.
            </p>
            <button
  onClick={() => navigate("/platform-analytics")}
>
  View Analytics
</button>
          </div>

        </div>

        {/* RECENT ACTIVITIES */}

        <RecentActivities />

        {/* FOOTER */}

        <Footer />

      </div>

    </div>
  );
}

export default AdminDashboard;