export const initialTeachers = [
  { id: 1, name: "Sarah Carter", age: 34, qualification: "M.Ed", cnic: "12345-6789012-3", contact: "0300-1234567", address: "123 Elm Street" },
];

export const initialStudents = [
  { id: 1, rollNo: "su72-bssem-033", name: "Ali Khan", fatherName: "Ahmed Khan", cnic: "12345-9876543-2", age: 21, dob: "2004-02-12", gender: "Male", contact: "0301-7654321", address: "456 Maple Avenue" },
];

export const initialCourses = [
  { id: 1, name: "Intro to Programming", code: "BSSE-101", assignedTeacherId: 1, assignedTeacherName: "Sarah Carter", assignedClass: "BSSE-1", credits: 3, department: "CS" },
];

export const initialExams = [
  { id: 1, title:"Midterm - BSSE-1", className:"BSSE-1", date:"2025-12-01", time:"10:00", duration:"2h", totalMarks:100 }
];

export const initialGradeRequests = [
  { id: 1, examId: 1, className:"BSSE-1", teacherId: 1, status:"pending", comment: "Please review class 1 marks" }
];

export const initialFeeStructures = [
  { id: 1, className:"BSSE-1", subject:"Intro to Programming", amount: 1200 }
];

export const initialPayments = [
  { id: 1, studentId: 1, rollNo: "su72-bssem-033", studentName: "Ali Khan", amount: 1200, date: "2025-11-10", paid: true }
];

export const initialPayrollRecords = [
  { id: 1, teacherId: 1, teacherName: "Sarah Carter", payMonth: "2025-10", amount: 2500, status:"granted", comment:"On time & excellent results" }
];

export const initialRoles = [
  { id: 1, roleName: "Admin", permissions: ["manage-users","manage-courses","manage-payroll"] }
];