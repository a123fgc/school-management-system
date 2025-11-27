import React, { useState } from "react";

export default function SettingsPanel({ roles, addRole, editRole, deleteRole, notifications, toggleNotification, resetPassword }) {
  const [roleName, setRoleName] = useState("");
  const [newPass, setNewPass] = useState("");

  const add = (e) => { e.preventDefault(); if (!roleName) return; addRole({ roleName, permissions: [] }); setRoleName(""); };

  const onReset = (userType, id) => {
    if (!newPass) return alert("Enter password");
    resetPassword({ userType, id, newPassword: newPass });
    setNewPass("");
    alert("Password reset (mock)");
  };

  return (
    <div className="panel">
      <h2>⚙️ Settings</h2>
      <form onSubmit={add}>
        <div className="panel-form-row">
          <div className="field"><input className="input" placeholder="New role name" value={roleName} onChange={e=>setRoleName(e.target.value)} /></div>
          <div style={{display:"flex", alignItems:"center"}}><button className="create-button" type="submit">+ Add Role</button></div>
        </div>
      </form>

      <h3>Roles</h3>
      <ul className="list">
        {roles.map(r => (
          <li key={r.id} className="list-item">
            <div>
              <strong>{r.roleName}</strong>
              <div className="card-meta">{r.permissions.join(", ")}</div>
            </div>
            <div className="item-actions">
              <button className="icon-button edit" onClick={() => alert("Edit perms (not implemented)")}>✏️</button>
              <button className="icon-button delete" onClick={() => deleteRole(r.id)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Notifications</h3>
      <div style={{display:"grid", gap:8}}>
        <label><input type="checkbox" checked={notifications.email} onChange={()=>toggleNotification('email')} /> Email Notifications</label>
        <label><input type="checkbox" checked={notifications.push} onChange={()=>toggleNotification('push')} /> Push Notifications</label>
      </div>

      <h3>Reset Password (mock)</h3>
      <div className="panel-form-row">
        <div className="field"><input className="input" placeholder="User ID" /></div>
        <div className="field"><input className="input" placeholder="New Password" value={newPass} onChange={e=>setNewPass(e.target.value)} /></div>
        <div style={{display:"flex", alignItems:"center"}}><button className="create-button" onClick={() => onReset('user', 1)}>Reset</button></div>
      </div>
    </div>
  );
}