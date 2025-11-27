import React, { useState } from "react";
import "./styles/TeacherProfile.css";

export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [teacher, setTeacher] = useState({
    name: "Mr. Ahmed Raza",
    subject: "Computer Science",
    email: "ahmed.raza@school.edu.pk",
    employeeId: "EMP-2025-015",
    phone: "0300-9876543",
    cnic: "35201-9876543-1",
    department: "Science Department",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Teacher profile saved successfully!");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Teacher Profile</h2>

        <div className="profile-avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
            alt="Teacher"
          />
        </div>

        <h3 className="profile-name">{teacher.name}</h3>
        <p className="profile-subject">{teacher.subject}</p>

        <div className="profile-info">
          <div className="info-item">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="info-item">
            <label>Employee ID:</label>
            <input
              type="text"
              name="employeeId"
              value={teacher.employeeId}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="info-item">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={teacher.phone}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="info-item">
            <label>CNIC:</label>
            <input
              type="text"
              name="cnic"
              value={teacher.cnic}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="info-item">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={teacher.department}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            ✏️ Edit Profile
          </button>
        ) : (
          <button className="save-btn" onClick={handleSave}>
            💾 Save Profile
          </button>
        )}
      </div>
    </div>
  );
}
