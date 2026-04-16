// services/dbService.js

const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../messages.db");

let db;
let SQL;

async function initDB() {
  SQL = await initSqlJs();

  if (fs.existsSync(DB_FILE)) {
    const fileBuffer = fs.readFileSync(DB_FILE);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();

    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        created_at TEXT
      );
    `);

// USER DB
   db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );
`);

    saveDB();
  }
  console.log("DB ready");
}

// Save in-memory DB to disk
function saveDB() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_FILE, buffer);
}

// CRUD
function getAllMessages() {
  const result = db.exec("SELECT * FROM messages");
  if (result.length === 0) return [];

  const columns = result[0].columns;
  const values = result[0].values;

  return values.map(row => {
    let obj = {};
    columns.forEach((col, i) => (obj[col] = row[i]));
    return obj;
  });
}

function addMessage(name, email, message) {
  const result = db.run(
    `INSERT INTO messages (name, email, message, created_at)
     VALUES (?, ?, ?, ?)`,
    [name, email, message, new Date().toLocaleString()]
  );
  saveDB(); // persist after insert
  return result; // 👈 IMPORTANT
}

function updateMessage(id, text) {
  db.run("UPDATE messages SET message = ? WHERE id = ?", [text, id]);
  saveDB();
}

function deleteMessage(id) {
  db.run("DELETE FROM messages WHERE id = ?", [id]);
  saveDB();
}

module.exports = {
  initDB,
  getAllMessages,
  addMessage,
  updateMessage,
  deleteMessage
};


function createUser(email, password) {
  const stmt = db.prepare(`
    INSERT INTO users (email, password)
    VALUES (?, ?)
  `);

  try {
    stmt.run([email, password]);
  } catch (err) {
    return false; // user already exists
  }

  stmt.free();
  return true;
}

function findUser(email) {
  const result = db.exec("SELECT * FROM users WHERE email = ?", [email]);

  if (result.length === 0) return null;

  const columns = result[0].columns;
  const values = result[0].values[0];

  let user = {};
  columns.forEach((col, i) => (user[col] = values[i]));

  return user;
}

module.exports = {
  initDB,
  getAllMessages,
  addMessage,
  updateMessage,
  deleteMessage,
  createUser,
  findUser
};
