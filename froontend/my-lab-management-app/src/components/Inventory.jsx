import { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inventory', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, [token]);

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item._id}>
            {item.itemName} - {item.quantity} {item.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
