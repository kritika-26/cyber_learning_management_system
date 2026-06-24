import "../styles/CourseDetails.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import trishul from "../assets/trishul.png";

function CourseDetails() {
  const navigate = useNavigate();

  return (
    <div className="course-details-page">

      <Sidebar />

      <div className="course-details-content">

        <Topbar />

        {/* HERO */}

        <div className="course-hero">

          <div className="course-left">

            <span className="course-tag">
              CYBER SECURITY TRACK
            </span>

            <h1>
              Cyber Security Basics
            </h1>

            <p>
              Learn cybersecurity fundamentals,
              networking concepts, ethical hacking,
              penetration testing and defense systems.
            </p>

            <div className="course-stats">

              <div>
                <h3>24</h3>
                <span>Lessons</span>
              </div>

              <div>
                <h3>12h</h3>
                <span>Duration</span>
              </div>

              <div>
                <h3>60%</h3>
                <span>Completed</span>
              </div>

            </div>

            <button
              className="start-learning-btn"
              onClick={() => navigate("/video-learning")}
            >
              Start Learning →
            </button>

          </div>

          <div className="course-right">
            <img src={trishul} alt="Course" />
          </div>

        </div>

        {/* COURSE PROGRESS */}

        <div className="progress-section">

          <div className="progress-card">

            <h2>Your Progress</h2>

            <div className="progress-top">
              <span>Completed</span>
              <span>60%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "60%" }}
              ></div>
            </div>

          </div>

        </div>

        {/* SKILLS */}

        <div className="skills-section">

          <h2>Skills You'll Learn</h2>

          <div className="skills-grid">

            <div className="skill-card">
              Network Security
            </div>

            <div className="skill-card">
              Threat Analysis
            </div>

            <div className="skill-card">
              Ethical Hacking
            </div>

            <div className="skill-card">
              Penetration Testing
            </div>

            <div className="skill-card">
              Malware Detection
            </div>

            <div className="skill-card">
              Cyber Defense
            </div>

          </div>

        </div>

        {/* MODULES */}

        <div className="module-section">

          <h2>Course Modules</h2>

          <div className="module-grid">

            <div className="module-card">
              <span>01</span>
              Introduction To Cyber Security
            </div>

            <div className="module-card">
              <span>02</span>
              Networking Fundamentals
            </div>

            <div className="module-card">
              <span>03</span>
              Security Concepts
            </div>

            <div className="module-card">
              <span>04</span>
              Ethical Hacking
            </div>

            <div className="module-card">
              <span>05</span>
              Penetration Testing
            </div>

            <div className="module-card">
              <span>06</span>
              Final Assessment
            </div>

          </div>

        </div>

        {/* INSTRUCTOR */}

        <div className="instructor-card">

          <h2>Instructor</h2>

          <h3>Shourya Cyber Academy</h3>

          <p>
            Certified Cyber Security Experts with
            industry experience in Ethical Hacking,
            Digital Forensics and Security Operations.
          </p>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default CourseDetails;