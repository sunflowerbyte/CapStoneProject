import { useState, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { equipment } from "./EquipmentList";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import "../RequestForm.css";

function MaintenanceRequestForm({ onRequestAdded }) {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useRef(null); // Use useRef for Toast
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEquipment) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Please select an equipment.",
        life: 5000,
      });
      return;
    }

    const newRequest = {
      equipmentId: selectedEquipment.id,
      description,
      priority,
      dateRequested: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/maintenance",
        newRequest,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (onRequestAdded) {
        onRequestAdded(response.data.data);
      }

      setSelectedEquipment(null);
      setDescription("");
      setPriority("Low");
      setDialogVisible(false);

      toast.current?.show({
        severity: "success",
        summary: "Request Submitted",
        detail: "Your maintenance request has been added.",
        life: 5000,
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Submission Failed",
        detail: "Could not submit the request.",
        life: 5000,
      });
      console.error(error);
    }
  };

  const dialogFooter = (
    <div className="custom-dialog-footer">
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDialogVisible(false)}
      />
      <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} />
    </div>
  );

  return (
    <div>
        
      <Toast ref={toast} />
      <Button
      className="back-button"
        label="Add Maintenance Request"
        icon="pi pi-plus"
        onClick={() => setDialogVisible(true)}
      />
      <Dialog
        className="custom-dialog"
        visible={dialogVisible}
        style={{ width: "60em" }}
        header="Submit New Request"
        modal
        footer={dialogFooter}
        onHide={() => setDialogVisible(false)}
      >
        <form onSubmit={handleSubmit} className="request-dialog">
          <div className="form-container">
            <div className="field">
              <label htmlFor="equipment">Equipment: </label>
              <Dropdown
                id="equipment"
                value={selectedEquipment}
                options={equipment.map((eq) => ({
                  label: `${eq.name} (${eq.department})`,
                  value: eq,
                }))}
                onChange={(e) => setSelectedEquipment(e.value)}
                placeholder="Select Equipment"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="priority">Priority: </label>
              <Dropdown
                id="priority"
                value={priority}
                options={[
                  { label: "Low", value: "Low" },
                  { label: "Medium", value: "Medium" },
                  { label: "High", value: "High" },
                ]}
                onChange={(e) => setPriority(e.value)}
                placeholder="Select Priority"
                required
              />
            </div>
            <div className="field">
              <FloatLabel>
                <InputTextarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  cols={60}
                  required
                />
                <label htmlFor="description">Description</label>
              </FloatLabel>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

MaintenanceRequestForm.propTypes = {
  onRequestAdded: PropTypes.func.isRequired,
};

export default MaintenanceRequestForm;
