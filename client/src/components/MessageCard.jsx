export default function MessageCard({ msg, onDelete }) {
  return (
    <div style={{
      background: "#fff",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    }}>
      <h3 style={{ margin: "0 0 5px 0" }}>{msg.name}</h3>

      <p style={{
        margin: "0 0 8px 0",
        fontSize: "14px",
        color: "#666"
      }}>
        {msg.email}
      </p>

      <p style={{ marginBottom: "10px" }}>
        {msg.message}
      </p>

      <button
        onClick={() => onDelete(msg.id)}
        style={{
          background: "#ef4444",
          color: "#fff",
          border: "none",
          padding: "6px 10px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Delete
      </button>
    </div>
  );
}
