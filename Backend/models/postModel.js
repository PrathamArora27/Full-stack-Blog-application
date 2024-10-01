const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: String,
    Content: String,
    Author: String,
    date: {type: Date, default: Date.now},
});

const BlogPost = mongoose.model('BlogPost',blogPostSchema);

module.exports = BlogPost;