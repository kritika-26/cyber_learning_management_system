import "../styles/InstructorAnalytics.css";
import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";

function InstructorAnalytics() {
  return (
    <div className="analytics-page">

      <InstructorSidebar />

      <div className="analytics-content">

        <Topbar />

        {/* HEADER */}

        <div className="analytics-header">

          <div>
            <span>PERFORMANCE INSIGHTS</span>

            <h1>Instructor Analytics</h1>

            <p>
              Track student engagement and course performance.
            </p>
          </div>

        </div>

        {/* STATS */}

        <div className="analytics-stats">

          <div className="analytics-card">
            <h2>520</h2>
            <p>Total Students</p>
          </div>

          <div className="analytics-card">
            <h2>12</h2>
            <p>Total Courses</p>
          </div>

          <div className="analytics-card">
            <h2>89%</h2>
            <p>Completion Rate</p>
          </div>

          <div className="analytics-card">
            <h2>4.8★</h2>
            <p>Average Rating</p>
          </div>

        </div>

        {/* COURSE PERFORMANCE */}

        <div className="chart-section">

          <div className="chart-header">

            <h2>Course Performance</h2>

            <select>
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 6 Months</option>
            </select>

          </div>

          <div className="chart-grid">

            <div className="y-axis">
              <span>200</span>
              <span>160</span>
              <span>120</span>
              <span>80</span>
              <span>40</span>
              <span>0</span>
            </div>

            <div className="chart-area">

              <div className="chart-bars">

                <div className="chart-item">
                  <span className="bar-value">95</span>
                  <div className="bar bar1"></div>
                  <p>Web Dev</p>
                </div>

                <div className="chart-item">
                  <span className="bar-value">150</span>
                  <div className="bar bar2"></div>
                  <p>DSA</p>
                </div>

                <div className="chart-item">
                  <span className="bar-value">120</span>
                  <div className="bar bar3"></div>
                  <p>UI/UX</p>
                </div>

                <div className="chart-item">
                  <span className="bar-value">200</span>
                  <div className="bar bar4"></div>
                  <p>Python</p>
                </div>

                <div className="chart-item">
                  <span className="bar-value">160</span>
                  <div className="bar bar5"></div>
                  <p>ML</p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* COURSE SUMMARY */}

        <div className="analytics-summary">

          <div className="summary-card">
            <h3>🔥 Top Performing</h3>
            <p>Python Course</p>
            <span>200 Active Learners</span>
          </div>

          <div className="summary-card">
            <h3>📈 Growth Rate</h3>
            <p>+18%</p>
            <span>Compared to last month</span>
          </div>

          <div className="summary-card">
            <h3>⭐ Best Rated</h3>
            <p>Machine Learning</p>
            <span>4.9 Average Rating</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default InstructorAnalytics;