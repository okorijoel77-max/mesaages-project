export default function MessageCard({ msg, onDelete }) {
  return (
    <div style={{
      background: "#fff",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ margin: 0 }}>{msg.name}</h3>
      <p style={{ margin: "5px 0", color: "#555" }}>{msg.email}</p>
      <p>{msg.message}</p>

      <button
        onClick={() => onDelete(msg.id)}
        style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "6px 10px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Delete
      </button>
    </div>
  );
}
