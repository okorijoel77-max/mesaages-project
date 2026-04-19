const BASE_URL = "https://messages-backend-p1nt.onrender.com";

// GET all messages
export const getMessages = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/messages`);

    console.log("GET STATUS:", res.status);

    const data = await res.json();
    console.log("GET DATA:", data);

    return data;
  } catch (err) {
    alert("Failed to load messages");
    console.log(err);
    return [];
  }
};

// POST new message
export const addMessage = async (newMessage) => {
  try {
    console.log("SENDING:", newMessage);

    const res = await fetch(`${BASE_URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMessage)
    });

    console.log("POST STATUS:", res.status);

    const data = await res.json();
    console.log("POST RESPONSE:", data);

    return data;
  } catch (err) {
    alert("Failed to send message");
    console.log(err);
  }
};

// DELETE message
export const deleteMessage = async (id) => {
  await fetch(`${BASE_URL}/api/messages/${id}`, {
    method: "DELETE"
  });
};
