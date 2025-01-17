import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { consumables } from "./ConsumablesList";
import InventoryRequestForm from "./InventoryRequestForm";
import { format } from "date-fns";
import { Tag } from "primereact/tag";
import BackButton from "./BackButton";
import "../Inventory.css";

function Inventory() {
  const [inventory, setInventoryRequest] = useState([]);
  const [error, setError] = useState(""); // For error handling
  const token = localStorage.getItem("token");

  //Fetch
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/inventory", {
          headers: { Authorization: `Bearer ${token}` },
        });

// Debugging log
        console.log("Fetched Inventory Data:", response.data); 

//Mapping response data
        const enrichedRequest = response.data.map((request) => {
          const consumableItem = consumables.find((item) => item.id === request.consumableId);

          let formattedDate = "N/A"; // Default fallback if `createdAt` is invalid
          try {
            if (request.createdAt) {
              formattedDate = format(new Date(request.createdAt), "dd/MM/yyyy HH:mm");
            }
          } catch (error) {
            console.error("Error formatting date:", request.createdAt, error);
          }
        

          return {
            ...request,
            consumableName: consumableItem?.name || "Unknown",
            category: consumableItem?.category || "Unknown",
            unit: consumableItem?.unit || "Unknown",
            dateRequested: formattedDate,
          };
        });

        setInventoryRequest(enrichedRequest);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setError("Failed to fetch inventory data. Please try again later.");
      }
    };

    fetchInventory();
  }, [token]);


  const handleRequestAdded = (newRequest) => {const consumableItem = consumables.find(
      (item) => item.id === newRequest.consumableId
    );


    const enrichedRequest = {
      ...newRequest,
      consumableName: consumableItem?.name || "Unknown",
      category: consumableItem?.category || "Unknown",
      unit: consumableItem?.unit || "Unknown",
      status: newRequest.status || "Urgent",
    };

    setInventoryRequest((prev) => [...prev, enrichedRequest]);
  };

  const getSeverity = (status) => {
    switch (status) {
      case "Urgent":
        return "warning";
      case "Routine":
        return "success";
      default:
        return "info";
    }
  };

  return (
    <div className="inventory-container">
      <h2>Consumables & Reagents</h2>
      {error && <p className="error-message">{error}</p>}
      <DataTable
        value={inventory}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20]}
      >
        <Column field="consumableName" header="Consumable Name" sortable />
        <Column field="category" header="Category" sortable />
        <Column field="quantity" header="Quantity" sortable />
        <Column field="dateRequested" header="Date Requested" sortable />
        <Column
          field="status"
          header="Status"
          body={(rowData) => (
            <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
          )}
          sortable
        />
      </DataTable>
      <div className="form-and-back-button">
      <InventoryRequestForm onRequestAdded={handleRequestAdded} />
      <BackButton />
    </div>
  </div>
);
}

export default Inventory;
