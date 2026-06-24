import "../styles/Certificates.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function Certificates() {
  return (
    <div className="student-dashboard">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <div className="certificates-header">

          <div>

            <span className="certificate-tag">
              ACHIEVEMENTS & RECOGNITION
            </span>

            <h1 className="page-title">
              My Certificates
            </h1>

            <p className="page-subtitle">
              Showcase your achievements and completed courses.
            </p>

          </div>

          <div className="certificate-count">
            <h2>03</h2>
            <span>Certificates Earned</span>
          </div>

        </div>

        <div className="certificate-grid">

          <div className="certificate-card">

            <div className="certificate-badge">
              🏆
            </div>

            <h2>Cyber Security Basics</h2>

            <p>
              Successfully completed the course.
            </p>

            <span className="issue-date">
              Issued: 15 June 2026
            </span>

            <button>
              Download Certificate
            </button>

          </div>

          <div className="certificate-card">

            <div className="certificate-badge">
              🎖️
            </div>

            <h2>Ethical Hacking</h2>

            <p>
              Successfully completed the course.
            </p>

            <span className="issue-date">
              Issued: 10 May 2026
            </span>

            <button>
              Download Certificate
            </button>

          </div>

          <div className="certificate-card">

            <div className="certificate-badge">
              🥇
            </div>

            <h2>Python For AI</h2>

            <p>
              Successfully completed the course.
            </p>

            <span className="issue-date">
              Issued: 28 April 2026
            </span>

            <button>
              Download Certificate
            </button>

          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Certificates;