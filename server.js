console.log("SERVER FILE LOADED");

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aiman@151023",
  database: "edubridge"
});

db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// TEST
app.get("/", (req, res) => {
  res.send("EduBridge Backend Running");
});

// REGISTER API
app.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).send("All fields required");
  }

  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, password, role], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    res.send(`${role} registered successfully`);
  });
});

// LOGIN API (ONLY ONCE)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        user: result[0]
      });
    } else {
      res.json({ success: false });
    }
  });
});

// ENROLLMENT API
app.post("/enroll", (req, res) => {
  const { program } = req.body;

  if (!program) {
    return res.status(400).send("Program name required");
  }

  const sql = "INSERT INTO enrollments (program_name) VALUES (?)";

  db.query(sql, [program], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Enrollment failed");
    }

    res.send("Enrollment successful");
  });
});

// 🚀 START SERVER (ONLY ONCE, LAST LINE)
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

// CREATE PROGRAM (NGO ONLY)
app.post("/create-program", (req, res) => {
  const { title, description, duration, ngo_name } = req.body;

  if (!title || !description || !duration || !ngo_name) {
    return res.status(400).send("All fields required");
  }

  const sql =
    "INSERT INTO programs (title, description, duration, ngo_name) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, description, duration, ngo_name], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Program creation failed");
    }

    res.send("Program created successfully");
  });
});
