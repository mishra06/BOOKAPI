const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: "String",
      title: String,
      pubDate: String,
      language: String,
      numPage: Number,
      authors: [Number],
      publications:Nmber,
      category: [String],
});

// Create a book model
const BookModel = mongoose.model(BookSchema);

module.exports = BookModel;
