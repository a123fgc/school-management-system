import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // Mock users
  const mockUsers = [
    { role: "admin", username: "admin", password: "admin123" },
    { role: "teacher", username: "teacher", password: "teach123" },
  ];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "teacher") navigate("/teacher");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🏫 School Management System</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Try: admin / admin123 or teacher / teach123</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  form: {
    display: "inline-block",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "8px",
    width: "200px",
  },
  button: {
    marginTop: "10px",
    padding: "8px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
