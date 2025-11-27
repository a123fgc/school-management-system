import React, { useState } from "react";
import "./styles/TeacherAnnouncements.css";

export default function TeacherAnnouncements() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Midterm Exam Schedule",
      message: "The midterm exam schedule has been uploaded to the system.",
      date: "2025-11-05",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      message: "Meeting scheduled for all parents on Friday at 10 AM in the school hall.",
      date: "2025-11-07",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const handleAddAnnouncement = () => {
    if (!newTitle.trim() || !newMessage.trim()) {
      alert("⚠️ Please fill in both title and message.");
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      title: newTitle,
      message: newMessage,
      date: new Date().toISOString().split("T")[0],
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setNewTitle("");
    setNewMessage("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="announcement-container">
      <h2>📢 Teacher Announcements</h2>

      <div className="add-announcement">
        <input
          type="text"
          placeholder="Enter announcement title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter announcement details..."
          rows="3"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={handleAddAnnouncement}>➕ Add Announcement</button>
      </div>

      <div className="announcement-list">
        {announcements.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          announcements.map((a) => (
            <div key={a.id} className="announcement-card">
              <div className="announcement-header">
                <h3>{a.title}</h3>
                <span className="date">{a.date}</span>
              </div>
              <p>{a.message}</p>
              <button className="delete-btn" onClick={() => handleDelete(a.id)}>
                🗑 Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
