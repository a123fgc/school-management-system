import React from "react";
import "./styles/TeacherTimetable.css";

export default function TeacherTimetable() {
  const timetable = {
    Monday: [
      { time: "08:00 - 08:45", subject: "Math", class: "8-A" },
      { time: "09:00 - 09:45", subject: "Science", class: "8-B" },
    ],
    Tuesday: [
      { time: "08:00 - 08:45", subject: "Computer", class: "9-A" },
      { time: "09:00 - 09:45", subject: "English", class: "9-B" },
    ],
    Wednesday: [
      { time: "08:00 - 08:45", subject: "Physics", class: "10-A" },
      { time: "09:00 - 09:45", subject: "Chemistry", class: "10-B" },
    ],
    Thursday: [
      { time: "08:00 - 08:45", subject: "Science", class: "8-B" },
      { time: "09:00 - 09:45", subject: "Math", class: "9-A" },
    ],
    Friday: [
      { time: "08:00 - 08:45", subject: "English", class: "10-A" },
      { time: "09:00 - 09:45", subject: "Computer", class: "9-B" },
    ],
    Saturday: [
      { time: "08:00 - 08:45", subject: "Islamiyat", class: "8-A" },
      { time: "09:00 - 09:45", subject: "Urdu", class: "9-A" },
    ],
  };

  // Convert timetable object into pairs of two days
  const dayPairs = [];
  const days = Object.keys(timetable);
  for (let i = 0; i < days.length; i += 2) {
    dayPairs.push(days.slice(i, i + 2));
  }

  return (
    <div className="timetable-container">
      <h2>📅 Weekly Timetable</h2>
      <p className="note">Sunday is off 💤</p>

      {dayPairs.map((pair, index) => (
        <div key={index} className="timetable-row">
          {pair.map((day) => (
            <div key={day} className="timetable-card">
              <h3>{day}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable[day].map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.time}</td>
                      <td>{p.subject}</td>
                      <td>{p.class}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
