import "../styles/InstructorSettings.css";
import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";

function InstructorSettings() {
  return (
    <div className="settings-page">

      <InstructorSidebar />

      <div className="settings-content">

        <Topbar />

        <div className="settings-header">

          <div>
            <span>ACCOUNT SETTINGS</span>

            <h1>Instructor Settings</h1>

            <p>
              Manage your profile, contact details and
              teaching preferences.
            </p>
          </div>

        </div>

        <div className="settings-card">

          <h2>Profile Information</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              placeholder="Enter mobile number"
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              placeholder="Cyber Security Trainer"
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              placeholder="5 Years"
            />
          </div>

          <h2>Change Password</h2>

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Current Password"
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="New Password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <h2>Notification Preferences</h2>

          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              New Student Enrollments
            </label>

            <label>
              <input type="checkbox" />
              Assignment Submissions
            </label>

            <label>
              <input type="checkbox" />
              Course Updates
            </label>
          </div>

          <button className="save-btn">
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default InstructorSettings;