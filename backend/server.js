// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require ("path");
const { error } = require("console");
// const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));

// Database connection 
const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "bookingsystemdb"
});

// Connect to mySql - testing database connection
db.connect(err =>{
    if(err) {
        console.error(" Database connection failed:", err);
    } else {
        console.log("Connected to MySql successfully!");
    }
});

// Sample test route 
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start the server 
app.listen(3000, () => console.log("Server running on http://localhost:3000"));


//app.use(/"/services", services)

// API route
// Get all hotels 
app.get("/api/hotels", (req, res) => {
    const sql = "SELECT * FROM hotels";
    db.query(sql, (err, results) => {
        if(err) {
            console.error("Error fetching hotels:", err);
            res.status(500).json({error: "Database error"});
        } else {
            res.json(results); // send hotels back as JSON
        }

    });
});


// API route
// Get all attractions
app.get("/api/attractions", (req, res) => {
    const sql = "SELECT * FROM attractions";
    db.query(sql, (err, results) => {
        if(err){
            console.error("Error fetching attractions: ", err);
            res.status(500).json({error:"Database error"}); 
        } else {
            res.json(results); // sends attractions back as JSON
        }
    });
});

//API route 
// Get all events 
app.get("/api/events", (req, res) => {
    const sql = "SELECT * FROM events";
    db.query(sql, (err, results) => {
        if(err){
            console.error("Error fetching events: ", err);
            res.status(500).json({error:"Database error"});
        } else {
            res.json(results); // sends events back as JSON 
        }
    });
});


// API Route 
// Get all resturants 
app.get("/api/restaurants", (req, res) => {
    const sql = "SELECT * FROM restaurants";
    db.query(sql, (err, results) => {
        if(err) {
            console.error("Error fetching restaurants: ", err);
            res.status(500).json({error:"Database error"});
        } else {
            res.json(results); // send restaurants back as JSON
        }
    });
});