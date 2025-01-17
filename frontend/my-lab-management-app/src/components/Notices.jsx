import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "../CSS/Notices.css";
import BackButton from "./BackButton";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/notices", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, [token]);

  const handleAddReply = async (noticeId) => {
    if (!replyText.trim()) {
      alert("Reply text cannot be empty!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/notices/${noticeId}/replies`,
        { text: replyText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotices((prevNotices) =>
        prevNotices.map((notice) =>
          notice._id === noticeId
            ? { ...notice, replies: [...notice.replies, response.data] }
            : notice
        )
      );

      setReplyText("");
      setSelectedNotice(null);
    } catch (error) {
      console.error("Error adding reply:", error);
      alert("Failed to add reply. Please try again.");
    }
  };

  const rowExpansionTemplate = (notice) => (
    <div className="reply-section">
      <h4>Replies for: {notice.title}</h4>
      {notice.replies.length > 0 ? (
        <ul>
          {notice.replies.map((reply, index) => (
            <li key={index}>
              <strong>{reply.repliedBy?.name || "Anonymous"}:</strong>{" "}
              {reply.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No replies yet.</p>
      )}

      {selectedNotice === notice._id ? (
        <div>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            rows={3}
          />
          <Button
            label="Submit Reply"
            className="p-button-success"
            onClick={() => handleAddReply(notice._id)}
          />
          <Button
            label="Cancel"
            className="p-button-secondary"
            onClick={() => setSelectedNotice(null)}
          />
        </div>
      ) : (
        <Button
          label="Reply"
          className="p-button-info"
          onClick={() => setSelectedNotice(notice._id)}
        />
      )}
    </div>
  );

  return (
    <div className="notices-container">
      <h2>Notice Threads</h2>
      <DataTable
        value={notices}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="_id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20]}
      >
        <Column expander style={{ width: "3em" }} />
        <Column field="title" header="Title" sortable />
        <Column
          header="Replies"
          body={(rowData) => <span>{rowData.replies.length}</span>}
        />
      </DataTable>
      <br></br>
      <BackButton />
    </div>
  );
};

export default Notices;
