import { useState } from "react";
import { addMessage } from "../api";

export default function MessageForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ✅ ADD THESE (missing before)
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      name,
      email,
      message,
      phone,
      pickup,
      dropoff
    };

    try {
      await addMessage(newMessage);
      onAdd();

      // clear inputs
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
      setPickup("");
      setDropoff("");
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
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />

      <input
        placeholder="Drop-off Location"
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
      />

      <textarea
        placeholder="Package Details"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">
        Send Request
      </button>
    </form>
  );
}
