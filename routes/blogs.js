const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");

router.post("/", async (req, res) => {

    console.log("POST /blogs HIT");
    console.log(req.body);

    try {

        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        });

       console.log("About to save:");
console.log(blog);

const savedBlog = await blog.save();

console.log("Saved successfully");

        console.log("Saved:", savedBlog);

        return res.status(201).json(savedBlog);

    } catch (err) {

        console.log("POST ERROR");
        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
});
// ADD THIS HERE 👇
router.get("/", async (req, res) => {

    console.log("GET /blogs HIT");

    try {

        const blogs = await Blog.find();

        console.log("Blogs:", blogs);

        return res.json(blogs);

    } catch (err) {

        console.log("GET ERROR");
        console.log(err);

        return res.status(500).json({
            message: err.message
        });

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