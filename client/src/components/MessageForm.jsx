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
      await addMessage(newMessage); // ✅ use API layer

      onAdd(); // ✅ reload messages from backend

      // clear form
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
     <form onSubmit={handleSubmit} style={{
	  background: "white",
	  padding: "15px",
	  borderRadius: "12px",
	  marginBottom: "20px",
	  border: "1px solid #e5e7eb"
	}}>
     <br />

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px auto",
          border: "1px solid #ddd",
          borderRadius: "6px"
        }} />
      <br />        

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       style={{
	  width: "90%",
	  padding: "10px",
	  margin: "10px auto",
	  border: "1px solid #ddd",
	  borderRadius: "6px"
	}}
      />        
      <br />

      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
       style={{
	  width: "90%",
	  padding: "10px",
	  margin: "10px auto",
	  border: "1px solid #ddd",
	  borderRadius: "6px"
	}}
      />
      <br />

      <button
        type="submit"
        style={{
        padding: "10px",
        width: "20%",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px"}}> Send </button>
   
 </form>
  );
}
