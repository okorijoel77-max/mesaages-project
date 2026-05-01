const db = require("../services/dbService");

// GET
const getAllMessages = (req, res) => {
  try {
    const messages = db.getAllMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// POST
const createMessage = (req, res) => {
  const { name, phone, pickup, dropoff, message } = req.body;

  try {
    const result = db.addMessage(name, phone, pickup, dropoff, message);

    res.json({
      id: result.lastInsertRowid,
      name,
      phone,
      pickup,
      dropoff,
      message
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add message" });
  }
};

// DELETE
const deleteMessage = (req, res) => {
  const id = req.params.id;

  db.deleteMessage(id);
  res.json({ success: true });
};

// UPDATE (optional)
const updateMessage = (req, res) => {
  const id = req.params.id;
  const { text } = req.body;

  db.updateMessage(id, text);
  res.json({ success: true });
};

// EXPORT
module.exports = {
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage
};
