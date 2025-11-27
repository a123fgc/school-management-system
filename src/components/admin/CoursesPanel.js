import React, { useState } from "react";

export default function CoursesPanel({ courses, teachers, addCourse, deleteCourse, editCourse }) {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [credits, setCredits] = useState(1);
  const [department, setDepartment] = useState("");
  const [assignedTeacherId, setAssignedTeacherId] = useState("");
  const [assignedClass, setAssignedClass] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !courseName ||
      !courseCode ||
      !department ||
      !assignedTeacherId ||
      !assignedClass
    ) {
      return alert("Please provide all fields.");
    }

    addCourse({
      name: courseName,
      code: courseCode,
      credits,
      assignedTeacherId,
      assignedClass,
      department,
    });

    setCourseName("");
    setCourseCode("");
    setCredits(1);
    setDepartment("");
    setAssignedTeacherId("");
    setAssignedClass("");
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditValues({
      name: c.name,
      code: c.code,
      credits: c.credits || 1,
      department: c.department || "",
      assignedTeacherId: c.assignedTeacherId || "",
      assignedClass: c.assignedClass || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = (id) => {
    editCourse(id, editValues);
    cancelEdit();
  };

  return (
    <div className="panel">
      <h2>📚 Courses & Curriculum</h2>

      <form onSubmit={handleSubmit}>
        <div className="panel-form-row">
          <div className="field">
            <input
              className="input"
              type="text"
              placeholder="Course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <div className="field xsmall">
            <input
              className="input"
              type="number"
              placeholder="Credits"
              value={credits}
              min="0"
              onChange={(e) => setCredits(Number(e.target.value))}
            />
          </div>

          <div className="field narrow">
            <input
              className="input"
              type="text"
              placeholder="Code (e.g., BSSE-101)"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>

          <div className="field">
            <input
              className="input"
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="field">
            <select
              className="input"
              value={assignedTeacherId}
              onChange={(e) => setAssignedTeacherId(e.target.value)}
            >
              <option value="">Assign Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field narrow">
            <input
              className="input"
              type="text"
              placeholder="Class (e.g., BSSE-1)"
              value={assignedClass}
              onChange={(e) => setAssignedClass(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <button className="create-button" type="submit">
              + Create
            </button>
          </div>
        </div>
      </form>

      <ul className="list">
        {courses.length === 0 ? (
          <li style={{ color: "var(--muted)" }}>No courses yet.</li>
        ) : (
          courses.map((c) => (
            <li key={c.id} className="list-item">
              {editingId === c.id ? (
                <div style={{ width: "100%" }} className="inline-edit">
                  <div style={{ display: "grid", gap: 6 }}>
                    <input
                      className="input"
                      value={editValues.name}
                      onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    />
                    <input
                      className="input"
                      value={editValues.code}
                      onChange={(e) => setEditValues({ ...editValues, code: e.target.value })}
                    />
                  </div>

                  <div className="inline-actions">
                    <button className="icon-button save" onClick={() => saveEdit(c.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="icon-button cancel" onClick={cancelEdit}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <strong>{c.name}</strong> ({c.code}) — {c.department} <br />
                    Teacher: {c.assignedTeacherName} | Class: {c.assignedClass}
                  </div>

                  <div className="item-actions">
                    <button className="icon-button edit" onClick={() => startEdit(c)} title="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 21l3-1 11-11 1-3-3 1L4 20z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 7l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    <button className="icon-button delete" onClick={() => deleteCourse(c.id)} title="Delete">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 6h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11v6M14 11v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}