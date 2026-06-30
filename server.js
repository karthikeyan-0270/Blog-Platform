console.log("THIS IS MY SERVER");
console.log("===== SERVER STARTED =====");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blogs");
console.log("===== BLOG ROUTES LOADED =====");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// MongoDB Connection
require("dotenv").config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");
    } catch (err) {
        console.log("❌ MongoDB Error");
        console.log(err);
    }
}

connectDB();
// Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});