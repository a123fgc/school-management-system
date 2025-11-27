import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import ExaminationPanel from "./components/ExaminationPanel";
import ExaminationClassPage from "./components/ExaminationClassPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />}/>
          <Route path="examination" element={<ExaminationPanel />} />
          <Route path="examination/class" element={<ExaminationClassPage />} />
      </Routes>
    </Router>
  );
}
