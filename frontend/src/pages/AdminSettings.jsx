import "../styles/AdminPages.css";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

function AdminSettings() {
  const [settings, setSettings] = useState({
    adminName: "Admin",
    email: "admin@lms.com",
    platformName: "Shourya LMS",
    supportEmail: "support@shouryalms.com",
    maxCourses: "50",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem(
      "adminSettings",
      JSON.stringify(settings)
    );

    alert("Settings saved successfully!");
  };

  return (
    <div className="admin-page">
      <AdminSidebar />

      <div className="admin-main">
        <Topbar />

        <h1 className="page-title">
          Admin Settings
        </h1>

        <div className="settings-card">

          <div className="form-group">
            <label>Admin Name</label>
            <input
              type="text"
              name="adminName"
              value={settings.adminName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Platform Name</label>
            <input
              type="text"
              name="platformName"
              value={settings.platformName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Support Email</label>
            <input
              type="email"
              name="supportEmail"
              value={settings.supportEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Maximum Courses Allowed</label>
            <input
              type="number"
              name="maxCourses"
              value={settings.maxCourses}
              onChange={handleChange}
            />
          </div>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}

export default AdminSettings;