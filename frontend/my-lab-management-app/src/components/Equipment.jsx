import { equipment } from "./EquipmentList";
import "../CSS/Equipment.css";

function Equipment() {
  const handleCardClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Specifications for this equipment are not available.");
    }
  };

  return (
    <div className="equipment-grid">
      {equipment.map((machine) => (
        <div
          key={machine.id}
          className="equipment-card"
          onClick={() => handleCardClick(machine.url)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={machine.image}
            alt={machine.name}
            className="equipment-image"
          />
          <h3>{machine.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Equipment;
