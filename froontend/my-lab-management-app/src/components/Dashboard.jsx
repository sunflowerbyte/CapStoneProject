import { Link } from 'react-router-dom';
import '../Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header>
        <h1 className="nav-title">Dashboard</h1>
      </header>
      <nav className="topnav" aria-label="Main navigation">
        <ul className="topnav-list">
          <li><Link to="/maintenance" className="nav-link">Maintenance</Link></li>
          <li><Link to="/inventory" className="nav-link">Inventory</Link></li>
          <li><Link to="/notices" className="nav-link">Notices</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
