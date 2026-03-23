const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
const connection = mysql.createConnection({
  host: process.env.DB_HOST || process.env.MYSQLHOST,
  user: process.env.DB_USER || process.env.MYSQLUSER,
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
  database: process.env.DB_NAME || process.env.MYSQLDATABASE,
  port: process.env.DB_PORT || process.env.MYSQLPORT || 3306
});

connection.connect(err => {
    if (err) {
        console.error("database connection failed:", err);
    } else {
        console.log("connected to mysql");
    }
});
// test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// contact route 
// get all messages
app.get("/messages", (req, res) => {
    const sql = "SELECT * FROM messages";

    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error fetching messages");
        }

        res.json(result);
    });
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    connection.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.send("Error saving message");
        }


        console.log("Data saved to database!");
        res.send("Message saved to database!");
    });
});
app.get("/delete/:id", (req, res) => {
    const id = req.params.id;

    connection.query("DELETE FROM messages WHERE id = ?", [id], (err) => {
        if (err) return res.send("Error deleting");

        res.send("Deleted");
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
