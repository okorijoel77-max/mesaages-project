import { useEffect, useState } from "react";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";
import { getMessages, deleteMessage } from "./api";
import Login from "./components/Login/Login";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.log("Error loading messages:", err);
    }
  };

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
      background: "#ffffff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
    }}>
    <h1 style={{
      textAlign: "center",
      marginBottom: "10px"
    }}>
      📩 Messages Dashboard
    </h1>

    <p style={{
      textAlign: "center",
      color: "#777",
      marginBottom: "25px"
    }}>
      Manage incoming messages easily
    </p>

    <input
      placeholder="🔍 Search messages..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      outline: "none"
    }}
   />

    <p style={{
      fontWeight: "bold",
      marginBottom: "15px"
     }}>
     Total Messages: {filteredMessages.length}
    </p>

      <MessageForm onAdd={handleAdd} />

      <MessageList
        messages={filteredMessages}
        onDelete={handleDelete}
      />
    </div>
  );
}
