import React, { useState } from "react";

export default function FacultyPanel({ teachers, addTeacher, deleteTeacher, editTeacher }) {
  const [teacherName, setTeacherName] = useState("");
  const [teacherAge, setTeacherAge] = useState("");
  const [teacherQualification, setTeacherQualification] = useState("");
  const [teacherCnic, setTeacherCnic] = useState("");
  const [teacherContact, setTeacherContact] = useState("");
  const [teacherAddress, setTeacherAddress] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !teacherName ||
      !teacherAge ||
      !teacherQualification ||
      !teacherCnic ||
      !teacherContact ||
      !teacherAddress
    ) {
      return alert("Please fill all teacher fields");
    }

    addTeacher({
      name: teacherName,
      age: teacherAge,
      qualification: teacherQualification,
      cnic: teacherCnic,
      contact: teacherContact,
      address: teacherAddress,
    });

    setTeacherName("");
    setTeacherAge("");
    setTeacherQualification("");
    setTeacherCnic("");
    setTeacherContact("");
    setTeacherAddress("");
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditValues({
      name: t.name,
      age: t.age,
      qualification: t.qualification,
      cnic: t.cnic,
      contact: t.contact,
      address: t.address,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = (id) => {
    editTeacher(id, editValues);
    cancelEdit();
  };

  return (
    <div className="panel">
      <h2>👩‍🏫 Teacher Panel</h2>

      <form onSubmit={handleSubmit}>
        <div className="panel-form-row">
          <div className="field">
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>

          <div className="field xsmall">
            <input
              className="input"
              type="number"
              placeholder="Age"
              value={teacherAge}
              onChange={(e) => setTeacherAge(e.target.value)}
            />
          </div>

          <div className="field">
            <input
              className="input"
              type="text"
              placeholder="Qualification"
              value={teacherQualification}
              onChange={(e) => setTeacherQualification(e.target.value)}
            />
          </div>

          <div className="field">
            <input
              className="input"
              type="text"
              placeholder="CNIC (e.g. 12345-6789012-3)"
              value={teacherCnic}
              onChange={(e) => setTeacherCnic(e.target.value)}
            />
          </div>

          <div className="field narrow">
            <input
              className="input"
              type="text"
              placeholder="Contact No"
              value={teacherContact}
              onChange={(e) => setTeacherContact(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <button className="create-button" type="submit">
              Add
            </button>
          </div>
        </div>

        {/* Secondary row for address or larger multi-line inputs */}
        <div className="panel-form-row">
          <div className="field" style={{ flex: 2 }}>
            <input
              className="input"
              type="text"
              placeholder="Home Address"
              value={teacherAddress}
              onChange={(e) => setTeacherAddress(e.target.value)}
            />
          </div>
        </div>
      </form>

      <ul className="list">
        {teachers.map((t) => (
          <li key={t.id} className="list-item">
            {editingId === t.id ? (
              <div style={{ width: "100%" }} className="inline-edit">
                <div style={{ display: "grid", gap: 6 }}>
                  <input
                    className="input"
                    value={editValues.name}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                  />
                  <input
                    className="input"
                    value={editValues.qualification}
                    onChange={(e) =>
                      setEditValues({ ...editValues, qualification: e.target.value })
                    }
                  />
                </div>

                <div className="inline-actions">
                  <button className="icon-button save" onClick={() => saveEdit(t.id)}>
                    {/* check icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="icon-button cancel" onClick={cancelEdit}>
                    {/* x icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <strong>{t.name}</strong> ({t.age} yrs) <br />
                  CNIC: {t.cnic} <br />
                  Qualification: {t.qualification} <br />
                  Contact: {t.contact} <br />
                  Address: {t.address}
                </div>

                <div className="item-actions">
                  <button className="icon-button edit" title="Edit" onClick={() => startEdit(t)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 21l3-1 11-11 1-3-3 1L4 20z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 7l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <button className="icon-button delete" title="Delete" onClick={() => deleteTeacher(t.id)}>
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