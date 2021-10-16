const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: {type: String},
      title: {type: String},
      pubDate: {type: String},
      language: {type: String},
      numPage: {type: Number},
      authors: [Number],
      publications:{type: Number},
      category: [String],
});

// Create a book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
