import { useState } from "react";
import {
  initialTeachers,
  initialStudents,
  initialCourses,
  initialExams,
  initialGradeRequests,
  initialFeeStructures,
  initialPayments,
  initialPayrollRecords,
  initialRoles
} from "./mockData";

export default function useAdminState() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [students, setStudents] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);
  const [exams, setExams] = useState(initialExams);
  const [gradeRequests, setGradeRequests] = useState(initialGradeRequests);
  const [feeStructures, setFeeStructures] = useState(initialFeeStructures);
  const [payments, setPayments] = useState(initialPayments);
  const [payrollRecords, setPayrollRecords] = useState(initialPayrollRecords);
  const [roles, setRoles] = useState(initialRoles);
  const [notifications, setNotifications] = useState({ email: true, push: true });

  const generateRollNo = () => {
    const lastStudent = students[students.length - 1];
    let nextIdNumber = 33;
    if (lastStudent) {
      const lastId = lastStudent.rollNo;
      const match = lastId && lastId.match(/(\d+)$/);
      if (match) nextIdNumber = parseInt(match[1]) + 1;
    }
    return `su72-bssem-${String(nextIdNumber).padStart(3, "0")}`;
  };

  const addTeacher = (teacher) => {
    const newTeacher = {
      id: Date.now(),
      ...teacher,
    };
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const deleteTeacher = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const addStudent = (student) => {
    const s = {
      id: Date.now(),
      rollNo: generateRollNo(),
      ...student,
    };
    setStudents((prev) => [...prev, s]);
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const addCourse = (course) => {
    const teacher = teachers.find(
      (t) => t.id === parseInt(course.assignedTeacherId, 10)
    );
    const newCourse = {
      id: Date.now(),
      name: course.name,
      code: course.code,
      assignedTeacherId: parseInt(course.assignedTeacherId, 10),
      assignedTeacherName: teacher ? teacher.name : "Unassigned",
      assignedClass: course.assignedClass,
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const editTeacher = (id, updated) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const editStudent = (id, updated) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const editCourse = (id, updated) => {
    const teacher =
      updated.assignedTeacherId &&
      teachers.find((t) => t.id === parseInt(updated.assignedTeacherId, 10));
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updated,
              assignedTeacherName: teacher ? teacher.name : c.assignedTeacherName,
              assignedTeacherId: updated.assignedTeacherId
                ? parseInt(updated.assignedTeacherId, 10)
                : c.assignedTeacherId,
            }
          : c
      )
    );
  };

  // Exams
  const addExam = (exam) => setExams(prev => [...prev, { id: Date.now(), ...exam }]);
  const editExam = (id, updated) => setExams(prev => prev.map(e => e.id === id ? {...e,...updated} : e));
  const deleteExam = (id) => setExams(prev => prev.filter(e => e.id !== id));

  // Grade requests
  const submitGradeRequest = (req) => setGradeRequests(prev => [...prev, { id: Date.now(), status: "pending", ...req }]);
  const approveGradeRequest = (id) => setGradeRequests(prev => prev.map(r => r.id === id ? {...r, status: "approved"} : r));
  const rejectGradeRequest = (id) => setGradeRequests(prev => prev.map(r => r.id === id ? {...r, status: "rejected"} : r));

  // Finance
  const addFeeStructure = (f) => setFeeStructures(prev => [...prev, { id: Date.now(), ...f }]);
  const deleteFeeStructure = (id) => setFeeStructures(prev => prev.filter(f => f.id !== id));
  const recordPayment = (p) => setPayments(prev => [...prev, { id: Date.now(), date: new Date().toISOString().slice(0,10), ...p }]);
  const generateInvoice = (studentId, items) => {
    const invoice = { invoiceId: `INV-${Date.now()}`, studentId, items, date: new Date().toISOString().slice(0,10) };
    // basic record
    setPayments(prev => [...prev, { id: Date.now(), studentId, rollNo: items[0]?.rollNo || "", studentName: items[0]?.studentName || "", amount: items.reduce((a,b) => a + (b.amount||0),0), date: invoice.date, paid: false }]);
    return invoice;
  };

  // HR & Payroll
  const markAttendance = (teacherId, date, present=true) => {
    // simple payrollRecords metadata not real attendance store, keep minimal to track counts
    // Not a full tracking system: this simply creates a dummy "mark"
    setPayrollRecords(prev => [...prev, { id: Date.now(), teacherId, teacherName: teachers.find(t => t.id === teacherId)?.name || "Unknown", payMonth: date.slice(0,7), amount: 0, status: 'attendance-marked' }]);
  };
  const requestLeave = (teacherId, from, to, reason) => setPayrollRecords(prev => [...prev, { id: Date.now(), teacherId, teacherName: teachers.find(t => t.id === teacherId)?.name || "Unknown", payMonth: from.slice(0,7), amount: 0, status: 'leave-request', reason }]);
  const approveLeave = (id) => setPayrollRecords(prev => prev.map(p => p.id===id ? {...p, status:'leave-approved'} : p));
  const rejectLeave = (id) => setPayrollRecords(prev => prev.map(p => p.id===id ? {...p, status:'leave-rejected'} : p));
  const grantPayroll = (payload) => setPayrollRecords(prev => [...prev, { id: Date.now(), ...payload }]);

  // Settings
  const addRole = (role) => setRoles(prev => [...prev, { id: Date.now(), ...role }]);
  const editRole = (id, updated) => setRoles(prev => prev.map(r => r.id === id ? {...r, ...updated} : r));
  const deleteRole = (id) => setRoles(prev => prev.filter(r => r.id !== id));
  const toggleNotification = (type) => setNotifications(prev => ({...prev, [type]: !prev[type]}));
  const resetPassword = ({userType, id, newPassword}) => {
    // Mock: pretend to reset password
    console.log("Password reset (mock):", { userType, id, newPassword });
    return true;
  };

  return {
    teachers, students, courses, exams, gradeRequests, feeStructures, payments, payrollRecords, roles, notifications,
    addTeacher, deleteTeacher, editTeacher,
    addStudent, deleteStudent, editStudent,
    addCourse, deleteCourse, editCourse,
    addExam, editExam, deleteExam,
    submitGradeRequest, approveGradeRequest, rejectGradeRequest,
    addFeeStructure, deleteFeeStructure, recordPayment, generateInvoice,
    markAttendance, requestLeave, approveLeave, rejectLeave, grantPayroll,
    addRole, editRole, deleteRole, toggleNotification, resetPassword,
    generateRollNo
  };
}