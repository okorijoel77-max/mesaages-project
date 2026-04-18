const BASE_URL = "https://messages-backend-p1nt.onrender.com";

export const getMessages = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/messages`);

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    alert("Error loading messages");
    console.log(err);
    return [];
  }
};
