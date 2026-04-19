import { useState } from "react";
import { addMessage } from "../api";

export default function MessageForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = { name, email, message };

    try {
      await addMessage(newMessage);
      onAdd();

      // clear inputs
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px"
      }}
    >
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ddd"
        }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ddd"
        }}
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ddd"
        }}
      />

      <button
        type="submit"
        style={{
          padding: "10px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Send Message
      </button>
    </form>
  );
}
