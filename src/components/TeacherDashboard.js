import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("home");

  const [students, setStudents] = useState([
    { id: 1, name: "Ali Khan", rollNo: "su72-bssem-033", attendance: null, marks: "" },
    { id: 2, name: "Sara Ahmed", rollNo: "su72-bssem-034", attendance: null, marks: "" },
    { id: 3, name: "Bilal Hussain", rollNo: "su72-bssem-035", attendance: null, marks: "" },
  ]);

  // --- Examination Students ---
  const [examStudents, setExamStudents] = useState([]);
  const [examName, setExamName] = useState("");
  const [examRoll, setExamRoll] = useState("");
  const [examMarks, setExamMarks] = useState("");

  // --- Logout ---
  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  // --- Attendance & Marks ---
  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              attendance: s.attendance === "Present" ? "Absent" : "Present",
            }
          : s
      )
    );
  };

  const handleMarksChange = (id, marks) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, marks } : s))
    );
  };

  const calculateAttendancePercentage = () => {
    const total = students.length;
    const present = students.filter((s) => s.attendance === "Present").length;
    return total === 0 ? 0 : ((present / total) * 100).toFixed(1);
  };

  const handleSave = () => {
    alert("✅ Attendance and marks saved!");
    console.log(students);
  };

  // --- Examination (Add Student) ---
  const handleAddExamStudent = (e) => {
    e.preventDefault();
    if (!examName || !examRoll || !examMarks)
      return alert("Please fill all fields");

    const newExamStudent = {
      id: Date.now(),
      name: examName,
      rollNo: examRoll,
      marks: examMarks,
    };

    setExamStudents([...examStudents, newExamStudent]);
    setExamName("");
    setExamRoll("");
    setExamMarks("");
  };

  const handleDeleteExamStudent = (id) => {
    setExamStudents(examStudents.filter((s) => s.id !== id));
  };

  // --- Panels ---
  const renderPanel = () => {
    switch (activePanel) {
      case "home":
        return (
          <div className="teacher-home">
            <h2 className="welcome-text">Welcome Teacher 👩‍🏫</h2>
            <p className="sub-text">Use the sidebar to mark attendance or manage examination records.</p>
          </div>
        );

      case "attendance":
        return (
          <div className="teacher-panel">
            <h2>✅ Mark Attendance</h2>
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Attendance</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.rollNo}</td>
                    <td>{s.name}</td>
                    <td>
                      <div className="attendance-toggle">
                        <span
                          className={`attendance-status ${
                            s.attendance === "Present"
                              ? "present-text"
                              : s.attendance === "Absent"
                              ? "absent-text"
                              : ""
                          }`}
                        >
                          {s.attendance ? s.attendance : "Not Marked"}
                        </span>
                        <button
                          className={`toggle-btn ${
                            s.attendance === "Present"
                              ? "present-btn"
                              : s.attendance === "Absent"
                              ? "absent-btn"
                              : ""
                          }`}
                          onClick={() => toggleAttendance(s.id)}
                        >
                          Mark
                        </button>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Enter Marks"
                        value={s.marks}
                        onChange={(e) => handleMarksChange(s.id, e.target.value)}
                        className="marks-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="summary">
              <p>
                📊 Attendance Percentage:{" "}
                <strong>{calculateAttendancePercentage()}%</strong>
              </p>
            </div>

            <button className="save-button" onClick={handleSave}>
              💾 Save Attendance & Marks
            </button>
          </div>
        );

      case "examination":
        return (
          <div className="teacher-panel">
            <h2>🧾 Examination</h2>
            <form onSubmit={handleAddExamStudent} className="subject-form">
              <input
                type="text"
                placeholder="Student Name"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="subject-input"
              />
              <input
                type="text"
                placeholder="Roll Number"
                value={examRoll}
                onChange={(e) => setExamRoll(e.target.value)}
                className="subject-input"
              />
              <input
                type="number"
                placeholder="Marks"
                value={examMarks}
                onChange={(e) => setExamMarks(e.target.value)}
                className="subject-input"
              />
              <button type="submit" className="add-subject-btn">
                ➕ Add Student
              </button>
            </form>

            <ul className="subject-list">
              {examStudents.map((s) => (
                <li key={s.id} className="subject-item">
                  {s.rollNo} - {s.name} | Marks: {s.marks}
                  <button
                    onClick={() => handleDeleteExamStudent(s.id)}
                    className="delete-subject-btn"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="teacher-dashboard">
      {/* Sidebar */}
      <div className="teacher-sidebar">
        <h3 className="teacher-logo">Teacher Panel</h3>

        <button
          className={`nav-btn ${activePanel === "home" ? "active" : ""}`}
          onClick={() => setActivePanel("home")}
        >
          🏠 Home
        </button>

        <button
          className={`nav-btn ${activePanel === "attendance" ? "active" : ""}`}
          onClick={() => setActivePanel("attendance")}
        >
          ✅ Mark Attendance
        </button>

        <button
          className={`nav-btn ${activePanel === "examination" ? "active" : ""}`}
          onClick={() => setActivePanel("examination")}
        >
          🧾 Examination
        </button>

        {/* 🚪 Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="teacher-main">{renderPanel()}</div>
    </div>
  );
}
