import React, { useState } from "react";

export default function StudentPanel({
  students,
  addStudent,
  deleteStudent,
  generateRollNo,
  editStudent,
}) {
  const [studentName, setStudentName] = useState("");
  const [studentFatherName, setStudentFatherName] = useState("");
  const [studentCnic, setStudentCnic] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentDob, setStudentDob] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentContact, setStudentContact] = useState("");
  const [studentAddress, setStudentAddress] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleSubmit = (e) => {
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
    ) {
      return alert("Please fill all student fields");
    }

    addStudent({
      name: studentName,
      fatherName: studentFatherName,
      cnic: studentCnic,
      age: studentAge,
      dob: studentDob,
      gender: studentGender,
      contact: studentContact,
      address: studentAddress,
    });

    setStudentName("");
    setStudentFatherName("");
    setStudentCnic("");
    setStudentAge("");
    setStudentDob("");
    setStudentGender("");
    setStudentContact("");
    setStudentAddress("");
  };

  const startEdit = (s) => {
    setEditingId(s.id);
    setEditValues({
      name: s.name,
      fatherName: s.fatherName,
      cnic: s.cnic,
      age: s.age,
      dob: s.dob,
      gender: s.gender,
      contact: s.contact,
      address: s.address,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = (id) => {
    editStudent(id, editValues);
    cancelEdit();
  };

  return (
    <div className="panel">
      <h2>👨‍🎓 Student Panel</h2>

      <form onSubmit={handleSubmit}>
        <div className="panel-form-row">
          <div className="field">
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          <div className="field">
            <input
              className="input"
              type="text"
              placeholder="Father Name"
              value={studentFatherName}
              onChange={(e) => setStudentFatherName(e.target.value)}
            />
          </div>

          <div className="field">
            <input
              className="input"
              type="text"
              placeholder="CNIC (e.g. 12345-6789012-3)"
              value={studentCnic}
              onChange={(e) => setStudentCnic(e.target.value)}
            />
          </div>

          <div className="field xsmall">
            <input
              className="input"
              type="number"
              placeholder="Age"
              value={studentAge}
              onChange={(e) => setStudentAge(e.target.value)}
            />
          </div>

          <div className="field narrow">
            <input
              className="input"
              type="date"
              value={studentDob}
              onChange={(e) => setStudentDob(e.target.value)}
            />
          </div>

          <div className="field narrow">
            <select
              className="input"
              value={studentGender}
              onChange={(e) => setStudentGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <button className="create-button" type="submit">
              Add
            </button>
          </div>
        </div>

        <div className="panel-form-row">
          <div className="field">
            <input
              className="input"
              type="text"
              placeholder="Contact No"
              value={studentContact}
              onChange={(e) => setStudentContact(e.target.value)}
            />
          </div>
          <div className="field" style={{ flex: 2 }}>
            <input
              className="input"
              type="text"
              placeholder="Home Address"
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
            />
          </div>
        </div>
      </form>

      <ul className="list">
        {students.map((s) => (
          <li key={s.id} className="list-item">
            {editingId === s.id ? (
              <div style={{ width: "100%" }} className="inline-edit">
                <div style={{ display: "grid", gap: 6 }}>
                  <input
                    className="input"
                    value={editValues.name}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                  />
                  <input
                    className="input"
                    value={editValues.cnic}
                    onChange={(e) => setEditValues({ ...editValues, cnic: e.target.value })}
                  />
                </div>

                <div className="inline-actions">
                  <button className="icon-button save" onClick={() => saveEdit(s.id)}>
                    {/* check */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="icon-button cancel" onClick={cancelEdit}>
                    {/* x */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <strong>{s.name}</strong> (Roll No: {s.rollNo}) <br />
                  Father: {s.fatherName} | Gender: {s.gender} <br />
                  CNIC: {s.cnic} <br />
                  Age: {s.age} | DOB: {s.dob} <br />
                  Contact: {s.contact} <br />
                  Address: {s.address}
                </div>

                <div className="item-actions">
                  <button className="icon-button edit" onClick={() => startEdit(s)} title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 21l3-1 11-11 1-3-3 1L4 20z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 7l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <button className="icon-button delete" onClick={() => deleteStudent(s.id)} title="Delete">
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
        ))}
      </ul>
    </div>
  );
}