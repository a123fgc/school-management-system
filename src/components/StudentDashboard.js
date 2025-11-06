import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const att = await axios.get(`http://localhost:5000/attendance?studentId=${user.id}`);
      const mrk = await axios.get(`http://localhost:5000/marks?studentId=${user.id}`);
      setAttendance(att.data);
      setMarks(mrk.data);
    };
    fetchData();
  }, [user.id]);

  const total = attendance.length;
  const present = attendance.filter((a) => a.present).length;
  const percent = total ? Math.round((present / total) * 100) : 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}</h2>
      <p className="mb-4">Attendance Percentage: {percent}%</p>
      <h3 className="text-lg font-semibold">Marks</h3>
      <ul>
        {marks.map((m, i) => (
          <li key={i}>Mark: {m.mark}</li>
        ))}
      </ul>
    </div>
  );
}
