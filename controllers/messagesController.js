const createMessage = (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const { name, email, message, phone, pickup, dropoff } = req.body;

  try {
    const result = db.addMessage(name, email, message);

    res.json({
      id: result.lastInsertRowid,
      name,
      email,
      message,
      phone,
      pickup,
      dropoff
    });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Failed to add message" });
  }
};
