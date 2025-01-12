import { equipment } from "./EquipmentList";
import "../Equipment.css";

function Equipment() {
  return (
    <div className="equipment-grid">
      {equipment.map((machine) => (
        <div key={machine.id} className="equipment-card">
          <img src={machine.image} alt={machine.name} className="equipment-image" />
          <h3>{machine.name}</h3>
      </div>
      ))}
    </div>
  );
}

export default Equipment;
