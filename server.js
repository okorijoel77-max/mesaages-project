const express = require("express");
const cors = require("cors");

const dbService = require("./services/dbService");
const messageRoutes = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 3000;

// =====================
// MIDDLEWARE
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow your Vercel frontend
app.use(cors());

// =====================
// TEST ROUTE
// =====================
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// =====================
// API ROUTES
// =====================
app.use("/api/messages", messageRoutes);

// =====================
// ERROR HANDLER
// =====================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// =====================
// START SERVER
// =====================
(async () => {
  await dbService.initDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
