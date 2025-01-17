import { useParams } from "react-router-dom";
import "./ProductSpecifications.css";

// Specifications data for each equipment
const specifications = {
  1: {
    name: "Processor",
    details: [
      { label: "Dimensions", value: "1500 x 857 x 721 mm" },
      { label: "Weight", value: "331 kg" },
      { label: "Voltage", value: "100 to 120 V~" },
    ],
  },
  2: {
    name: "Cryostat",
    details: [
      { label: "Dimensions", value: "1800 x 950 x 750 mm" },
      { label: "Weight", value: "280 kg" },
      { label: "Voltage", value: "220 to 240 V~" },
    ],
  },
  3: {
    name: "Histostainer",
    details: [
      { label: "Cassette Capacity", value: "600 (High-Capacity)" },
      { label: "Voltage", value: "100 to 120 V~" },
      { label: "Max Temp", value: "35°C" },
    ],
  },
  // Add more entries for other equipment...
};

function EquipmentSpecifications() {
  const { id } = useParams(); // Get the equipment id from the route
  const spec = specifications[id]; // Fetch specifications by id

  if (!spec) {
    return <p>Specifications not found for this equipment.</p>;
  }

  return (
    <div className="specifications-container">
      <h2>{spec.name} Specifications</h2>
      <table className="specifications-table">
        <tbody>
          {spec.details.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentSpecifications;
