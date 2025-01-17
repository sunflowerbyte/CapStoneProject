import { useState, useRef } from "react";
import axios from "axios";
import { consumables } from "./ConsumablesList"; // Import consumables array
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import "../RequestForm.css"; // Add custom CSS for styling

function InventoryRequestForm({ onRequestAdded }) {
  const [selectedConsumable, setSelectedConsumable] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Urgent");
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useRef(null); // Use useRef instead of useState
  const token = localStorage.getItem("token");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedConsumable || quantity <= 0) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Please select a consumable and enter a valid quantity.",
        life: 5000,
      });
      return;
    }

    const newRequest = {
      consumableId: selectedConsumable.id,
      quantity,
      description,
      status,
      dateRequested: new Date().toISOString(),
    };

    console.log("Submitting Payload:", newRequest); // Debugging log


    try {
      const response = await axios.post(
        "http://localhost:8080/api/inventory",
        newRequest,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Response Data:", response.data.item); // Debugging log


      // Notify parent about the new request
      if (onRequestAdded) {
        onRequestAdded(response.data.data);
      }

      // Reset form and close dialog
      setSelectedConsumable(null);
      setQuantity(1);
      setDescription("");
      setDialogVisible(false);

      toast.current?.show({
        severity: "success",
        summary: "Request Submitted",
        detail: "Your order has been added.",
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
    <div>
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
    <div className="custom-dialog">
      <Toast ref={toast} /> {/* Pass ref properly */}
      <Button
        label="New Inventory Request"
        icon="pi pi-plus"
        onClick={() => setDialogVisible(true)}
      />
      <Dialog
        visible={dialogVisible}
        style={{ width: "50em" }}
        header="Submit New Inventory Request"
        modal
        footer={dialogFooter}
        onHide={() => setDialogVisible(false)}
      >
        <form onSubmit={handleSubmit} className="request-dialog">
          <div className="field">
            <label htmlFor="consumable">Consumable:</label>
            <Dropdown
              id="consumable"
              value={selectedConsumable}
              options={consumables.map((item) => ({
                label: `${item.name} (${item.category})`,
                value: item,
              }))}
              onChange={(e) => setSelectedConsumable(e.value)}
              placeholder="Select Consumable"
              required
              className="w-full md:w-14rem"
            />
          </div>
          <div className="field">
            <label htmlFor="quantity">Quantity:</label>
            <InputNumber
              id="quantity"
              value={quantity}
              onValueChange={(e) => setQuantity(e.value)}
              min={1}
              placeholder="Enter Quantity"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description:</label>
            <InputTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              cols={50}
              placeholder="Optional: Add a description"
            />
          </div>
          <div>
            <div>
            <label>Urgent </label>
            <RadioButton
              inputId="status1"
              value="Urgent"
              onChange={(e) => setStatus(e.target.value)} // Use e.target.value
              checked={status === "Urgent"}
            />
            </div>
            <div><label> Routine</label>
            <RadioButton
              inputId="status2"
              value="Routine"
              onChange={(e) => setStatus(e.target.value)} // Use e.target.value
              checked={status === "Routine"}
            />
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

InventoryRequestForm.propTypes = {
  onRequestAdded: PropTypes.func.isRequired,
};

export default InventoryRequestForm;
