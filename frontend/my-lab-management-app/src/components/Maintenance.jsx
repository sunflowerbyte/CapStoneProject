import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import MaintenanceRequestForm from "./MaintenanceRequestForm";
import { equipment } from "./EquipmentList";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import { format } from "date-fns";
import "../CSS/Maintenance.css";
import BackButton from "./BackButton";

function Maintenance() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/maintenance",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const enrichedRequests = response.data.map((request) => {
          const equipmentItem = equipment.find(
            (eq) => eq.id === request.equipmentId
          );
          return {
            ...request,
            equipmentName: equipmentItem?.name || "Unknown",
            department: equipmentItem?.department || "Unknown",
            dateRequested: format(
              new Date(request.createdAt),
              "dd/MM/yyyy HH:mm"
            ),
          };
        });

        setRequests(enrichedRequests);
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
      }
    };

    fetchRequests();
  }, [token]);

  const handleRequestAdded = (newRequest) => {
    const equipmentItem = equipment.find(
      (eq) => eq.id === newRequest.equipmentId
    );
    const enrichedRequest = {
      ...newRequest,
      equipmentName: equipmentItem?.name || "Unknown",
      department: equipmentItem?.department || "Unknown",
    };
    setRequests((prev) => [...prev, enrichedRequest]);
  };

  return (
    <div className="maintenance-container">
      <h2>Maintenance Requests</h2>
      <DataTable
        value={requests}
        sortField="dateRequested"
        removableSort
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20]}
      >
        <Column
          field="equipmentName"
          header="Equipment Name"
          sortable
          style={{ width: "15%" }}
        ></Column>
        <Column field="description" header="Description"></Column>
        <Column
          field="priority"
          header="Priority"
          sortable
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          sortable
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="dateRequested"
          header="Date Requested"
          sortable
          style={{ width: "15%" }}
        ></Column>
      </DataTable>
      <div className="form-and-back-button">
        <MaintenanceRequestForm onRequestAdded={handleRequestAdded} />
        <BackButton />
      </div>
    </div>
  );
}

export default Maintenance;
