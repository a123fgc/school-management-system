import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import useAdminState from "./useAdminState";
import AdminHome from "./AdminHome";
import FacultyPanel from "./FacultyPanel";
import StudentPanel from "./StudentPanel";
import AdminSidebar from "./AdminSidebar";
import CoursesPanel from "./CoursesPanel";
import ExamsPanel from "./ExamsPanel";
import FinancePanel from "./FinancePanel";
import HrPayrollPanel from "./HrPayrollPanel";
import SettingsPanel from "./SettingsPanel";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("home");

  const state = useAdminState();

  const handleLogout = () => navigate("/");

  const renderPanel = () => {
    switch (activePanel) {
      case "home":
        return <AdminHome />;
      case "teacher":
        return (
          <FacultyPanel
            teachers={state.teachers}
            addTeacher={state.addTeacher}
            deleteTeacher={state.deleteTeacher}
            editTeacher={state.editTeacher}
          />
        );
      case "student":
        return (
          <StudentPanel
            students={state.students}
            addStudent={state.addStudent}
            deleteStudent={state.deleteStudent}
            editStudent={state.editStudent}
            generateRollNo={state.generateRollNo}
          />
        );
      case "courses":
        return (
          <CoursesPanel
            courses={state.courses}
            teachers={state.teachers}
            addCourse={state.addCourse}
            deleteCourse={state.deleteCourse}
            editCourse={state.editCourse}
          />
        );
      case "exams":
        return (
          <ExamsPanel
            exams={state.exams}
            gradeRequests={state.gradeRequests}
            teachers={state.teachers}
            addExam={state.addExam}
            editExam={state.editExam}
            deleteExam={state.deleteExam}
            submitGradeRequest={state.submitGradeRequest}
            approveGradeRequest={state.approveGradeRequest}
            rejectGradeRequest={state.rejectGradeRequest}
          />
        );
      case "finance":
        return (
          <FinancePanel
            feeStructures={state.feeStructures}
            payments={state.payments}
            students={state.students}
            teachers={state.teachers}
            addFeeStructure={state.addFeeStructure}
            deleteFeeStructure={state.deleteFeeStructure}
            recordPayment={state.recordPayment}
            generateInvoice={state.generateInvoice}
          />
        );
      case "hr":
        return (
          <HrPayrollPanel
            teachers={state.teachers}
            payrollRecords={state.payrollRecords}
            markAttendance={state.markAttendance}
            requestLeave={state.requestLeave}
            approveLeave={state.approveLeave}
            rejectLeave={state.rejectLeave}
            grantPayroll={state.grantPayroll}
          />
        );
      case "settings":
        return (
          <SettingsPanel
            roles={state.roles}
            addRole={state.addRole}
            editRole={state.editRole}
            deleteRole={state.deleteRole}
            notifications={state.notifications}
            toggleNotification={state.toggleNotification}
            resetPassword={state.resetPassword}
          />
        );
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="container">
      <AdminSidebar
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        handleLogout={handleLogout}
      />

      <div className="main-content">{renderPanel()}</div>
    </div>
  );
}
