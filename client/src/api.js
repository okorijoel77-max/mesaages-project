const BASE_URL = "https://messages-backend-p1nt.onrender.com";

// GET all messages
export const getMessages = async () => {
  const res = await fetch(`${BASE_URL}/api/messages`);
  return res.json();
};

// POST new message
export const addMessage = async (newMessage) => {
  const res = await fetch(`${BASE_URL}/api/messages`, {
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
  await fetch(`${BASE_URL}/api/messages/${id}`, {
    method: "DELETE"
  });
};
