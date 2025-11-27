import React, { useState } from "react";

export default function FinancePanel({ feeStructures, payments, students, teachers, addFeeStructure, deleteFeeStructure, recordPayment, generateInvoice }) {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!className || !subject || !amount) return alert("All fields required");
    addFeeStructure({ className, subject, amount: Number(amount) });
    setClassName(""); setSubject(""); setAmount("");
  };

  return (
    <div className="panel">
      <h2>💰 Finance</h2>

      <form onSubmit={handleAdd}>
        <div className="panel-form-row">
          <div className="field"><input className="input" placeholder="Class" value={className} onChange={e => setClassName(e.target.value)} /></div>
          <div className="field"><input className="input" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} /></div>
          <div className="field xsmall"><input className="input" type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} /></div>
          <div style={{ display:"flex", alignItems:"center" }}><button className="create-button" type="submit">+ Create</button></div>
        </div>
      </form>

      <h3>Fee Structure</h3>
      <ul className="list">
        {feeStructures.map(f => (
          <li key={f.id} className="list-item">
            <div>
              <strong>{f.subject}</strong> — {f.className}
              <div className="card-meta">{f.amount} PKR</div>
            </div>
            <div className="item-actions">
              <button className="icon-button edit" onClick={() => alert("Edit fee (not implemented)")} title="Edit">✏️</button>
              <button className="icon-button delete" onClick={() => deleteFeeStructure(f.id)} title="Delete">🗑</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Payments</h3>
      <ul className="list">
        {payments.map(p => (
          <li key={p.id} className="list-item">
            <div>
              <strong>{p.studentName} ({p.rollNo})</strong>
              <div className="card-meta">{p.amount} PKR • {p.date} • {p.paid ? "Paid" : "Unpaid"}</div>
            </div>
            <div className="item-actions">
              <button className="icon-button edit" onClick={() => recordPayment({ studentId: p.studentId, studentName: p.studentName, rollNo: p.rollNo, amount: p.amount })} title="Mark Payment">💳</button>
              <button className="icon-button chev" onClick={() => { const invoice = generateInvoice(p.studentId, [{ amount: p.amount, rollNo: p.rollNo, studentName: p.studentName }]); alert(`Invoice generated ${invoice.invoiceId}`); }} title="Invoice">📄</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}