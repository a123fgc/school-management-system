import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/TeacherDashboard.css";
import TeacherProfile from "./TeacherProfile";
import ExaminationPanel from "./ExaminationPanel";
import TeacherTimetable from "./TeacherTimetable";
import TeacherAnnouncements from "./TeacherAnnouncements"
import SettingsPanel from "./SettingsPanel";
//  no

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("home");

  const [students, setStudents] = useState([
    { id: 1, name: "Ali Khan", rollNo: "su72-bssem-033", attendance: 0, totalDays: 0 },
    { id: 2, name: "Sara Ahmed", rollNo: "su72-bssem-034", attendance: 0, totalDays: 0 },
    { id: 3, name: "Bilal Hussain", rollNo: "su72-bssem-035", attendance: 0, totalDays: 0 },
  ]);

  const handleLogout = () => navigate("/");

  // ✅ Toggle attendance & update counts
  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newTotal = s.totalDays + 1;
          const newPresent = s.attendance + 1;
          const wasPresent = s.lastMarked === "Present";

          return {
            ...s,
            attendance: wasPresent ? s.attendance : newPresent,
            totalDays: newTotal,
            lastMarked: wasPresent ? "Absent" : "Present",
          };
        }
        return s;
      })
    );
  };

  // ✅ Calculate individual % and overall average
  const getAttendancePercentage = (s) =>
    s.totalDays === 0 ? 0 : ((s.attendance / s.totalDays) * 100).toFixed(1);

  const calculateOverallPercentage = () => {
    const total = students.reduce((sum, s) => sum + parseFloat(getAttendancePercentage(s)), 0);
    return (total / students.length).toFixed(1);
  };

  const handleSave = () => {
    alert("✅ Attendance data saved!");
    console.log(students);
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
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.rollNo}</td>
                    <td>{s.name}</td>
                    <td>
                      <button
                        className={`toggle-btn ${s.lastMarked === "Present"
                          ? "present-btn"
                          : s.lastMarked === "Absent"
                            ? "absent-btn"
                            : ""
                          }`}
                        onClick={() => toggleAttendance(s.id)}
                      >
                        {s.lastMarked ? s.lastMarked : "Mark Attendance"}
                      </button>
                    </td>
                    <td>
                      <div className="progress-container">
                        <div
                          className="progress-bar"
                          style={{ width: `${getAttendancePercentage(s)}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{getAttendancePercentage(s)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="summary">
              <p>
                📊 Overall Attendance Percentage:{" "}
                <strong>{calculateOverallPercentage()}%</strong>
              </p>
            </div>

            <button className="save-button" onClick={handleSave}>
              💾 Save Attendance
            </button>
          </div>
        );

      case "examination":
        return (
          <div className="teacher-panel">
            <ExaminationPanel />
          </div>
        );

      case "profile":
        return (
          <div className="teacher-panel">
            <TeacherProfile />
          </div>
        );

      case "timetable":
        return (
          <div className="teacher-panel">
            <TeacherTimetable />
          </div>
        );


      case "announcements":
        return (
          <div className="teacher-panel">
            <TeacherAnnouncements />
          </div>
        );

      case "settings":
        return (
          <div className="teacher-panel">
            <SettingsPanel/>
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
          className={`nav-btn ${activePanel === "profile" ? "active" : ""}`}
          onClick={() => setActivePanel("profile")}
        >
          👤 Profile
        </button>

        <button
          className={`nav-btn ${activePanel === "attendance" ? "active" : ""}`}
          onClick={() => setActivePanel("attendance")}
        >
          ✅ Attendance
        </button>

        <button
          className={`nav-btn ${activePanel === "timetable" ? "active" : ""}`}
          onClick={() => setActivePanel("timetable")}
        >
          🗓️ Timetable
        </button>


        <button
          className={`nav-btn ${activePanel === "examination" ? "active" : ""}`}
          onClick={() => setActivePanel("examination")}
        >
          🧾 Examination
        </button>

        <button
          className={`nav-btn ${activePanel === "announcements" ? "active" : ""}`}
          onClick={() => setActivePanel("announcements")}
        >
          📢 Announcements
        </button>


        <button
          className={`nav-btn ${activePanel === "settings" ? "active" : ""}`}
          onClick={() => setActivePanel("settings")}
        >
          ⚙️ Settings
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Main Panel Area */}
      <div className="teacher-main">{renderPanel()}</div>
    </div>
  );
}
