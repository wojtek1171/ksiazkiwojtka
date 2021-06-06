const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,
    authors: String,
    publisher: String,
    publicationDate: Number,
    pages: Number,
    cover: String,
    purchasePrice: Number,
    retailPrice: Number,
    read: Boolean,
    purchaseDate: Date,
    translators: String,
    originalTitle: String,
    tags: String,
    image: {
        type: String,
        default: "cover-default.jpg"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Book", bookSchema);