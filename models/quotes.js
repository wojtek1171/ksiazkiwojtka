const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    bookTitle: String,
    authors: String,
    bookId: String,
    text: String,
    tags: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Quote", quoteSchema);