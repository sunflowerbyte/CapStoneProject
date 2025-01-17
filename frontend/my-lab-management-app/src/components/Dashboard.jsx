import { Link, useNavigate } from "react-router-dom";
import "../Dashboard.css";
import Equipment from "./Equipment";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { format } from "date-fns";
import LabChecksLogo from "../assets/LabChecksLogo.svg"; // Import the logo

const customId = "custom-id-yes";

function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    const notify = "Processor has a scheduled maintenance on 10th Jan at 2 PM.";
    const postedDate = format(new Date(), "MM/dd/yyyy hh:mm a");

    const fullNotify = (
      <div>
        {notify}
        <br />
        <span className="toast-post-date">(Posted on: {postedDate})</span>
      </div>
    );

    toast.info(fullNotify, {
      toastId: customId,
      position: "top-right",
      autoClose: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <header>
          <h1 className="nav-title">
            <img className="login-image" src={LabChecksLogo} alt="Lab Checks Logo" />
            DASHBOARD
          </h1>
        </header>

        <nav className="topnav" aria-label="Main navigation">
          <ul className="topnav-list">
            <li>
              <Link to="/maintenance" className="nav-link">
                Maintenance
              </Link>
            </li>
            <li>
              <Link to="/inventory" className="nav-link">
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/notices" className="nav-link">
                Notices
              </Link>
            </li>
          </ul>
        </nav>
        <main>
          <Equipment />
        </main>
      </div>
      <button className="sign-out-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Dashboard;
