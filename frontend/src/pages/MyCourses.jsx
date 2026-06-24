import "../styles/MyCourses.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import cyberSecurity from "../assets/Cyber_Security.jpeg";
import ethicalHacking from "../assets/Ethical_Hacking.jpeg";
import pythonAI from "../assets/Python.jpeg";

function MyCourses() {
  const navigate = useNavigate();

  return (
    <div className="student-dashboard">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        {/* HEADER */}

        <div className="courses-header">

          <div>

            <span className="courses-tag">
              LEARNING PATH
            </span>

            <h1 className="page-title">
              My Courses
            </h1>

            <p>
              Continue your enrolled courses and track your learning journey.
            </p>

          </div>

          <div className="course-count">
            <h2>04</h2>
            <span>Active Courses</span>
          </div>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          className="course-search"
          placeholder="Search your courses..."
        />

        {/* STATS */}

        <div className="learning-stats">

          <div className="learning-card">
            <h2>128</h2>
            <p>Learning Hours</p>
          </div>

          <div className="learning-card">
            <h2>68%</h2>
            <p>Average Progress</p>
          </div>

          <div className="learning-card">
            <h2>03</h2>
            <p>Certificates Earned</p>
          </div>

        </div>

        {/* COURSES */}

        <div className="course-grid">

          {/* COURSE 1 */}

          <div
            className="course-card"
            onClick={() => navigate("/course-details")}
          >

            <div className="course-image">

              <img
                src={cyberSecurity}
                alt="Cyber Security"
              />

              <span className="course-badge">
                Advanced
              </span>

            </div>

            <div className="course-content">

              <h3>Cyber Security Basics</h3>

              <p>
                Master cyber threats, security architecture,
                penetration defense and protection systems.
              </p>

              <div className="course-meta">
                <span>24 Lessons</span>
                <span>12 Hours</span>
              </div>

              <div className="progress-top">
                <span>Progress</span>
                <span>60%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "60%" }}
                />
              </div>

              <div className="course-status">
                In Progress
              </div>

              <button>
                Continue Learning →
              </button>

            </div>

          </div>

          {/* COURSE 2 */}

          <div
            className="course-card"
            onClick={() => navigate("/course-details")}
          >

            <div className="course-image">

              <img
                src={ethicalHacking}
                alt="Ethical Hacking"
              />

              <span className="course-badge">
                Intermediate
              </span>

            </div>

            <div className="course-content">

              <h3>Ethical Hacking</h3>

              <p>
                Learn penetration testing,
                vulnerability assessment and
                ethical hacking methodologies.
              </p>

              <div className="course-meta">
                <span>18 Lessons</span>
                <span>8 Hours</span>
              </div>

              <div className="progress-top">
                <span>Progress</span>
                <span>35%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "35%" }}
                />
              </div>

              <div className="course-status">
                In Progress
              </div>

              <button>
                Continue Learning →
              </button>

            </div>

          </div>

          {/* COURSE 3 */}

          <div
            className="course-card"
            onClick={() => navigate("/course-details")}
          >

            <div className="course-image">

              <img
                src={pythonAI}
                alt="Python AI"
              />

              <span className="course-badge">
                Beginner
              </span>

            </div>

            <div className="course-content">

              <h3>Python For AI</h3>

              <p>
                Build AI applications using Python,
                Machine Learning and Deep Learning tools.
              </p>

              <div className="course-meta">
                <span>30 Lessons</span>
                <span>15 Hours</span>
              </div>

              <div className="progress-top">
                <span>Progress</span>
                <span>80%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "80%" }}
                />
              </div>

              <div className="course-status completed">
                Nearly Complete
              </div>

              <button>
                Continue Learning →
              </button>

            </div>

          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default MyCourses;