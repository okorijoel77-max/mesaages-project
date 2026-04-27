// controllers/messagesController.js

console.log("NEW CONTROLLER LOADED");

const db = require("../services/dbService");

const getAllMessages = (req, res) => {
  const messages = db.getAllMessages();
  res.json(messages);
};

const createMessage = (req, res) => {
  console.log("BODY:", req.body); // 👈 ADD THIS

  const { name, phone, pickup, dropoff, message } = req.body;

  try {
    const result = db.addMessage(name, phone, pickup, dropoff,  message);

    const newMessage = {
      id: result.lastInsertRowid,
      name,
      phone,
      pickup,
      dropoff,
      message,
      created_at: new Date().toLocaleString()
    };

    res.json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add message" });
  }
};

const updateMessage = (req, res) => {
  const id = req.params.id;
  const { text } = req.body;

  db.updateMessage(id, text);

  res.json({ success: true });
};

const deleteMessage = (req, res) => {
  const id = req.params.id;

  db.deleteMessage(id);

  res.json({ success: true });
};

module.exports = {
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage
};
