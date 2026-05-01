const createMessage = (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const { name, phone, pickup, dropoff, message } = req.body;

  try {
    const result = db.addMessage(
      name,
      phone,
      pickup,
      dropoff,
      message
    );

    res.json({
      id: result.lastInsertRowid,
      name,
      phone,
      pickup,
      dropoff,
      message
    });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Failed to add message" });
  }
};


module.exports = {
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage
};
