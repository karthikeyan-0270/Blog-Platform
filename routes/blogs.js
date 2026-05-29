const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");

// Create Blog
router.post("/", async (req, res) => {
    try {
        const newBlog = new Blog(req.body);

        const savedBlog = await newBlog.save();

        res.json(savedBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All Blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();

        res.json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ADD THIS HERE 👇
// GET blog by ID
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT blog by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE blog by ID
router.delete("/:id", async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/:id/comments", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        blog.comments.push({
            username: req.body.username,
            text: req.body.text
        });

        await blog.save();

        res.json(blog);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;