import React, { useState } from "react";

export default function HrPayrollPanel({ teachers, payrollRecords, markAttendance, requestLeave, approveLeave, rejectLeave, grantPayroll }) {
  const [teacherId, setTeacherId] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [payComment, setPayComment] = useState("");

  const grant = () => {
    if (!teacherId || !payAmount) return alert("Teacher and amount required");
    grantPayroll({ teacherId: Number(teacherId), teacherName: teachers.find(t => t.id === Number(teacherId))?.name || "Unknown", amount: Number(payAmount), payMonth: new Date().toISOString().slice(0,7), status:"granted", comment: payComment });
    setTeacherId(""); setPayAmount(""); setPayComment("");
  };

  return (
    <div className="panel">
      <h2>🧾 HR & Payroll</h2>

      <div className="panel-form-row">
        <div className="field">
          <select className="input" value={teacherId} onChange={(e)=>setTeacherId(e.target.value)}><option value="">Select Teacher</option>{teachers.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}</select>
        </div>
        <div className="field xsmall"><input className="input" placeholder="Amount" value={payAmount} onChange={(e)=>setPayAmount(e.target.value)} /></div>
        <div className="field"><input className="input" placeholder="Comment" value={payComment} onChange={(e)=>setPayComment(e.target.value)} /></div>
        <div style={{display:"flex", alignItems:"center"}}><button className="create-button" onClick={grant}>Grant</button></div>
      </div>

      <h3>Payroll Records</h3>
      <ul className="list">
        {payrollRecords.map(r => (
          <li key={r.id} className="list-item">
            <div>
              <strong>{r.teacherName}</strong> — {r.payMonth}
              <div className="card-meta">{r.amount} PKR • {r.status} • {r.comment}</div>
            </div>
            <div className="item-actions">
              <button className="icon-button edit" onClick={() => markAttendance(r.teacherId, new Date().toISOString().slice(0,10), true)} title="Mark">🕔</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}