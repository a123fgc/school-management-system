import React, { createContext, useState, useContext } from "react";

const SystemSettingsContext = createContext();

export function SystemSettingsProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      document.body.classList.toggle("dark-theme", newValue);
      return newValue;
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <SystemSettingsContext.Provider
      value={{ isDarkMode, isMuted, toggleDarkMode, toggleMute }}
    >
      {children}
    </SystemSettingsContext.Provider>
  );
}

export function useSystemSettings() {
  return useContext(SystemSettingsContext);
}
