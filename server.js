const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blogs");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Blog Platform API Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});