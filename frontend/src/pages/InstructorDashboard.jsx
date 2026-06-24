import "../styles/InstructorDashboard.css";
import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";
import RecentActivities from "../components/RecentActivities";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function InstructorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="instructor-dashboard">

      <InstructorSidebar />

      <div className="instructor-content">

        <Topbar />

        {/* HERO */}

        <div className="instructor-hero">

          <div>

            <span className="hero-tag">
              INSTRUCTOR COMMAND CENTER
            </span>

            <h1>Welcome Back, Instructor</h1>

            <p>
              Manage courses, monitor student progress
              and track learning performance.
            </p>

          </div>

          <div className="hero-circle">
            <h2>245</h2>
            <span>Students</span>
          </div>

        </div>

        {/* STATS */}

        <div className="instructor-stats">

          <div
            className="stat-card"
            onClick={() => navigate("/manage-courses")}
            style={{ cursor: "pointer" }}
          >
            <h2>08</h2>
            <p>Total Courses</p>
          </div>

          <div
            className="stat-card"
            onClick={() => navigate("/students")}
            style={{ cursor: "pointer" }}
          >
            <h2>245</h2>
            <p>Students</p>
          </div>

          <div className="stat-card">
            <h2>34</h2>
            <p>Assignments</p>
          </div>

          <div className="stat-card">
            <h2>120</h2>
            <p>Certificates</p>
          </div>

        </div>

        {/* COURSE MANAGEMENT */}

        <div className="dashboard-section">

          <h2>Course Management</h2>

          <div className="course-manage-grid">

            <div className="manage-card">
              <h3>Cyber Security</h3>
              <p>120 Students</p>
              <span>12 Modules</span>

              <button
                onClick={() =>
                  navigate("/manage-courses")
                }
              >
                Edit Course
              </button>
            </div>

            <div className="manage-card">
              <h3>Ethical Hacking</h3>
              <p>85 Students</p>
              <span>8 Modules</span>

              <button
                onClick={() =>
                  navigate("/manage-courses")
                }
              >
                Edit Course
              </button>
            </div>

            <div className="manage-card">
              <h3>Python For AI</h3>
              <p>95 Students</p>
              <span>15 Modules</span>

              <button
                onClick={() =>
                  navigate("/manage-courses")
                }
              >
                Edit Course
              </button>
            </div>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="quick-actions">

          <div className="quick-card">
            <h3>Create New Course</h3>

            <p>
              Add a new learning program.
            </p>

            <button
              onClick={() =>
                navigate("/manage-courses")
              }
            >
              Create
            </button>
          </div>

          <div className="quick-card">
            <h3>Upload Content</h3>

            <p>
              Add videos, notes and assignments.
            </p>

            <button
              onClick={() =>
                navigate("/manage-courses")
              }
            >
              Upload
            </button>
          </div>

          <div className="quick-card">
            <h3>View Reports</h3>

            <p>
              Check student performance analytics.
            </p>

            <button
              onClick={() =>
                navigate("/instructor-analytics")
              }
            >
              View
            </button>
          </div>

        </div>

        {/* RECENT ACTIVITIES */}

        <RecentActivities />

        {/* TABLE + NOTIFICATIONS */}

        <div className="bottom-section">

          <div className="student-table">

            <h2>Student Performance</h2>

            <table>

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Progress</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Rahul</td>
                  <td>Cyber Security</td>
                  <td>80%</td>
                </tr>

                <tr>
                  <td>Kritika</td>
                  <td>Ethical Hacking</td>
                  <td>65%</td>
                </tr>

                <tr>
                  <td>Aman</td>
                  <td>Python For AI</td>
                  <td>92%</td>
                </tr>

              </tbody>

            </table>

          </div>

          <div className="notification-box">

            <h2>🔔 Notifications</h2>

            <div className="notification">
              <h4>New Enrollment</h4>
              <p>
                Rahul joined Cyber Security
              </p>
              <span>2 mins ago</span>
            </div>

            <div className="notification">
              <h4>Assignment Submitted</h4>
              <p>Module 5 completed</p>
              <span>20 mins ago</span>
            </div>

            <div className="notification">
              <h4>Certificate Generated</h4>
              <p>Ethical Hacking Course</p>
              <span>1 hour ago</span>
            </div>

          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default InstructorDashboard;