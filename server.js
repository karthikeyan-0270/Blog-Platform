const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blogs");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://karthikeyankadarla27_db_user:Blog1234@cluster0.n7ks4c1.mongodb.net/?appName=Cluster0")
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