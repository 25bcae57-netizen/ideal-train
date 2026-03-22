const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root/777/999",
    database: "portfolio"
});

db.connect(err => {
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

    db.query(sql, (err, result) => {
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

    db.query(sql, [name, email, message], (err, result) => {
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

    db.query("DELETE FROM messages WHERE id = ?", [id], (err) => {
        if (err) return res.send("Error deleting");

        res.send("Deleted");
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");

});