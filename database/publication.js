const mongoose = require("mongoose");

//Publication Schema
const publicationsSchema = mongoose.Schema({
      id: Number,
      name: String,
      books: [String],
});


// publications Model
const publicationsModel = mongoose.model(publicationsSchema);

module.exports = publicationsModel;