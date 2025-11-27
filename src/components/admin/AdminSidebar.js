import React from "react";

export default function AdminSidebar({ activePanel, setActivePanel, handleLogout }) {
  return (
    <div className="sidebar">
      <h3 className="logo">Admin Panel</h3>

      <button
        className={`nav-button ${activePanel === "home" ? "active" : ""}`}
        onClick={() => setActivePanel("home")}
      >
        🏠 Home
      </button>

      <button
        className={`nav-button ${activePanel === "teacher" ? "active" : ""}`}
        onClick={() => setActivePanel("teacher")}
      >
        👩‍🏫 Teacher Management
      </button>

      <button
        className={`nav-button ${activePanel === "student" ? "active" : ""}`}
        onClick={() => setActivePanel("student")}
      >
        👨‍🎓 Student Management
      </button>

      <button
        className={`nav-button ${activePanel === "courses" ? "active" : ""}`}
        onClick={() => setActivePanel("courses")}
      >
        📚 Courses
      </button>

      <button
        className={`nav-button ${activePanel === "exams" ? "active" : ""}`}
        onClick={() => setActivePanel("exams")}
      >
        📝 Exams
      </button>

      <button
        className={`nav-button ${activePanel === "finance" ? "active" : ""}`}
        onClick={() => setActivePanel("finance")}
      >
        💰 Finance
      </button>

      <button
        className={`nav-button ${activePanel === "hr" ? "active" : ""}`}
        onClick={() => setActivePanel("hr")}
      >
        🧾 HR & Payroll
      </button>

      <button
        className={`nav-button ${activePanel === "settings" ? "active" : ""}`}
        onClick={() => setActivePanel("settings")}
      >
        ⚙️ Settings
      </button>

      <div style={{ flex: 1 }} /> {/* push logout to bottom */}

      <button onClick={handleLogout} className="logout-button btn">
        🚪 Logout
      </button>
    </div>
  );
}