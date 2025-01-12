import { Link } from "react-router-dom";
import "../Dashboard.css";
import Equipment from "./Equipment";
import { toast } from "react-toastify";
import { useEffect } from "react";

const customId ="custom-id-yes";

function Dashboard() {
  useEffect(()=> {
    const notify = ("Processor has a scheduled maintenance on 10th Jan at 2 PM.");
    const postedDate = new Date().toLocaleString();

    const fullNotify = `${notify} (Posted on: ${postedDate})`
     
      toast.info(fullNotify,{
        toastId:customId,
        position: "top-right",
        autoClose: false, 
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    
  },[]);
  



  return (
    <div className="dashboard-container">
      <header>
        <h1 className="nav-title">Dashboard</h1>
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
      <div />
      <main>
        <Equipment></Equipment>
      </main>
    </div>
  );
}

export default Dashboard;
