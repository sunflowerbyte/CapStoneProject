import { Link } from "react-router-dom";
import "../CSS/BackButton.css";

function BackButton() {
  return (
    <Link to="/dashboard">
      <button className="back-button">Back to Dashboard</button>
    </Link>
  );
}

export default BackButton;
