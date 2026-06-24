import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaBookOpen,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaLaptopCode,
  FaCloud,
  FaRobot,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

import "../styles/WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="welcome-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* NAVBAR */}

      <nav className="navbar">
        <div className="logo-section">
          <h1 className="logo">INTEXIA</h1>
        </div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#courses">Courses</a>
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="top-login-buttons">
          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}

      <section className="hero-section">
        <div className="hero-content">

          <p className="welcome-tag">
            NEXT GENERATION LMS PLATFORM
          </p>

          <h1>INTEXIA</h1>

          <h2>
            Smarter Learning Starts Here
          </h2>

          <p className="hero-description">
            A modern learning management platform
            designed for students, educators and
            institutions. Learn, collaborate and
            grow through a seamless digital learning
            experience.
          </p>

          <button
            className="explore-btn"
            onClick={() => navigate("/register")}
          >
            Explore Platform
          </button>

        </div>

        <div className="portal-cards">
            <div className="portal-header">
  <h2>Why Choose INTEXIA?</h2>

  <p>
    450+ Students • 35+ Courses • Smart Learning
    • AI Powered LMS Experience
  </p>
</div>
          <div className="portal-card pink">
            <FaUserGraduate />

            <div>
              <h3>Student Portal</h3>

              <p>
                Access courses, assignments,
                certificates and progress reports.
              </p>
            </div>
          </div>

          <div className="portal-card blue">
            <FaChalkboardTeacher />

            <div>
              <h3>Faculty Portal</h3>

              <p>
                Manage classes, attendance,
                assessments and student performance.
              </p>
            </div>
          </div>

          <div className="portal-card purple">
            <FaUserShield />

            <div>
              <h3>Administration Portal</h3>

              <p>
                Monitor analytics, users,
                reports and system settings.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT */}

      <section
        className="about-section"
        id="about"
      >
        <h2>About INTEXIA</h2>

        <p>
          INTEXIA is a modern Learning Management
          System built to simplify education through
          digital transformation. The platform enables
          students, faculty and administrators to
          collaborate efficiently, manage learning
          resources and track academic progress
          through a centralized environment.
        </p>
      </section>

      {/* COURSES */}

      <section
        className="courses-section"
        id="courses"
      >
        <h2 className="section-title">
          Popular Learning Tracks
        </h2>

        <div className="courses-grid">

          <div className="course-card">
            <FaLaptopCode />

            <h3>Web Development</h3>

            <p>
              HTML, CSS, JavaScript,
              React and Full Stack Development.
            </p>
          </div>

          <div className="course-card">
            <FaRobot />

            <h3>Artificial Intelligence</h3>

            <p>
              Machine Learning,
              Deep Learning and AI Systems.
            </p>
          </div>

          <div className="course-card">
            <FaCloud />

            <h3>Cloud Computing</h3>

            <p>
              AWS, Azure and
              enterprise cloud solutions.
            </p>
          </div>

          <div className="course-card">
            <FaShieldAlt />

            <h3>Cyber Security</h3>

            <p>
              Ethical Hacking,
              Security and Risk Management.
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES */}

      <section
        className="features-section"
        id="features"
      >

        <div className="feature-card">
          <FaBookOpen />
          <h3>Smart Learning</h3>
          <p>
            Access learning resources
            anytime, anywhere.
          </p>
        </div>

        <div className="feature-card">
          <FaChartLine />
          <h3>Progress Tracking</h3>
          <p>
            Monitor performance
            and achieve goals.
          </p>
        </div>

        <div className="feature-card">
          <FaShieldAlt />
          <h3>Secure Access</h3>
          <p>
            Enterprise-grade
            security protection.
          </p>
        </div>

        <div className="feature-card">
          <FaUsers />
          <h3>Connected Community</h3>
          <p>
            Learn and collaborate
            together.
          </p>
        </div>

      </section>

      {/* TESTIMONIALS */}

      <section
        className="testimonials-section"
        id="testimonials"
      >

        <h2 className="section-title">
          Student Testimonials
        </h2>

        <div className="testimonials-grid">

          <div className="testimonial-card">
            <FaQuoteLeft />

            <p>
              INTEXIA made learning simple,
              engaging and easy to track.
            </p>

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <h4>Aarav Sharma</h4>
          </div>

          <div className="testimonial-card">
            <FaQuoteLeft />

            <p>
              The faculty interaction and
              course management are excellent.
            </p>

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <h4>Priya Singh</h4>
          </div>

          <div className="testimonial-card">
            <FaQuoteLeft />

            <p>
              One of the best LMS experiences
              I have used.
            </p>

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <h4>Rahul Verma</h4>
          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="stats-section">

        <div className="stat-box">
          <h2>450+</h2>
          <span>Students</span>
        </div>

        <div className="stat-box">
          <h2>35+</h2>
          <span>Courses</span>
        </div>

        <div className="stat-box">
          <h2>22+</h2>
          <span>Faculty</span>
        </div>

        <div className="stat-box">
          <h2>87%</h2>
          <span>Success Rate</span>
        </div>

      </section>

      {/* FOOTER */}

      <footer
  className="footer"
  id="contact"
>
  © 2026 INTEXIA. All Rights Reserved.
</footer>

    </motion.div>
  );
}

export default WelcomePage;