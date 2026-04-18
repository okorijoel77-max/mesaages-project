import { useEffect, useState } from "react";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";
import { getMessages, deleteMessage } from "./api";
import Login from "./components/Login/Login";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ define first
  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.log("Error loading messages:", err);
    }
  };

  // ✅ then use it
  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    await deleteMessage(id);
    loadMessages();
  };

  const handleAdd = () => {
    loadMessages();
  };

  const filteredMessages = Array.isArray(messages)
    ? messages.filter((msg) =>
        (msg.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (msg.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (msg.message || "").toLowerCase().includes(search.toLowerCase())
      )
    : [];

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{
      maxWidth: "700px",
      margin: "40px auto",
      fontFamily: "Arial, sans-serif",
      background: "#f9fafb",
      padding: "20px",
      borderRadius: "10px"
    }}>
      <h1 style={{ textAlign: "center" }}>
        📩 Messages Dashboard
      </h1>

      <p style={{
        textAlign: "center",
        color: "#666",
        marginBottom: "20px"
      }}>
        Manage all incoming messages
      </p>

      {/* 🔍 Search */}
      <input
        placeholder="🔍 Search messages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          margin: "20px auto",
          display: "block",
          border: "1px solid #ddd",
          borderRadius: "6px"
        }}
      />

      <p>Total Messages: {filteredMessages.length}</p>

      <MessageForm onAdd={handleAdd} />

      <MessageList
        messages={filteredMessages}
        onDelete={handleDelete}
      />
    </div>
  );
}
