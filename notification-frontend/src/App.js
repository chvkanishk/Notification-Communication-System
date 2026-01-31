import { useState, useEffect } from "react";

function App() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  const sendEmail = async () => {
    await fetch("http://localhost:8080/notifications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "email",
        to,
        payload: { subject, body: message }
      })
    });

    loadNotifications();
  };

  const loadNotifications = async () => {
    const res = await fetch("http://localhost:8080/notifications");
    const data = await res.json();
    setNotifications(data);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>Send Email</h2>

      <label>To:</label>
      <input
        style={{ width: "100%", marginBottom: 10 }}
        placeholder="john@example.com"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <label>Subject:</label>
      <input
        style={{ width: "100%", marginBottom: 10 }}
        placeholder="Welcome!"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <label>Message:</label>
      <textarea
        style={{ width: "100%", height: 100, marginBottom: 10 }}
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendEmail}>Send Email</button>

      <h3 style={{ marginTop: 30 }}>Notifications</h3>
      <ul>
        {notifications.map((n) => (
          <li key={n.id}>
            #{n.id} — {n.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
