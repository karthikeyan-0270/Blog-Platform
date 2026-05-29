const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    comments: [
        {
            username: String,
            text: String
        }
    ]
});

module.exports = mongoose.model("Blog", BlogSchema);