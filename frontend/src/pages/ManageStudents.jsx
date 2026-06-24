import "../styles/ManageStudents.css";
import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";

function ManageStudents() {
  return (
    <div className="students-page">

      <InstructorSidebar />

      <div className="students-content">

        <Topbar />

        <div className="students-header">

          <div>
            <span>STUDENT MANAGEMENT</span>
            <h1>Manage Students</h1>
            <p>
              Monitor enrolled students and their progress.
            </p>
          </div>

        </div>

        <input
          type="text"
          placeholder="Search student..."
          className="student-search"
        />

        <div className="students-table">

          <div className="table-head">
            <span>Name</span>
            <span>Course</span>
            <span>Progress</span>
            <span>Status</span>
          </div>

          <div className="table-row">
            <span>Kritika Saxena</span>
            <span>Cyber Security</span>
            <span>82%</span>
            <span className="active">Active</span>
          </div>

          <div className="table-row">
            <span>Rahul Sharma</span>
            <span>Ethical Hacking</span>
            <span>64%</span>
            <span className="active">Active</span>
          </div>

          <div className="table-row">
            <span>Priya Verma</span>
            <span>Python For AI</span>
            <span>91%</span>
            <span className="completed">Completed</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ManageStudents;