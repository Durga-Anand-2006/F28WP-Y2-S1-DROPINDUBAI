const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection 
const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "bookingsystemdb"
});

// Connect to mySql 
db.connect(err =>{
    if(err) {
        console.log(" Database connection failed:", err);
    } else {
        console.log("Connected to MySql successfully!");
    }
});

// Sample test route 
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start the server 
app.listen(3000, () => console.log("Server running on port 3000"));