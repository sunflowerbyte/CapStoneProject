import { useState, useEffect } from 'react';
import axios from 'axios';

function Maintenance () {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/maintenance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
      }
    };

    fetchRequests();
  }, [token]);

  return (
    <div>
      <h2>Maintenance Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {request.equipmentName} - {request.issue} ({request.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Maintenance;
