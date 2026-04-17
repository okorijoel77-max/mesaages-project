const cors = require("cors");
const express = require("express");
const path = require("path");
const session = require("express-session");

const dbService = require("./services/dbService");
const messageRoutes = require("./routes/messages");

const app = express();
const PORT = 3000;

// =====================
// MIDDLEWARE
// =====================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "https://mesaages-project-okorijoel77-maxs-projects.vercel.app"
}));

app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, "public")));

// =====================
// AUTH MIDDLEWARE
// =====================
function protectDashboard(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

// =====================
// HTML ROUTES
// =====================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/dashboard", protectDashboard, (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// =====================
// AUTH ROUTES
// =====================

// REGISTER
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  const success = dbService.createUser(email, password);

  if (!success) {
    return res.send("User already exists ❌");
  }

  res.send("Registration successful ✅ <a href='/login'>Login</a>");
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = dbService.findUser(email);

  if (!user || user.password !== password) {
    return res.send("Invalid credentials ❌");
  }

  req.session.user = user.email;

  res.redirect("/dashboard");
});

// LOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// =====================
// API ROUTES
// =====================
app.use("/api/messages", messageRoutes);

app.delete("/api/messages/:id", (req, res) => {
  const id = req.params.id;

  try {
    dbService.deleteMessage(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

// =====================
// 404 HANDLER
// =====================
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// =====================
// START SERVER (AFTER DB READY)
// =====================
(async () => {
  await dbService.initDB();

   app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();
