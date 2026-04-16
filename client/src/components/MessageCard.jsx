export default function MessageCard({ msg, onDelete }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e5e7eb",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "12px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{msg.name}</strong>
        <button
          onClick={() => onDelete(msg.id)}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>

      <small style={{ color: "#777" }}>{msg.email}</small>

      <p style={{ marginTop: "10px" }}>{msg.message}</p>

      <small style={{ color: "#aaa" }}>
        {msg.created_at}
      </small>
    </div>
  );
}
