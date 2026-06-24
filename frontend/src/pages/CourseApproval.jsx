import "../styles/AdminPages.css";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

function CourseApproval() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced Ethical Hacking",
      status: "Pending",
    },
    {
      id: 2,
      title: "Cyber Forensics",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? { ...course, status }
          : course
      )
    );
  };

  return (
    <div className="admin-page">
      <AdminSidebar />

      <div className="admin-main">
        <Topbar />

        <h1 className="page-title">
          Course Approval
        </h1>

        <div className="approval-grid">
          {courses.map((course) => (
            <div
              className="approval-card"
              key={course.id}
            >
              <h3>{course.title}</h3>

              <p>
                Submitted by Instructor
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {course.status}
              </p>

              {course.status === "Pending" ? (
                <div className="action-row">
                  <button
                    className="approve"
                    onClick={() =>
                      updateStatus(
                        course.id,
                        "Approved"
                      )
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="reject"
                    onClick={() =>
                      updateStatus(
                        course.id,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div className="status-box">
                  {course.status}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseApproval;