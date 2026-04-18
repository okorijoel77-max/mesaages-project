const BASE_URL = "https://messages-backend-p1nt.onrender.com";

// GET all messages
export const getMessages = async () => {
  const res = await fetch(`${BASE_URL}/api/messages`);
  const data = await res.json();
  console.log("GET:", data);
  return data;
};

// POST new message
export const addMessage = async (newMessage) => {
  console.log("SENDING:", newMessage);

  const res = await fetch(`${BASE_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newMessage)
  });

  const data = await res.json();
  console.log("POST RESPONSE:", data);

  return data;
};

// DELETE message
export const deleteMessage = async (id) => {
  await fetch(`${BASE_URL}/api/messages/${id}`, {
    method: "DELETE"
  });
};
