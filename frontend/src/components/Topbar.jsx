import "./Topbar.css";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Topbar() {
const { user } = useAuth();

const today = new Date().toLocaleDateString("en-IN", {
day: "numeric",
month: "long",
year: "numeric",
});

return ( <div className="topbar">


  <div className="topbar-left">

    <div className="search-box">
      <FaSearch />

      <input
        type="text"
        placeholder="Search courses..."
      />
    </div>

  </div>

  <div className="topbar-right">

    <div className="date-box">
      {today}
    </div>

    <div className="user-profile">

      <div className="avatar">
        {(user?.name?.charAt(0) || "S").toUpperCase()}
      </div>

      <div className="user-info">
        <h4>{user?.name || "Student"}</h4>
        <p>{user?.role || "Student"}</p>
      </div>

    </div>

  </div>

</div>


);
}

export default Topbar;
