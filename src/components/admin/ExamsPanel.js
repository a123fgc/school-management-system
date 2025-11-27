import React, { useState } from "react";

export default function ExamsPanel({ exams, gradeRequests, teachers, addExam, deleteExam, editExam, submitGradeRequest, approveGradeRequest, rejectGradeRequest }) {
  const [title, setTitle] = useState("");
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState(100);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title || !className || !date) return alert("Title, class and date required");
    addExam({ title, className, date, time, duration, totalMarks });
    setTitle(""); setClassName(""); setDate(""); setTime(""); setDuration(""); setTotalMarks(100);
  };

  return (
    <div className="panel">
      <h2>📝 Exams & Grades</h2>

      <form onSubmit={handleCreate}>
        <div className="panel-form-row">
          <div className="field"><input className="input" placeholder="Exam title" value={title} onChange={e => setTitle(e.target.value)} /></div>
          <div className="field narrow"><input className="input" placeholder="Class" value={className} onChange={e => setClassName(e.target.value)} /></div>
          <div className="field narrow1"><input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
          <div className="field xsmall"><input className="input" placeholder="Time" value={time} onChange={e => setTime(e.target.value)} /></div>
          <div className="field xsmall"><input className="input" placeholder="Duration" value={duration} onChange={e => setDuration(e.target.value)} /></div>
          <div className="field xsmall"><input className="input" type="number" min="0" value={totalMarks} onChange={e => setTotalMarks(Number(e.target.value))} /></div>
          <div style={{ display:"flex", alignItems:"center" }}><button className="create-button" type="submit">+ Create</button></div>
        </div>
      </form>

      <h3 style={{marginTop:14}}>Scheduled Exams</h3>
      <ul className="list">
        {exams.map(e => (
          <li key={e.id} className="list-item">
            <div>
              <strong>{e.title}</strong> — {e.className} <div className="card-meta">{e.date} {e.time} • {e.duration} • {e.totalMarks} marks</div>
            </div>
            <div className="item-actions">
              <button className="icon-button edit" onClick={() => editExam(e.id, {...e})} title="Edit">✏️</button>
              <button className="icon-button delete" onClick={() => deleteExam(e.id)} title="Delete">🗑</button>
              <button className="icon-button chev" onClick={() => window.print()} title="Print">🖨️</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Grade requests</h3>
      <ul className="list">
        {gradeRequests.length === 0 ? (<li className="list-item"><div>No grading requests.</div></li>) : gradeRequests.map(r => (
          <li key={r.id} className="list-item">
            <div>
              <strong>Exam ID: {r.examId}</strong> • {r.className} <div className="card-meta">{r.status} — {r.comment}</div>
            </div>
            <div className="item-actions">
              {r.status === "pending" ? <>
                <button className="icon-button edit" onClick={() => approveGradeRequest(r.id)} title="Approve">✅</button>
                <button className="icon-button delete" onClick={() => rejectGradeRequest(r.id)} title="Reject">❌</button>
              </> : <div className="card-meta">{r.status}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}