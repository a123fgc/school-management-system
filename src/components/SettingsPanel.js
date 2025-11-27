import React from "react";
import "./styles/SettingsPanel.css";
import { useSystemSettings } from "../context/SystemSettingsContext";

export default function SettingsPanel({ onClose }) {
  const { isDarkMode, toggleDarkMode, isMuted, toggleMute } = useSystemSettings();

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <button className="back-btn" onClick={onClose}>🔙 Back</button>
        <h2>⚙️ Settings</h2>
      </div>

      <div className="settings-options">
        <div className="setting-item">
          <span>🌓 Theme:</span>
          <button className="toggle-btn" onClick={toggleDarkMode}>
            {isDarkMode ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>

        <div className="setting-item">
          <span>🔕 Notifications:</span>
          <button className="toggle-btn" onClick={toggleMute}>
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>
    </div>
  );
}
