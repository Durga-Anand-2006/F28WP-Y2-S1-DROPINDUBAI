// server.js

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require ("path");
const { error } = require("console");
const bcrypt = require('bcrypt');

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

//app.use(/"/services", services)

//API ROUTES - FETCHING DATA FROM THE DATABASE 

// INDEX.HTML 
// API Route - Top Hotels 
app.get("/api/top-hotels", (req, res) => {
    const sql = "SELECT * FROM hotels LIMIT 7";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching top hotels:", err);
            res.status(500).json({error: "Database error"});
        } else {
            res.json(results);
        }
    });
});

// API Route - Top Restaurants
app.get("/api/top-restaurants", (req, res) => {
    const sql = "SELECT * FROM restaurants LIMIT 7";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching top restaurants:", err);
            res.status(500).json({error: "Database error"});
        } else {
            res.json(results);
        }
    });
});

// API Route - Top Attractions
app.get("/api/top-attractions", (req, res) => {
    const sql = "SELECT * FROM attractions LIMIT 7";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching top attractions:", err);
            res.status(500).json({error: "Database error"});
        } else {
            res.json(results);
        }
    });
});

// API Route - Top Events 
app.get("/api/top-events", (req, res) => {
    const sql = "SELECT * FROM events LIMIT 7";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching top events:", err);
            res.status(500).json({error: "Database error"});
        } else {
            res.json(results);
        }
    });
});

// HOTES.HTML
// API route - Get all hotels 
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

// ATTRACTIONS.HTML
// API route - Get all attractions
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

// EVENTS.HTML
//API route  - Get all events 
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

// RESTAURANTS.HTML
// API Route - Get all resturants 
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


// LOGIN.HTML
// API Route - User login
app.post("/api/login", (req, res) => {
    const{ email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({success: false, message: "Please enter email and password."})
    }

    const sql = "SELECT ID, Email, FullName, Role, Password FROM users WHERE Email = ?"; 
    
    db.query(sql,[email, password], async(err, results) => {
        if(err) {
            console.error("Login error: ", err);
            res.status(500).json({error:"Database error"});
        } 

        if(results.length === 0){
            return res.json({success: false, message: "Invalid email or password"});

            
        }
        const user = results[0];
        try{
            // comapre the password with the hashed password
            const passwordMatch = await bcrypt.compare(password, user.Password);

            if(passwordMatch){
                res.json({
                    success: true, 
                    user: {
                        id: user.ID, 
                        name: user.FullName, 
                        email: user.Email, 
                        role: user.Role
                    }
                });
            } else {
                res.json({success: false, message: "Invalid email or password" });
            }
        } catch(error){
            console.error("Bycrpt compare error:", error);
            return res.status(500).json({error: "Server error"});
        }
    });
});

// SIGNUP.HTML 
// API ROUTE - New user sign up 
app.post("/api/signup", (req, res) => {
    const{ name, email, password } = req.body;

    if(!name || !email ||!password){
        return res.status(400).json({success: false, message: "Please fill all fields"});
    }
    // check if the given email already exists (user already exists)
    db.query("SELECT * FROM users WHERE Email = ?", [email], async(err, results) => {
        if(err) {
            console.error("Signup check error", err);
            return res.status(500).json({ error: "Database error" });
        }

        if(results.length > 0){
            return res.json({ success: false, message: "Email is already registered with a user."});
        }
        try{
            console.log("Hashing password...");
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("Password haashed successfully");

             // insert the new user 
            const sql = "INSERT INTO users (FullName, Email, Password, Role) VALUES (?, ?, ?, 'user')";
            db.query(sql, [name, email, hashedPassword], (err, results) => {
                if(err){
                    console.error("Signup insert error:", err);
                    return res.status(500).json({ error: "Failed to create an account" });
            }

                res.json({
                    success: true, 
                    user: {
                        id: results.insertId,
                        name: name, 
                        email: email, 
                        role: 'user'
                    }
                });
        });

        } catch(error){
            console.error("Bcrypt error:", error);
            return res.status(500).json({error: "Server error"});
        }
    });
});

// PROFILE.HTML 
// API ROUTE - Get user profile info 
app.get("/api/user/:id", (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT ID, FullName, Email, ProfilePicture, Role FROM users WHERE ID = ?";
    db.query(sql, [userId], (err, results) => {
        if(err){
            console.error("Error fetching user:", err);
            return res.status(500).json({ success: false, message: "Database error"});
        }
        if(results.length == 0){
            return res.status(500).json({ success: false, message:"User not found"});
        }
        res.json({ success: true, user: results[0] });
    });
});

// BOOKINGS API 

// API ROUTE - create a new booking 
app.post("/api/bookings", (req, res) => {
    const { userId, itemType, itemID, checkIn, checkOut, guests } = req.body;
    
    if (!userId || !itemType || !itemID) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate dates if provided
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
        return res.status(400).json({ success: false, message: "Check-out must be after check-in" });
    }

    const sql = `
        INSERT INTO bookings (UserID, ItemType, ItemID, CheckIn, CheckOut, Guests)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    db.query(sql, [userId, itemType, itemID, checkIn || null, checkOut || null, guests || null], (err, result) => {
        if (err) {
            console.error("Error adding booking:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json({ success: true, bookingId: result.insertId });
    });
});

// API ROUTE - get user bookings 
app.get("/api/bookings/:userId", (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT 
            b.ID, b.ItemType, b.ItemID, b.CheckIn, b.CheckOut, b.Guests, b.Status, b.CreatedAt,
            CASE 
                WHEN b.ItemType = 'hotel' THEN h.Name
                WHEN b.ItemType = 'restaurant' THEN r.Name
                WHEN b.ItemType = 'attraction' THEN a.Name
                WHEN b.ItemType = 'event' THEN e.Name
            END AS ItemName,
            CASE 
                WHEN b.ItemType = 'hotel' THEN h.ImagePath
                WHEN b.ItemType = 'restaurant' THEN r.ImagePath
                WHEN b.ItemType = 'attraction' THEN a.ImagePath
                WHEN b.ItemType = 'event' THEN e.ImagePath
            END AS ImagePath,
            CASE 
                WHEN b.ItemType = 'hotel' THEN h.Location
                WHEN b.ItemType = 'restaurant' THEN r.Location
                WHEN b.ItemType = 'attraction' THEN a.Location
                WHEN b.ItemType = 'event' THEN e.Location
            END AS Location,
            CASE 
                WHEN b.ItemType = 'hotel' THEN h.Price_Per_Night
                WHEN b.ItemType = 'restaurant' THEN r.Price_Range
                WHEN b.ItemType = 'attraction' THEN a.Price
                WHEN b.ItemType = 'event' THEN e.Price
            END AS Price
        FROM bookings b
        LEFT JOIN hotels h ON b.ItemType = 'hotel' AND b.ItemID = h.ID
        LEFT JOIN restaurants r ON b.ItemType = 'restaurant' AND b.ItemID = r.ID
        LEFT JOIN attractions a ON b.ItemType = 'attraction' AND b.ItemID = a.ID
        LEFT JOIN events e ON b.ItemType = 'event' AND b.ItemID = e.ID
        WHERE b.UserID = ?
        ORDER BY b.CreatedAt DESC
    `;
    
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching user's bookings:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json({ success: true, bookings: results });
    });
});

// API ROUTE - cancel a booking
app.patch("/api/bookings/:bookingId/cancel", (req, res) => {
    const bookingId = req.params.bookingId;
    const { userId } = req.body; // To verify ownership

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID required" });
    }

    const sql = "UPDATE bookings SET Status = 'cancelled' WHERE ID = ? AND UserID = ? AND Status = 'confirmed'";
    
    db.query(sql, [bookingId, userId], (err, result) => {
        if (err) {
            console.error("Error cancelling booking:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Booking not found or already cancelled" });
        }
        
        res.json({ success: true, message: "Booking cancelled successfully" });
    });
});

// API ROUTE - get single booking details
app.get("/api/booking/:bookingId", (req, res) => {
    const bookingId = req.params.bookingId;

    const sql = `
        SELECT 
            b.*,
            CASE 
                WHEN b.ItemType = 'hotel' THEN h.Name
                WHEN b.ItemType = 'restaurant' THEN r.Name
                WHEN b.ItemType = 'attraction' THEN a.Name
                WHEN b.ItemType = 'event' THEN e.Name
            END AS ItemName
        FROM bookings b
        LEFT JOIN hotels h ON b.ItemType = 'hotel' AND b.ItemID = h.ID
        LEFT JOIN restaurants r ON b.ItemType = 'restaurant' AND b.ItemID = r.ID
        LEFT JOIN attractions a ON b.ItemType = 'attraction' AND b.ItemID = a.ID
        LEFT JOIN events e ON b.ItemType = 'event' AND b.ItemID = e.ID
        WHERE b.ID = ?
    `;
    
    db.query(sql, [bookingId], (err, results) => {
        if (err) {
            console.error("Error fetching booking:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        
        res.json({ success: true, booking: results[0] });
    });
});

// Start the server 
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

