import { Link } from "react-router-dom";
import "../BackButton.css"; // Optional: Add custom styles for the button

function BackButton() {
  return (
    <Link to="/dashboard">
      <button className="back-button">Back to Dashboard</button>
    </Link>
  );
}

export default BackButton;
