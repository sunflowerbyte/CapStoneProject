import { useState, useEffect } from 'react';
import axios from 'axios';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notices', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, [token]);

  return (
    <div>
      <h2>Notices</h2>
      <ul>
        {notices.map((notice) => (
          <li key={notice._id}>
            <strong>{notice.title}:</strong> {notice.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notices;
