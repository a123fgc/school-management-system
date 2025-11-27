import React, { useState } from "react";
import ExaminationClassPage from "./ExaminationClassPage";
import "./styles/ExaminationPanel.css";

export default function ExaminationPanel() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [showClassPage, setShowClassPage] = useState(false);

  const classOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sectionOptions = ["A", "B", "C"];
  const streamOptions = ["Science", "Computer"];

  const handleEnterClass = () => {
    if (selectedClass && selectedSection) setShowClassPage(true);
  };

  if (showClassPage) {
    return (
      <ExaminationClassPage
        classGrade={selectedClass}
        section={selectedSection}
        stream={selectedStream}
        onClose={() => setShowClassPage(false)} // ✅ Close functionality
      />
    );
  }

  return (
    <div className="exam-panel">
      <h2>🧾 Examination Panel</h2>

      <div className="exam-dropdowns">
        <div>
          <label>Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(parseInt(e.target.value));
              setSelectedStream("");
            }}
          >
            <option value="">-- Select Class --</option>
            {classOptions.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Section:</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">-- Select Section --</option>
            {sectionOptions.map((s) => (
              <option key={s} value={s}>
                Section {s}
              </option>
            ))}
          </select>
        </div>

        {(selectedClass === 9 || selectedClass === 10) && (
          <div>
            <label>Select Stream:</label>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
            >
              <option value="">-- Select Stream --</option>
              {streamOptions.map((stream) => (
                <option key={stream} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <button
        className="enter-class-btn"
        onClick={handleEnterClass}
        disabled={!selectedClass || !selectedSection}
      >
        Enter the Class
      </button>
    </div>
  );
}
