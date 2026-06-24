import "../styles/Settings.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function Settings() {
  return (
    <div className="student-dashboard">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <div className="settings-header">

          <div>
            <span className="settings-tag">
              ACCOUNT MANAGEMENT
            </span>

            <h1 className="page-title">
              Settings
            </h1>

            <p className="page-subtitle">
              Manage your profile, learning account and security preferences.
            </p>
          </div>

        </div>

        <div className="settings-container">

          {/* PROFILE SECTION */}

          <div className="settings-card">

            <h2>Personal Profile</h2>

            <div className="profile-avatar">
              KS
            </div>

            <input
              type="text"
              defaultValue="Kritika Saxena"
            />

            <input
              type="email"
              defaultValue="kritika@email.com"
            />

            <input
              type="tel"
              defaultValue="+91 9876543210"
            />

            <input
              type="text"
              defaultValue="Lucknow, India"
            />

            <button>
              Update Profile
            </button>

          </div>

          {/* ACADEMIC INFO */}

          <div className="settings-card">

            <h2>Academic Information</h2>

            <div className="detail-box">
              <span>Student ID</span>
              <h4>INTX-2026-001</h4>
            </div>

            <div className="detail-box">
              <span>Program</span>
              <h4>Cyber Security Program</h4>
            </div>

            <div className="detail-box">
              <span>Batch</span>
              <h4>Elite Batch 2026</h4>
            </div>

            <div className="detail-box">
              <span>Enrollment Date</span>
              <h4>15 January 2026</h4>
            </div>

            <div className="detail-box">
              <span>Mentor Assigned</span>
              <h4>Alex Johnson</h4>
            </div>

          </div>

          {/* SECURITY */}

          <div className="settings-card">

            <h2>Security Center</h2>

            <input
              type="password"
              placeholder="Current Password"
            />

            <input
              type="password"
              placeholder="New Password"
            />

            <input
              type="password"
              placeholder="Confirm Password"
            />

            <button>
              Change Password
            </button>

            <div className="security-info">

              <div className="detail-box">
                <span>Last Login</span>
                <h4>24 June 2026</h4>
              </div>

              <div className="detail-box">
                <span>Account Status</span>
                <h4>Protected</h4>
              </div>

            </div>

          </div>

          {/* LEARNING OVERVIEW */}

          <div className="settings-card">

            <h2>Learning Overview</h2>

            <div className="stats-grid">

              <div className="stat-box">
                <h3>12</h3>
                <span>Courses Enrolled</span>
              </div>

              <div className="stat-box">
                <h3>08</h3>
                <span>Completed</span>
              </div>

              <div className="stat-box">
                <h3>03</h3>
                <span>Certificates</span>
              </div>

              <div className="stat-box">
                <h3>128</h3>
                <span>Learning Hours</span>
              </div>

            </div>

          </div>

          {/* ACHIEVEMENTS */}

          <div className="settings-card achievement-card">

            <h2>Achievement Summary</h2>

            <div className="achievement-grid">

              <div className="achievement-item">
                <h3>Level 12</h3>
                <span>Current Rank</span>
              </div>

              <div className="achievement-item">
                <h3>2,450 XP</h3>
                <span>Experience Points</span>
              </div>

              <div className="achievement-item">
                <h3>15</h3>
                <span>Badges Earned</span>
              </div>

              <div className="achievement-item">
                <h3>82%</h3>
                <span>Completion Rate</span>
              </div>

            </div>

          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Settings;