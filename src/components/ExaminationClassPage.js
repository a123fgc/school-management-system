import React, { useEffect, useState } from "react";
import { studentData } from "../data/studentData";
import "./styles/ExaminationPanel.css";
import SettingsPanel from "./SettingsPanel"; // ✅ add this

export default function ExaminationClassPage({ classGrade, section, stream, onClose }) {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  

  useEffect(() => {
    if (!classGrade || !section) return;

    let key = `${classGrade}-${section}`;
    if ((classGrade === 9 || classGrade === 10) && stream) {
      key += `-${stream}`;
    }

    setStudents(studentData[key] || []);
  }, [classGrade, section, stream]);

  const handleMarkChange = (student, value) => {
    setMarks((prev) => ({ ...prev, [student.rollNo]: value }));
  };

  const handleSubmitMarks = () => {
    console.log("✅ Marks uploaded successfully:", marks);
    alert("Marks saved successfully!");
  };

  return (
    <div className="exam-class-page">
      <div className="exam-header">
        {/* 🔙 Back button (left-aligned) */}
        <button className="back-btn" onClick={onClose}>
          🔙 Back to Select Class
        </button>

        <h2 className="exam-title">
          📘 Class {classGrade} - Section {section}{" "}
          {(classGrade === 9 || classGrade === 10) && stream && `(${stream})`}
        </h2>
      </div>

      {students.length === 0 ? (
        <p>No students found for this class.</p>
      ) : (
        <table className="exam-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Marks"
                    value={marks[student.rollNo] || ""}
                    onChange={(e) => handleMarkChange(student, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="exam-actions">
        <button onClick={handleSubmitMarks} className="submit-marks-btn">
          💾 Save & Upload Marks
        </button>
      </div>
    </div>
  );
}
