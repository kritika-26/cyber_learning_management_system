import "../styles/AdminPages.css";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
} from "recharts";

function PlatformAnalytics() {

const data = [
{ month: "Jan", students: 120 },
{ month: "Feb", students: 180 },
{ month: "Mar", students: 240 },
{ month: "Apr", students: 320 },
{ month: "May", students: 410 },
{ month: "Jun", students: 540 },
];

return ( <div className="admin-page">

```
  <AdminSidebar />

  <div className="admin-main">

    <Topbar />

    <h1 className="page-title">
      Platform Analytics
    </h1>

    <div className="analytics-grid">

      <div className="analytics-card">
        <h2>540</h2>
        <p>Total Students</p>
      </div>

      <div className="analytics-card">
        <h2>32</h2>
        <p>Total Instructors</p>
      </div>

      <div className="analytics-card">
        <h2>48</h2>
        <p>Total Courses</p>
      </div>

      <div className="analytics-card">
        <h2>89%</h2>
        <p>Completion Rate</p>
      </div>

    </div>

    <div className="chart-container">

      <h2>Student Growth</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="students"
            fill="#C48A52"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>

  </div>

</div>


);
}

export default PlatformAnalytics;
