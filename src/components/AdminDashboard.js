import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("home");

  // Mock data
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  // Teacher form states
  const [teacherName, setTeacherName] = useState("");
  const [teacherAge, setTeacherAge] = useState("");
  const [teacherQualification, setTeacherQualification] = useState("");
  const [teacherCnic, setTeacherCnic] = useState("");
  const [teacherContact, setTeacherContact] = useState("");
  const [teacherAddress, setTeacherAddress] = useState("");

  // Student form states
  const [studentName, setStudentName] = useState("");
  const [studentFatherName, setStudentFatherName] = useState("");
  const [studentCnic, setStudentCnic] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentDob, setStudentDob] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentContact, setStudentContact] = useState("");
  const [studentAddress, setStudentAddress] = useState("");

  // Logout
  const handleLogout = () => {
    navigate("/");
  };

  // Generate unique roll number
  const generateRollNo = () => {
    const lastStudent = students[students.length - 1];
    let nextIdNumber = 33;
    if (lastStudent) {
      const lastId = lastStudent.rollNo;
      const match = lastId.match(/(\d+)$/);
      if (match) nextIdNumber = parseInt(match[1]) + 1;
    }
    return `su72-bssem-${String(nextIdNumber).padStart(3, "0")}`;
  };

  // Add Teacher
  const addTeacher = (e) => {
    e.preventDefault();
    if (
      !teacherName ||
      !teacherAge ||
      !teacherQualification ||
      !teacherCnic ||
      !teacherContact ||
      !teacherAddress
    )
      return alert("Please fill all teacher fields");

    const newTeacher = {
      id: Date.now(),
      name: teacherName,
      age: teacherAge,
      qualification: teacherQualification,
      cnic: teacherCnic,
      contact: teacherContact,
      address: teacherAddress,
    };

    setTeachers([...teachers, newTeacher]);
    setTeacherName("");
    setTeacherAge("");
    setTeacherQualification("");
    setTeacherCnic("");
    setTeacherContact("");
    setTeacherAddress("");
  };

  // Delete Teacher
  const deleteTeacher = (id) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  // Add Student
  const addStudent = (e) => {
    e.preventDefault();
    if (
      !studentName ||
      !studentFatherName ||
      !studentCnic ||
      !studentAge ||
      !studentDob ||
      !studentGender ||
      !studentContact ||
      !studentAddress
    )
      return alert("Please fill all student fields");

    const newStudent = {
      id: Date.now(),
      rollNo: generateRollNo(),
      name: studentName,
      fatherName: studentFatherName,
      cnic: studentCnic,
      age: studentAge,
      dob: studentDob,
      gender: studentGender,
      contact: studentContact,
      address: studentAddress,
    };

    setStudents([...students, newStudent]);
    setStudentName("");
    setStudentFatherName("");
    setStudentCnic("");
    setStudentAge("");
    setStudentDob("");
    setStudentGender("");
    setStudentContact("");
    setStudentAddress("");
  };

  // Delete Student
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const renderPanel = () => {
    switch (activePanel) {
      case "home":
        return (
          <div className="home-panel">
            <h2 className="flicker-text">Welcome Admin</h2>
          </div>
        );

      case "teacher":
        return (
          <div className="panel">
            <h2>👩‍🏫 Teacher Panel</h2>
            <form onSubmit={addTeacher} className="form">
              <input
                type="text"
                placeholder="Name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="input"
              />
              <input
                type="number"
                placeholder="Age"
                value={teacherAge}
                onChange={(e) => setTeacherAge(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="Qualification"
                value={teacherQualification}
                onChange={(e) => setTeacherQualification(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="CNIC (e.g. 12345-6789012-3)"
                value={teacherCnic}
                onChange={(e) => setTeacherCnic(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="Contact No"
                value={teacherContact}
                onChange={(e) => setTeacherContact(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="Home Address"
                value={teacherAddress}
                onChange={(e) => setTeacherAddress(e.target.value)}
                className="input"
              />
              <div className="button-container">
                <button type="submit" className="add-button">
                  ➕ Add Teacher
                </button>
              </div>
            </form>

            <ul className="list">
              {teachers.map((t) => (
                <li key={t.id} className="list-item">
                  <div>
                    <strong>{t.name}</strong> ({t.age} yrs) <br />
                    CNIC: {t.cnic} <br />
                    Qualification: {t.qualification} <br />
                    Contact: {t.contact} <br />
                    Address: {t.address}
                  </div>
                  <button
                    onClick={() => deleteTeacher(t.id)}
                    className="delete-button"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      case "student":
        return (
          <div className="panel">
            <h2>👨‍🎓 Student Panel</h2>
            <form onSubmit={addStudent} className="form">
              <input
                type="text"
                placeholder="Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="Father Name"
                value={studentFatherName}
                onChange={(e) => setStudentFatherName(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="CNIC (e.g. 12345-6789012-3)"
                value={studentCnic}
                onChange={(e) => setStudentCnic(e.target.value)}
                className="input"
              />
              <input
                type="number"
                placeholder="Age"
                value={studentAge}
                onChange={(e) => setStudentAge(e.target.value)}
                className="input"
              />
              <input
                type="date"
                value={studentDob}
                onChange={(e) => setStudentDob(e.target.value)}
                className="input"
              />
              <select
                value={studentGender}
                onChange={(e) => setStudentGender(e.target.value)}
                className="input"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="text"
                placeholder="Contact No"
                value={studentContact}
                onChange={(e) => setStudentContact(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="Home Address"
                value={studentAddress}
                onChange={(e) => setStudentAddress(e.target.value)}
                className="input"
              />
              <div className="button-container">
                <button type="submit" className="add-button">
                  ➕ Add Student
                </button>
              </div>
            </form>

            <ul className="list">
              {students.map((s) => (
                <li key={s.id} className="list-item">
                  <div>
                    <strong>{s.name}</strong> (Roll No: {s.rollNo}) <br />
                    Father: {s.fatherName} | Gender: {s.gender} <br />
                    CNIC: {s.cnic} <br />
                    Age: {s.age} | DOB: {s.dob} <br />
                    Contact: {s.contact} <br />
                    Address: {s.address}
                  </div>
                  <button
                    onClick={() => deleteStudent(s.id)}
                    className="delete-button"
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
    <div className="container">
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
          👩‍🏫 Teacher Panel
        </button>
        <button
          className={`nav-button ${activePanel === "student" ? "active" : ""}`}
          onClick={() => setActivePanel("student")}
        >
          👨‍🎓 Student Panel
        </button>
        <button onClick={handleLogout} className="logout-button">
          🚪 Logout
        </button>
      </div>

      <div className="main-content">{renderPanel()}</div>
    </div>
  );
}
