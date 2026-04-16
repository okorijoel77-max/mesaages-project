// src/api.js
const BASE_URL = "httpss://messages-backend.onrender.com";
// GET all messageshttpsonst getMessages = async () => {
  const res = await fetch("/api/messages");
  return res.json();
};

// POST new message
export const addMessage = async (newMessage) => {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newMessage)
  });

  return res.json();
};

// DELETE message
export const deleteMessage = async (id) => {
  await fetch(`/api/messages/${id}`, {
    method: "DELETE"
  });
};
